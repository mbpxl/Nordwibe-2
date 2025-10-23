import { Link, useNavigate } from "react-router-dom";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import Content from "./Components/Main/Content/Content";
import News from "./Components/Main/News";
import gear from "/icons/gear.svg";
import { useEffect } from "react";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("first-seen")) {
      navigate("/welcome");
    }
  });

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
