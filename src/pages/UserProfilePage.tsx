import AboutMyself from "../components/AboutMyself/AboutMyself";
import HashTagBar from "../components/HashTagBar/HashTagBar";
import Heading from "../components/Heading/Heading";
import StatusBar from "../components/StatusBar/StatusBar";

const UserProfilePage = () => {
  return (
    <div className="px-4">
      <Heading title={"Александр, 21"} imgSrc={"/icons/show_more.svg"} />
      <AboutMyself />
      <HashTagBar />
      <StatusBar />
    </div>
  );
};

export default UserProfilePage;
