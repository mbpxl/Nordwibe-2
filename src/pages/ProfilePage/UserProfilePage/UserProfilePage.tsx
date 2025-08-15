import AboutMyself from "../Components/AboutMyself/AboutMyself";
import HashTagBar from "../Components/HashTagBar/HashTagBar";
import Heading from "../../../shared/Components/TopicHeader/TopicHeader";
import StatusBar from "../Components/StatusBar/StatusBar";
import Wrapper from "../../../shared/Components/Wrapper/Wrapper";

const UserProfilePage = () => {
  return (
    <Wrapper className="px-4">
      <Heading title={"Александр, 21"} imgSrc={"/icons/show_more.svg"} />
      <AboutMyself about={""} />
      <HashTagBar hashTags={["Кушать", "Гулять"]} />
      <StatusBar />
    </Wrapper>
  );
};

export default UserProfilePage;
