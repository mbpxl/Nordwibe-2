// компонента для слайдера, который под сторисами на главной странице
import content_slider from "/imgs/content-slider/content-slider.png";

const Slider = () => {
  return (
    <div className="py-2 min-[338px]:mb-4 flex justify-center">
      <div className="h-[8.5rem] rounded-[12px]">
        <img src={content_slider} alt="" />
      </div>
    </div>
  );
};

export default Slider;
