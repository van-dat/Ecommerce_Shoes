import React, { useEffect, useState } from "react";
import { random } from "../../ultils/fn";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Product, NavBarLeft } from "../../components";
import { getProduct } from "../../store/action";
import { fncut } from "../../ultils/fn";
import * as apis from "../../apis";

const Details = () => {
  const { banner, product } = useSelector((state) => state.app);
  const Dispatch = useDispatch();
  const { title } = useParams();
  const [Category, setCategory] = useState();
  const [randomNumber, setrandomNumber] = useState(2);


  const fetchCategory = async () => {
    const response = await apis.apiCategory();
    if(response.status)setCategory(response.rs)


  };
  useEffect(() => {
    fetchCategory()
    if (banner && banner.length > 0) {
      setrandomNumber(random(banner.length));
    }
  }, [title]);
  const handleChangeOption = (e) => {
    let selectElement = document.getElementById("option").value;
    Dispatch(getProduct({ sort: selectElement, title: fncut(title) }));
  };

  return (
    <div className="flex flex-col  ">
      <img src={banner[randomNumber]} alt="" className="w-full object-contain" />
      <div className="container md:mx-auto flex pt-8  gap-6">
        <div className="flex-1 ">
          <NavBarLeft title={title} />
        </div>
        <div className="flex-3">
          <div className="flex flex-col  ">
            <h3 className="font-bold text-2xl px-2">{Category?.filter(e => e.slug === title).title}</h3>
            <div className="flex justify-end p-4 items-center gap-3 text-md font-normal">
              <span>
                Hiển thị {product.counts} trong {product.counts} Kết quả
              </span>
              <select
                id="option"
                defaultValue="-createdAt"
                onChange={(e) => handleChangeOption(e)}
                className="border-[1px] rounded-md border-[#bbb9b9] py-2 w-1/3  focus:outline-none text-md"
              >
                <option selected  value="-createdAt">
                  Mới nhất
                </option>
                <option  value="price">Giá tăng dần</option>
                <option value="-price">Giá giảm dần</option>
                <option value="-sale">Sale</option>
              </select>
            </div>
          </div>
          <Product data={product?.product} css />
        </div>
      </div>
    </div>
  );
};

export default Details;
