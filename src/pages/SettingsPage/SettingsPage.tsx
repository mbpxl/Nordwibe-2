import { Link } from "react-router-dom";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import arrow from "/icons/arrow-left.svg";
import SettingsButtonList from "./components/SettingsButtonList/SettingsButtonList";
import Wrapper from "../../shared/Components/Wrapper/Wrapper";

const SettingsPage = () => {
  return (
    <div className="">
      <TopicHeader>
        <Link to={"/"}>
          <img src={arrow} alt="back" />
        </Link>
        <h1 className="text-black-heading text-[1.25rem] font-semibold leading-5">
          Настройки
        </h1>
      </TopicHeader>

      <Wrapper>
        <SettingsButtonList />
      </Wrapper>
    </div>
  );
};

export default SettingsPage;
