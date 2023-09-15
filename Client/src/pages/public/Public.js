import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components";
const Public = () => {
  return (
    <div className="relative flex flex-col">
      <div className="fixed  w-full z-10 bg-white ">
        <Header />
      </div>
      <div >
        <Outlet />
      </div>
    </div>
  );
};

export default Public;
