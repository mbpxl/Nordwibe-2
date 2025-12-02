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
    <div className="md:bg-purple-background-wrap md:min-h-[100vh]">
      {/* Мобильная версия - оставляем как было */}
      <div className="md:hidden">
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
      </div>

      {/* Desktop версия - две колонки */}
      <div className="hidden md:block md:mt-10">
        <div className="max-w-[1340px] mx-auto px-4 py-6">
          <div className="md:hidden">
            <TopicHeader>
              <h1 className="text-2xl font-bold">Поиск людей</h1>
              {/* На десктопе убираем кнопку фильтра - фильтр всегда открыт */}
            </TopicHeader>
          </div>

          <div className="flex gap-8">
            {/* Левая колонка - фильтр */}
            <div className="w-full max-w-[440px] flex-shrink-0">
              <Filter
                onCloseFilter={handleOpenFilter}
                onApplyFilters={handleApplyFilters}
                initialFilters={filters}
                isDesktop={true}
              />
            </div>

            {/* Правая колонка - список людей */}
            <div className="flex-1 min-w-0">
              <SearchPeopleList filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
