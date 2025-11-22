import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { baseURLforImages } from "../../../../../shared/plugin/axios";
import { PhotoActionsMenu } from "../PhotoActionsMenu/PhotoActionsMenu";
import { EditPhotoModal } from "../EditPhotoModal/EditPhotoModal";

interface PhotoSliderProps {
  photos: string[];
  username?: string;
  onPhotosUpdate?: (newPhotos: string[]) => void;
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({
  photos,
  username,
  onPhotosUpdate,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const currentPhoto = photos[activeIndex];

  const handlePhotoClick = () => {
    setIsMenuOpen(true);
  };

  const handleOpenPhoto = () => {
    // TODO: Реализовать открытие фото в полноэкранном режиме
    console.log("Открыть фото:", currentPhoto);
  };

  const handleEditPhoto = () => {
    setIsEditModalOpen(true);
  };

  const handleDeletePhoto = () => {
    // TODO: Реализовать удаление фото
    console.log("Удалить фото:", currentPhoto);
    // Заглушка - пока просто выводим в консоль
    alert("Функционал удаления будет реализован позже");
  };

  const handlePhotoUpdate = (newPhotoUrl: string) => {
    const newPhotos = [...photos];
    newPhotos[activeIndex] = newPhotoUrl;
    onPhotosUpdate?.(newPhotos);
  };

  if (photos.length === 1) {
    return (
      <>
        <div className="w-full h-[136px] flex justify-center items-center overflow-hidden">
          <button
            onClick={handlePhotoClick}
            className="w-[136px] h-[136px] rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-main"
          >
            {photos[0] ? (
              <img
                src={baseURLforImages + photos[0]}
                alt="photo-0"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex justify-center items-center h-full bg-purple-sub-button text-white font-semibold text-4xl">
                {username ? username[0].toUpperCase() : "П"}
              </div>
            )}
          </button>
        </div>

        <PhotoActionsMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onOpen={handleOpenPhoto}
          onEdit={handleEditPhoto}
          onDelete={handleDeletePhoto}
          hasPhoto={!!photos[0]}
        />

        <EditPhotoModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onPhotoUpdate={handlePhotoUpdate}
          currentPhoto={photos[0]}
        />
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
                <button
                  onClick={handlePhotoClick}
                  className={`rounded-full overflow-hidden aspect-square w-full h-full transition-transform duration-500 focus:outline-none focus:ring-2 focus:ring-purple-main ${
                    isActive ? 'ring-2 ring-purple-main' : ''
                  }`}
                  style={{
                    transform: `scale(${isActive ? 1 : 0.68})`,
                  }}
                >
                  {src ? (
                    <img
                      src={baseURLforImages + src}
                      alt={`photo-${i}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex justify-center items-center h-full bg-purple-sub-button text-white font-semibold text-4xl">
                      {username ? username[0].toUpperCase() : "П"}
                    </div>
                  )}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <PhotoActionsMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpen={handleOpenPhoto}
        onEdit={handleEditPhoto}
        onDelete={handleDeletePhoto}
        hasPhoto={!!currentPhoto}
      />

      <EditPhotoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onPhotoUpdate={handlePhotoUpdate}
        currentPhoto={currentPhoto}
      />
    </>
  );
};