import HashTag from "../../HashTag/HashTag";

const SearchPeopleItem = () => {
  return (
    <>
      <div className="bg-[#A0A0A0] p-2 flex gap-3 max-w-[700px] rounded-[12px]">
        <div className="w-[60px] h-[60px] bg-amber-950 rounded-[50%] shrink-0">
          {/* <img src="" alt="" /> */}
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="text-[0.875rem] font-semibold leading-5 text-left">
              Аракадий, 21
            </h2>
            <div className="bg-[#6B6B6B] rounded-[12px] text-[0.875rem] font-semibold leading-[0.75rem] text-white py-1 px-2">
              34%
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3>Хештеги: </h3>
            <div className="flex gap-1">
              <HashTag hashtagTitle={"игры"} />
              <HashTag hashtagTitle={"фильмы"} />
              <HashTag hashtagTitle={"книги"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPeopleItem;
