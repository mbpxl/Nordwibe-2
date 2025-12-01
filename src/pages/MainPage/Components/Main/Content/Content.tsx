import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
import Carts from "./Carts";
import Slider from "./Slider";

const Content = () => {
  return (
    <Wrapper className="bg-purple-background-wrap min-[453px]:mt-2 lg:mt-12">
      <div className="max-w-[630px] lg:max-w-[1340px] m-auto lg:flex lg:items-start lg:justify-between lg:gap-6">
        <Slider />
        <Carts />
      </div>
    </Wrapper>
  );
};

export default Content;
