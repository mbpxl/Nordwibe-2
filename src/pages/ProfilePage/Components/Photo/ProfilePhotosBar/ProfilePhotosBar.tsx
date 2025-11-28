import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { baseURLforImages } from "../../../../../shared/plugin/axios";
import { PhotoActionsMenu } from "../PhotoActionsMenu/PhotoActionsMenu";
import { EditPhotoModal } from "../EditPhotoModal/EditPhotoModal";
import { PhotoViewModal } from "../PhotoViewModal/PhotoViewModal";
import OptimizedImage from "../../../../../shared/Components/OptimizedImage/OptimizedImage";

interface PhotoSliderProps {
  photos: string[];
  username?: string;
  onPhotosUpdate?: (newPhotos: string[]) => void;
  isMyAccount?: boolean;
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({
  photos,
  username,
  onPhotosUpdate,
  isMyAccount = true,
}) => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const currentPhoto = photos[activeIndex];

  const handlePhotoClick = () => {

    if (!isMyAccount) {
      setIsViewModalOpen(true);
      return;
    }
    setIsMenuOpen(true);
  };

  const handleOpenPhoto = () => {
    setIsViewModalOpen(true);
  };

  const handleEditPhoto = () => {
    setIsEditModalOpen(true);
  };

  const handleDeletePhoto = () => {
    // TODO: Реализовать удаление фото
    console.log("Удалить фото:", currentPhoto);
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
              <OptimizedImage
                className="object-cover"
                src={baseURLforImages + photos[0]}
                alt="avatar"
                width={136}
                height={136}
                quality={30}
                priority={true}
              />
            ) : (
              <div className="flex justify-center items-center h-full bg-purple-sub-button text-white font-semibold text-4xl">
                {username ? username[0].toUpperCase() : "П"}
              </div>
            )}
          </button>
        </div>

        {isMyAccount && (
          <>
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
        )}

        <PhotoViewModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          photos={photos}
          initialSlide={0}
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
                    isActive ? "ring-2 ring-purple-main" : ""
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

      {/* Меню действий и модальное окно редактирования показываем только для своего аккаунта */}
      {isMyAccount && (
        <>
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
      )}

      {/* Модальное окно просмотра фото - для всех аккаунтов */}
      
      <PhotoViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        photos={photos}
        initialSlide={activeIndex}
      />
    </>
  );
};
