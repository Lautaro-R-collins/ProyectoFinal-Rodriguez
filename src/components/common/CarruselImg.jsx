import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  { id: 1, src: "https://whiteface.com/wp-content/uploads/sites/3/2022/07/1920x600.jpg", alt: "Primera imagen" },
  { id: 2, src: "https://f.fcdn.app/imgs/bfa68d/www.sportmarket.com.uy/smaruy/5fd4/original/recursos/128/1920x600/15.jpg", alt: "Segunda imagen" },
  { id: 3, src: "https://f.fcdn.app/imgs/ea2c0b/www.sportmarket.com.uy/smaruy/ec7f/original/recursos/55/1920x600/10.jpg", alt: "Tercera imagen" },
];

function ImageCarousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop
      autoplay={{ delay: 4000, disableOnInteraction: false }}
    >
      {images.map((img) => (
        <SwiperSlide key={img.id}>
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-[500px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageCarousel;
