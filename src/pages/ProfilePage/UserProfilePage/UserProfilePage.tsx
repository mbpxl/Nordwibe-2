import AboutMyself from "../Components/AboutMyself/AboutMyself";
import HashTagBar from "../Components/HashTagBar/HashTagBar";
import Heading from "../../../shared/Components/Heading/Heading";
import StatusBar from "../Components/StatusBar/StatusBar";

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
