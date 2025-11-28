import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { baseURLforImages } from "../../../../../shared/plugin/axios";

interface PhotoViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: string[];
  initialSlide?: number;
}

export const PhotoViewModal: React.FC<PhotoViewModalProps> = ({
  isOpen,
  onClose,
  photos,
  initialSlide = 0,
}) => {
  if (!isOpen) return null;
  if (photos[0] == null) {
    return;
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Кнопка закрытия */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Слайдер для просмотра фото */}
      <div className="w-full h-full max-w-4xl max-h-full">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          initialSlide={initialSlide}
          className="w-full h-full"
        >
          {photos.map((photo, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <div className="flex items-center justify-center w-full h-full p-4">
                <img
                  src={baseURLforImages + photo}
                  alt={`Просмотр ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
