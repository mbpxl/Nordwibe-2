// компонента для отображения слайдера и карточек на главной странице

import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
import Carts from "./Carts";
import Slider from "./Slider";

const Content = () => {
  return (
    <Wrapper className="bg-purple-background-wrap h-screen min-[453px]:mt-2">
      <div className="max-w-[630px] m-auto">
        <Slider />
        <Carts />
      </div>
    </Wrapper>
  );
};

export default Content;
