// компонента для отображения слайдера и карточек на главной странице

import Carts from "./Carts";
import Slider from "./Slider";

const Content = () => {
  return (
    <div className="bg-purple-background-wrap min-[453px]:mt-2 px-4 pb-2">
      <Slider />
      <Carts />
    </div>
  );
};

export default Content;
