/* eslint-disable @typescript-eslint/no-explicit-any */

import SearchPeopleItem from "../SearchPeopleItem/SearchPeopleItem";

const SearchPeopleList = () => {
  const arr = [
    <SearchPeopleItem />,
    <SearchPeopleItem />,
    <SearchPeopleItem />,
    <SearchPeopleItem />,
    <SearchPeopleItem />,
    <SearchPeopleItem />,
    <SearchPeopleItem />,
    <SearchPeopleItem />,
    <SearchPeopleItem />,
    <SearchPeopleItem />,
    <SearchPeopleItem />,
    <SearchPeopleItem />,
    <SearchPeopleItem />,
  ];

  return (
    <>
      <div className="bg-purple-background-wrap px-3 pt-1 pb-16">
        <div>
          {arr.map((elem: any) => (
            <div className="mt-4">{elem}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPeopleList;
