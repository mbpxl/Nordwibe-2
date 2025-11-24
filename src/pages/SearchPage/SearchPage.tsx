// SearchPage.tsx
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import Filter from "./Components/Filter/Filter";
import SearchPeopleList from "./Components/SearhPeople/SearchPeopleList/SearchPeopleList";
import funnel from "/icons/funnel.svg";
import { useState } from "react";
import type { FilterType } from "./types/filterTypes";

const SearchPage = () => {
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterType>({});

  const handleOpenFilter = () => {
    setIsFilterOpened((prev) => !prev);
  };

  const handleApplyFilters = (newFilters: FilterType) => {
    setFilters(newFilters);
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
        <Filter
          onCloseFilter={handleOpenFilter}
          onApplyFilters={handleApplyFilters}
          initialFilters={filters}
        />
      ) : (
        <SearchPeopleList filters={filters} />
      )}
    </>
  );
};

export default SearchPage;
