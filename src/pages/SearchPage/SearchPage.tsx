import Heading from "../../shared/Components/Heading/Heading";
import SearchPeopleList from "./Components/SearhPeople/SearchPeopleList/SearchPeopleList";

const SearchPage = () => {
  return (
    <>
      <Heading title={"Чаты"} imgSrc={"/icons/search.svg"} />
      <SearchPeopleList />
    </>
  );
};

export default SearchPage;
