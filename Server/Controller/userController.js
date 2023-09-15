const User = require("../Model/user");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../ultils/sendEmail");
const crypto = require("crypto");
const { generateAccessToken, generateRefreshToken } = require("../middlewares/jwt");
const { verify } = require("jsonwebtoken");
const { hashSync } = require("bcrypt");

const register = asyncHandler(async (req, res) => {
  const { email, password, lastname, firstname } = req.body;
  if (!email || !password || !lastname || !firstname) {
    return res.status(400).json({
      success: false,
      mes: "error",
    });
  }
  const dataUser = await User.findOne({ email });
  if (dataUser) throw new Error("Tài khoản đã tồn tại");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser ? "Tạo tài khoản thành công vui lòng đăng nhập " : "tạo tài khoản thất bại",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  // plain object
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    // Tách password và role ra khỏi response
    const { password, role, refreshToken, ...userData } = response.toObject();
    // Tạo access token
    const accessToken = generateAccessToken(response._id, role);
    // Tạo refresh token
    const newRefreshToken = generateRefreshToken(response._id);
    // Lưu refresh token vào database
    await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
    // Lưu refresh token vào cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      // hết hạn
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const dataUser = await User.findById({ _id }).select("-password -refreshToken -role");
  return res.status(200).json({
    success: true,
    rs: dataUser ? dataUser : "không tìm thấy",
  });
});

//getall user
const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-password -refreshToken -role");
  return res.status(200).json({
    success: response ? true : false,
    user: response,
  });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("missing input !!!");
  const response = await User.findByIdAndDelete({ _id });
  return res.status(200).json({
    success: response ? true : false,
    deleteUser: response ? response : "some thing went wrong",
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0) throw new Error("missing input !!!");
  const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select("-password -refreshToken -role");
  return res.status(200).json({
    success: response ? true : false,
    deleteUser: response ? response : "some thing went wrong",
  });
});
const updateUserAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("missing input !!!");
  const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select("-password -refreshToken -role");
  return res.status(200).json({
    success: response ? true : false,
    deleteUser: response ? response : "some thing went wrong",
  });
});
//update address
const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("missing input !!!");
  const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true }).select(
    "-password -refreshToken -role"
  );
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "some thing went wrong",
  });
});
// getAccessToken

const getAccessToken = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  const rs = await verify(cookie.refreshToken, process.env.JWT_KEY);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response ? generateAccessToken(response._id, response.role) : "error new accessToken",
  });
});
/// logout
const logout = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken) throw new Error("không có refreshToken");
  await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: "" }, { new: true });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "logout success and remove refreshToken",
  });
});
// forgotpassword
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("missing email");
  const userData = await User.findOne({ email });
  if (!userData) throw new Error("user not found");
  const resetToken = userData.createPasswordChangeToken();
  await userData.save();

  const html = `xin vui lòng click link dưới đây để thay đổi mật khẩu của bạn . 
  link sẽ hết hạn sau 15 phút kể từ bây giờ, 
  <a href =${process.env.URL_SERVER}/api/user/reset-password/${resetToken} 
  >Click here</a>`;

  const data = {
    email,
    html,
  };
  const rs = await sendEmail(data);
  return res.status(200).json({
    success: true,
    mes: rs,
  });
});

// resetPassword
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password && !token) throw new Error("missing password");
  const passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
  const userData = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!userData) throw new Error("user Token undefined");
  userData.password = password;
  userData.passwordResetToken = undefined;
  userData.passwordResetExpires = undefined;
  userData.passwordChangeAt = Date.now();
  await userData.save();

  return res.status(200).json({
    success: userData ? true : false,
    msg: userData ? "success password " : "error resetpassword",
  });
});
// add CardProduct
const updateCartProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, color, quantity } = req.body;
  if (!pid || !color || !quantity) throw new Error("missing input");
  const user = await User.findById(_id).select("cart");
  const alreadyCart = user?.cart?.find((e) => e.product.toString() === pid);
  if (alreadyCart) {
    if (alreadyCart.color === color) {
      const response = await User.updateOne(
        { cart: { $elemMatch: alreadyCart } },
        { $inc: { "cart.$.quantity": quantity  } },
        { new: true }
      );
      return res.status(200).json({
        status: response ? true : false,
        rs: response ? response : "can not add cart",
      });
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        { $push: { cart: { product: pid, quantity, color } } },
        { new: true }
      );
      return res.status(200).json({
        status: response ? true : false,
        rs: response ? response : "can not add cart",
      });
    }
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: pid, quantity, color } } },
      { new: true }
    );
    return res.status(200).json({
      status: response ? true : false,
      rs: response ? response : "can not add cart",
    });
  }
});

module.exports = {
  register,
  login,
  getCurrent,
  getAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserAddress,
  updateCartProduct,
};
