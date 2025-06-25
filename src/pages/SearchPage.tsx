import Heading from "../components/Heading/Heading";
import SearchPeopleList from "../components/SearhPeople/SearchPeopleList/SearchPeopleList";

const SearchPage = () => {
  return (
    <>
      <Heading title={"Чаты"} imgSrc={"/icons/search.svg"} />
      <SearchPeopleList />
    </>
  );
};

export default SearchPage;
