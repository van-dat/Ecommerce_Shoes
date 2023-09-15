import React from "react";
import icons from "../ultils/icon";
const { LiaUserCircleSolid, RiShoppingCartLine } = icons;
const Login = () => {
  return (
    <div className="flex gap-3 items-center ">
      <span>
        <LiaUserCircleSolid size={24} />
      </span>
      <span className="cursor-pointer">Đăng nhập</span>
      <span className="cursor-pointer">Đăng Ký</span>
      <span className="text-red-700 px-3 cursor-pointer">
        <RiShoppingCartLine size={24}/>
      </span>
    </div>
  );
};

export default Login;
