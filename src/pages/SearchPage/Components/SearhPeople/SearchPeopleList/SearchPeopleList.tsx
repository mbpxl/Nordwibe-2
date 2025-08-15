/* eslint-disable @typescript-eslint/no-explicit-any */

import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
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
      <Wrapper className="bg-purple-background-wrap pt-1 pb-16">
        <div>
          {arr.map((elem: any) => (
            <div className="mt-4">{elem}</div>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default SearchPeopleList;
