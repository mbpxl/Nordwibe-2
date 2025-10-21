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
  const [isPhotoOpened, setIsPhotoOpened] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lastClickedIndex, setLastClickedIndex] = useState<number>(-1);

  // Функция для обработки клика по фото
  const handlePhotoClick = (index: number) => {
    // Если кликнули на уже активную фотографию - открываем полноэкранный режим
    if (index === activeIndex && index === lastClickedIndex) {
      setIsPhotoOpened(true);
    }

    // Сохраняем индекс последнего клика
    setLastClickedIndex(index);

    // Если кликнули на неактивную фотографию - просто переключаемся на неё
    // (это сделает её активной, и следующий клик откроет полноэкранный режим)
  };

  // Функция для закрытия фото
  const handleClosePhoto = () => {
    setIsPhotoOpened(false);
  };

  // Функция для переключения фото в полноэкранном режиме
  const handleFullScreenSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.realIndex);
  };

  if (photos.length === 1) {
    return (
      <>
        <div className="w-full h-[136px] flex justify-center items-center overflow-hidden">
          <div
            className="w-[136px] h-[136px] rounded-full overflow-hidden cursor-pointer"
            onClick={() => handlePhotoClick(0)}
          >
            {photos[0] ? (
              <img
                src={photos[0]}
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

        {/* Модальное окно для полноэкранного просмотра (одиночное фото) */}
        {isPhotoOpened && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center">
            <div className="relative w-full h-full flex justify-center items-center">
              <button
                onClick={handleClosePhoto}
                className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center z-10"
              >
                ×
              </button>

              <div className="max-w-4xl max-h-[80vh] w-full h-full flex justify-center items-center p-4">
                <img
                  src={photos[0]}
                  alt="photo-fullscreen"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
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
            // Сбрасываем lastClickedIndex при свайпе, чтобы после свайпа нужен был двойной клик
            setLastClickedIndex(-1);
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
                  className={`rounded-full overflow-hidden aspect-square w-full h-full transition-transform duration-500 cursor-pointer`}
                  style={{
                    transform: `scale(${isActive ? 1 : 0.68})`,
                  }}
                  onClick={() => handlePhotoClick(i)}
                >
                  {src ? (
                    <img
                      src={src}
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

      {/* Модальное окно для полноэкранного просмотра (слайдер) */}
      {isPhotoOpened && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center">
          <div className="relative w-full h-full">
            {/* Кнопка закрытия */}
            <button
              onClick={handleClosePhoto}
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-opacity-70 transition-all"
            >
              ×
            </button>

            {/* Слайдер для полноэкранного просмотра */}
            <Swiper
              initialSlide={activeIndex}
              spaceBetween={0}
              slidesPerView={1}
              centeredSlides={true}
              loop={photos.length > 1}
              onSlideChange={handleFullScreenSlideChange}
              className="w-full h-full"
            >
              {photos.map((src, i) => (
                <SwiperSlide
                  key={i}
                  className="flex justify-center items-center"
                >
                  <div className="w-full h-full flex justify-center items-center p-4">
                    {src ? (
                      <img
                        src={src}
                        alt={`photo-fullscreen-${i}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="flex justify-center items-center h-32 w-32 bg-purple-sub-button text-white font-semibold text-4xl rounded-full">
                        {username ? username[0].toUpperCase() : "П"}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Индикатор текущего фото */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
              {activeIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
