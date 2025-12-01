import { Link } from "react-router-dom";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import Content from "./Components/Main/Content/Content";
import News from "./Components/Main/News";
import gear from "/icons/gear.svg";

const MainPage = () => {
  return (
    <div className="bg-purple-background-wrap min-h-[100vh] flex flex-col overflow-y-scroll">
      <div className="bg-white lg:bg-transparent">
        <TopicHeader>
          <h1>Главная</h1>
          <Link to={"/settings"}>
            <img src={gear} alt="" />
          </Link>
        </TopicHeader>
        <News />
      </div>

      <div className="flex-1">
        <Content />
      </div>
    </div>
  );
};

export default MainPage;
