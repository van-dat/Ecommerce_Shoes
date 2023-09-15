import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { noShow } from "../store/appSlice";
import { fnPrice } from "../ultils/fn";
import { Modal } from "react-responsive-modal";
import Slider from "react-slick";
import icons from "../ultils/icon";

const overlay = "bg-modal";
const modal = "drop-shadow-none w-full max-w-4xl";
const { HiMinus, HiMiniPlus, RiShoppingCartLine  } = icons;

const Model = () => {
  const { isHidden, oneproduct } = useSelector((state) => state.app);
  const Dispatch = useDispatch();
  const [Select, setSelect] = useState(0);
  const [Number, setNumber] = useState(1);
  useEffect(() => {
    setNumber(1)
  }, [oneproduct]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2500,
    mobileFirst: true,
    arrows: false,
  };
  return (
    <div>
      {oneproduct && (
        <div>
          <Modal
            open={isHidden}
            onClose={() => Dispatch(noShow())}
            center
            classNames={{
              overlay,
              modal,
              root,
            }}
          >
            <div className="flex gap-8">
              <div className=" flex-1 h-max-[500px] w-1/2 items-center ">
                <Slider {...settings}>
                  {oneproduct?.thumbnail?.map((i, index) => (
                    <div key={index} className="flex items-center h-[430px] focus:outline-none">
                      <img src={i} alt="slider" className="w-full focus:outline-none object-contain" />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="flex-1 flex flex-col gap-3 w-1/2 justify-start h-full py-6 text-md font-medium  capitalize tetx-[#292929] ">
                <span className="font-semibold">{oneproduct?.title}</span>
                <span>{`Tình trạng: ${oneproduct?.quantity > 0 ? "Còn hàng" : "Hết hàng"}`}</span>
                <span className="text-main-200 font-bold">{`${fnPrice(oneproduct.price)}₫`}</span>
                <div className="flex gap-3 items-center ">
                  <span className="text-[#6a6a6a]">Size</span>
                  {oneproduct?.size?.map((i) => (
                    <div
                      onClick={() => setSelect(i.size)}
                      className={`flex items-center cursor-pointer  border-[1px] px-2 py-1 ${
                        Select === i.size ? "border-[1px] border-dashed border-main-300" : ""
                      }`}
                      key={i._id}
                    >
                      <span>{i.size}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center pl-10 gap-2 select-none  ">
                  <div className="bg-[#ddd] border-[1px]  flex items-center">
                    <span onClick={() => setNumber((prev) => prev - 1)} className="py-2 px-4 cursor-pointer">
                      <HiMinus />
                    </span>
                    <span className=" py-2 bg-white text-center w-[50px] select-none">{Number}</span>
                    <span onClick={() => setNumber((prev) => prev + 1)} className="py-2 px-4 cursor-pointer ">
                      <HiMiniPlus />
                    </span>
                  </div>
                </div>
                <div className="w-full flex items-center py-4">
                  <div className=" select-none flex w-1/2 bg-main-100 p-2 rounded-sm text-sm font-semibold text-white cursor-pointer items-center gap-2"><RiShoppingCartLine size={24}/> <span>Thêm vào giỏ hàng</span></div>
                  <div className=" select-none flex w-1/2 p-2 rounded-sm text-sm font-semibold text-main-100 cursor-pointer">mua với voucher</div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default memo(Model);
