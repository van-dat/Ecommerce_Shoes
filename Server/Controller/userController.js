const User = require("../Model/user");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");

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
      mes: newUser
        ? "Tạo tài khoản thành công vui lòng đăng nhập "
        : "tạo tài khoản thất bại",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
      return res.status(400).json({
          success: false,
          mes: 'Missing inputs'
      })
  // plain object
  const response = await User.findOne({ email })
  if (response && await response.isCorrectPassword(password)) {
      // Tách password và role ra khỏi response
      const { password, role, refreshToken, ...userData } = response.toObject()
      // Tạo access token
      const accessToken = generateAccessToken(response._id, role)
      // Tạo refresh token
      const newRefreshToken = generateRefreshToken(response._id)
      // Lưu refresh token vào database
      await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
      // Lưu refresh token vào cookie
      res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
      return res.status(200).json({
          success: true,
          accessToken,
          userData
      })
  } else {
      throw new Error('Invalid credentials!')
  }
})

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const dataUser = await User.findById({ _id });
  return res.status(200).json({
    success: true,
    rs: dataUser ? dataUser : "không tìm thấy",
  });
});

// CLASS OPP
// class userController {
//   register(req, res, next) {
//     const { email, password, lastname, firtname } = req.body;
//     if (!email || !password || !lastname || !firtname)
//       return res.status(400).json({
//         sucess: false,
//         mes: "error",
//       });

//     const response = new user.create(req.body);
//     return res.status(200).json({
//       sucess: response ? true : null,
//       response,
//     });
//   }
// }
// module.exports = new userController();
module.exports = {
  register,
  login,
  getCurrent,
};
