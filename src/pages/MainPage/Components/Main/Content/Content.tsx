// компонента для отображения слайдера и карточек на главной странице

import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
import Carts from "./Carts";
import Slider from "./Slider";

const Content = () => {
  return (
    <Wrapper className="bg-purple-background-wrap min-[453px]:mt-2 pb-2">
      <Slider />
      <Carts />
    </Wrapper>
  );
};

export default Content;
