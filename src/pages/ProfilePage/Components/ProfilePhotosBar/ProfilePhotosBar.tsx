import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

// import "swiper/css";

interface PhotoSliderProps {
  photos: string[];
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <Swiper
        initialSlide={1}
        spaceBetween={-15}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={photos.length > 3}
        rewind={photos.length <= 3}
        slideToClickedSlide={true}
        onSwiper={(swiper: SwiperCore) => {
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper: SwiperCore) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="flex justify-center items-center"
      >
        {photos.map((src, i) => {
          const isActive = i === activeIndex;

          return (
            <SwiperSlide
              key={i}
              className="!flex justify-center items-center"
              style={{
                width: "136px",
                height: "136px",
              }}
            >
              <div
                className={`rounded-full overflow-hidden aspect-square w-full h-full transition-transform duration-500`}
                style={{
                  transform: `scale(${isActive ? 1 : 0.68})`,
                }}
              >
                <img
                  src={src}
                  alt={`photo-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
