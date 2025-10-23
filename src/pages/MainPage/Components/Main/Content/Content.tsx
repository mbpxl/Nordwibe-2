import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
import Carts from "./Carts";
import Carousel from "./Slider";

const Content = () => {
  return (
    <Wrapper className="bg-purple-background-wrap h-screen min-[453px]:mt-2">
      <div className="max-w-[630px] m-auto">
        <Carousel />
        <Carts />
      </div>
    </Wrapper>
  );
};

export default Content;
