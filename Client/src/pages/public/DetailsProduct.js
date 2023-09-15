import { fnPrice } from "../../ultils/fn";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import icons from "../../ultils/icon";
import { useState } from "react";
import { memo } from "react";

const { HiMinus, HiMiniPlus, RiShoppingCartLine } = icons;

const DetailsProduct = () => {
  const { oneproduct } = useSelector((state) => state.app);
  const [Select, setSelect] = useState(0);
  const [Number, setNumber] = useState(1);
  const [Hidden, setHidden] = useState(0);


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
  console.log(oneproduct)
  return (
    <>
      {oneproduct && (
        <div className="container mx-auto mt-[165px] pb-[50px]">
          <div className="h-[60px]"></div>
          <div className="flex gap-8">
            <div className=" flex-1 w-1/3 items-center ">
              <Slider {...settings}>
                {oneproduct?.thumbnail?.map((i, index) => (
                  <div key={index} className="flex items-center    focus:outline-none">
                    <img src={i} alt="slider" className="w-full focus:outline-none object-contain" />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="flex-3 flex flex-col gap-3 w-2/3 justify-start h-full py-6 text-md font-medium  capitalize tetx-[#292929] ">
              <span className="font-semibold">{oneproduct?.title}</span>
              <span>{`Tình trạng: ${oneproduct?.quantity > 0 ? "Còn hàng" : "Hết hàng"}`}</span>
              {oneproduct.price && <span className="text-main-200 font-bold">{`${fnPrice(oneproduct.price)}₫`}</span>}
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
                <div className=" select-none flex w-1/3 bg-main-100 p-2 rounded-sm text-sm font-semibold text-white cursor-pointer items-center gap-2">
                  <RiShoppingCartLine size={24} /> <span>Thêm vào giỏ hàng</span>
                </div>
                <div className=" select-none flex w-1/3 p-2 rounded-sm text-sm font-semibold text-main-100 cursor-pointer">
                  mua với voucher
                </div>
              </div>
            </div>
          </div>
          <div className="h-4"></div>
          <div className="inline-flex px-3 py-1 border-[1px] ">
            <span>Sản phẩm yêu thích</span>
            <span className="hidden">Đã thêm vào yêu thích</span>
          </div>
          <div className="flex  justify-between pt-10">
            <div className="flex gap-3  font-semibold text-md items-center ">
                <div onClick={()=>setHidden(0)} className={`py-2 text-center cursor-pointer  w-[200px]  rounded-sm ${Hidden === 0? 'bg-main-100 text-white': 'bg-[#ddd] hover:bg-main-100 hover:text-white'}`}>Mô tả</div>
                <div onClick={()=>setHidden(1)} className= {`py-2 text-center cursor-pointer text-black w-[200px]  rounded-sm ${Hidden === 1 ? 'bg-main-100 text-white' : ''}`}>Đánh giá</div>
            </div>
            <div>shipment</div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(DetailsProduct);
