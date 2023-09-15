import React, { useEffect, useState } from "react";
import { Banner, BannerCategory, FeaturedProduct, ProductCategory } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import {dataNike, dataMlb, dataAdidas} from "../../store/appSlice"

const Home = () => {
  const { product } = useSelector((state) => state.app);
  const Dispatch = useDispatch()

  useEffect(() => {
    Dispatch(dataNike(product?.product?.filter((i, index) => i.category.title === "Giày Nike" && index < 4)))
    Dispatch(dataAdidas(product?.product?.filter((i, index) => i.category.title === "Giày Adidas")))
    Dispatch(dataMlb(product?.product?.filter((i, index) => i.category.title === "Giày MLB")))

  }, [product]);

  return (
    <>
      {product && (
        <div className="">
          <Banner />
          <div className="bg-header border-b-2 ">
            <BannerCategory />
          </div>
          <FeaturedProduct text="Sản Phẩm Nổi Bật" />
          <div className="bg-header h-[150px]">
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
          <div className="bg-header">
            <FeaturedProduct text="TIN TỨC NỔI BẬT" detail="Tin tức mới nhất và thú vị nhất" />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;