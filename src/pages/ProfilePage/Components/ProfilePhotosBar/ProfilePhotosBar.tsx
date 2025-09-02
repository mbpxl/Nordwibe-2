import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

interface PhotoSliderProps {
  photos: string[];
  username?: string;
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({
  photos,
  username,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (photos.length === 1) {
    // ⚡️ Отдельный рендер для одного фото
    return (
      <div className="w-full h-[136px] flex justify-center items-center overflow-hidden">
        <div className="w-[136px] h-[136px] rounded-full overflow-hidden">
          {photos[0] ? (
            <img
              src={"https://3133319-bo35045.twc1.net/" + photos[0]}
              alt="photo-0"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex justify-center items-center h-full bg-purple-sub-button text-white font-semibold text-4xl">
              {username ? username[0].toUpperCase() : "П"}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[136px] flex justify-center items-center overflow-hidden">
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
                {src ? (
                  <img
                    src={"https://3133319-bo35045.twc1.net/" + src}
                    alt={`photo-${i}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center h-full bg-purple-sub-button text-white font-semibold text-4xl">
                    {username ? username[0].toUpperCase() : "П"}
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
