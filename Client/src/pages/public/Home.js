import React, { useEffect, useState, useMemo } from "react";
import { Banner, BannerCategory, FeaturedProduct, ProductCategory } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { dataNike, dataMlb, dataAdidas } from "../../store/Slice/appSlice"
import { getCurrentUser } from '../../store/action'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Path from "../../ultils/path";


const Home = () => {
  const { product } = useSelector((state) => state.app);
  const { isLogin, mes, user, token } = useSelector(state => state.auth)
  console.log(isLogin, user)
  const Dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    Dispatch(dataNike(product?.product?.filter((i, index) => i.category.title === "Nike")))
    Dispatch(dataAdidas(product?.product?.filter((i, index) => i.category.title === "Adidas")))
    Dispatch(dataMlb(product?.product?.filter((i, index) => i.category.title === "MLB")))
    
    

    // if (!user) {
    //   if (mes) {
    //     Swal.fire({ icon: 'warning', text: mes, background: 'transparent' }).then(() => {
    //       navigate(Path.LOGIN);
    //     });
    //   }

    // }
  }, []);


  useEffect(() => {
    if(user?.role === 'admin') {
      navigate(Path.ADMIN)
    }

      Dispatch(getCurrentUser())
    
  }, [isLogin]);




  return (
    <>
      {product && (
        <div className="">
          <Banner />
          <div className=" border-b-2 ">
            <BannerCategory />
          </div>
          <FeaturedProduct text="Sản Phẩm Nổi Bật" />
          <div className=" h-[150px]">
            <div className="h-full md:container md:mx-auto flex justify-end text-main-100  font-bold items-center">
              <span className="text-3xl underline underline-offset-2">Tại sao chọn Nhanh Sneaker</span>
            </div>
          </div>

          <ProductCategory
            name="Giày Nike"
          />
          <ProductCategory
            name="Giày Adidas"
          />
          <ProductCategory
            name="Giày MLB"
          />
          <div className="">
            <FeaturedProduct text="TIN TỨC NỔI BẬT" detail="Tin tức mới nhất và thú vị nhất" />
          </div>
        </div>

      )}

    </>
  );
};

export default Home;
