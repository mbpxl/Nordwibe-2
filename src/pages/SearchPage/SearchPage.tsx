import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import SearchPeopleList from "./Components/SearhPeople/SearchPeopleList/SearchPeopleList";
import funnel from "/icons/funnel.svg";

const SearchPage = () => {
  return (
    <>
      <TopicHeader>
        <h1>Поиск людей</h1>
        <img src={funnel} alt="funnel" />
      </TopicHeader>
      <SearchPeopleList />
    </>
  );
};

export default SearchPage;
