import Header from "../../shared/Components/Heading/Heading";
import Content from "./Components/Main/Content/Content";
import News from "./Components/Main/News";

const MainPage = () => {
  return (
    <>
      <Header title={"Главная"} imgSrc={"/icons/gear.svg"} />
      <News />
      <Content />
    </>
  );
};

export default MainPage;
