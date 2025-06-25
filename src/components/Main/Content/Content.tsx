// компонента для отображения слайдера и карточек на главной странице

import Carts from "./Carts";
import Slider from "./Slider";

const Content = () => {
  return (
    <div className="bg-[#F0F0F0] px-4 pb-2">
      <Slider />
      <Carts />
    </div>
  );
};

export default Content;
