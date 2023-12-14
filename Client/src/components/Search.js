import icons from "../ultils/icon";


const { IoCloseOutline, BiSearch } = icons;

const Search = () => {
  return (
    <div className="w-w-search bg-white border-2 border-main rounded-[20px] items-center flex h-7 text-[#363636] font-medium relative">
      <div className="absolute right-3 cursor-pointer hidden">
        <IoCloseOutline size={20} />
      </div>

      <button className="px-2 outline-none">
        <BiSearch size={24} />
      </button>
      <div className="w-[95%]">
        <input
          className="outline-none bg-transparent w-[90%] py-1 text-sm text-ellipsis"
          type="text"
          placeholder="Tìm kiếm sản phẩm"
        />
      </div>
    </div>
  );
};

export default Search;
