import content_slider from "/imgs/content-slider/content-slider.png";

const Slider = () => {
  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl mb-1 overflow-hidden shadow-2xl lg:w-[640px] lg:h-[360px] lg:flex-shrink-0">
      <div className="w-full h-full object-cover">
        <img
          src={content_slider}
          alt="img"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
