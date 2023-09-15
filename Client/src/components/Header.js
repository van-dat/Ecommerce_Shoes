import { Search, Login } from "./";
import logo from "../assets/img/logo.png";
import { menu } from "../ultils/menu";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as apis from '../apis/'
import Path from "../ultils/path";

const Header = () => {
  const isActiveType = "rounded-xl font-bold  text-xl px-3 py-3 bg-btn text-white";
  const noActiveType = "rounded-xl font-bold  text-xl px-3 py-3  hover:text-white hover:bg-btn";
  const [dataCategory, setDataCategory] = useState(null);
  const Navigate = useNavigate();

  const fetchDataCategory = async () => {
    const response = await apis.apiCategory();
    if (response.status) setDataCategory(response.rs);
  };
  useEffect(() => {
    fetchDataCategory()
  }, []);
  return (
    <div className="border-b-2 flex flex-col text-main">
      <div className="border-b-2">
        <div className="md:container md:mx-auto  h-[40px] flex justify-between items-center px-4">
          <span className="">Hotline:</span>
          <div className="flex items-center gap-8">
            <Search />
            <Login />
          </div>
        </div>
      </div>
      <div className="">
        <div className="md:container md:mx-auto  h-header px-4 flex">
          <div className="w-1/5 h-full flex justify-start items-center cursor-pointer">
            <img src={logo} alt="logo" className="scale-150 w-[150px] object-contain " onClick={()=>Navigate(Path.PUBLIC)} />
          </div>
          <div className="w-auto flex items-center gap-4 ">
            {menu.map((i) => (
              <NavLink key={i.index} to={i.path} className={({ isActive }) => (isActive ? isActiveType : noActiveType)}>
                <span className="uppercase p-0 m-0">{i.text}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
