import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import Filter from "./Components/Filter/Filter";
import SearchPeopleList from "./Components/SearhPeople/SearchPeopleList/SearchPeopleList";
import funnel from "/icons/funnel.svg";
import { useState } from "react";

const SearchPage = () => {
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  const handleOpenFilter = () => {
    setIsFilterOpened((prev) => !prev);
  };

  return (
    <>
      {!isFilterOpened && (
        <TopicHeader>
          <h1>Поиск людей</h1>
          <button onClick={handleOpenFilter}>
            <img src={funnel} alt="funnel" />
          </button>
        </TopicHeader>
      )}
      {isFilterOpened ? (
        <Filter onCloseFilter={handleOpenFilter} />
      ) : (
        <SearchPeopleList />
      )}
    </>
  );
};

export default SearchPage;
