import { Link } from "react-router-dom";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import Content from "./Components/Main/Content/Content";
import News from "./Components/Main/News";
import gear from "/icons/gear.svg";

const MainPage = () => {
  return (
    <div className="">
      <TopicHeader>
        <h1>Главная</h1>
        <Link to={"/settings"}>
          <img src={gear} alt="" />
        </Link>
      </TopicHeader>
      <News />
      <Content />
    </div>
  );
};

export default MainPage;
