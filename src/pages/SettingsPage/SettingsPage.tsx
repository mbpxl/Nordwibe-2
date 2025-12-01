import { Link } from "react-router-dom";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import arrow from "/icons/arrow-left.svg";
import SettingsButtonList from "./components/SettingsButtonList/SettingsButtonList";
import Wrapper from "../../shared/Components/Wrapper/Wrapper";

const SettingsPage = () => {
  return (
    <div className="lg:bg-purple-background-wrap lg:min-h-[100vh] flex justify-center lg:items-center lg:py-10">
      <div className="w-full lg:w-[400px] lg:h-[564px] lg:bg-white lg:rounded-xl lg:shadow-md">
        <TopicHeader>
          <Link to={"/"}>
            <img src={arrow} className="lg:hidden" alt="back" />
          </Link>
          <h1 className="text-black-heading text-[1.25rem] font-semibold leading-5 lg:text-[1.5rem] lg:font-bold lg:mt-5">
            Настройки
          </h1>
        </TopicHeader>

        <Wrapper className="px-4 lg:px-6 pt-2 lg:pt-4">
          <SettingsButtonList />
        </Wrapper>
      </div>
    </div>
  );
};

export default SettingsPage;
