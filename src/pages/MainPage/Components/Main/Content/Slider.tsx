import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { carouselImages } from "../../../misc/carousel/carouselMock";

const ImageCarousel = () => {
  const images = carouselImages;

  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl mb-1 overflow-hidden shadow-2xl">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect="fade"
        style={
          {
            "--bullet-color": "#fff",
            "--swiper-pagination-color": "#d8d8ff",
          } as React.CSSProperties
        }
        loop={true}
        className="w-full h-[155px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={image.url}
                alt={image.alt || `Slide ${index + 1}`}
                className="w-full h-full object-cover" // object-cover заполняет всю область, обрезая края
              />
              {(image.title || image.description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white p-2">
                  <div className="max-w-4xl mx-auto text-center">
                    {image.title && (
                      <h3 className="text-xs font-bold">{image.title}</h3>
                    )}
                    {image.description && (
                      <p className="text-xs opacity-90">{image.description}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
