import Content from "../components/Main/Content/Content";
import Header from "../components/Heading/Heading";
import News from "../components/Main/News";

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
