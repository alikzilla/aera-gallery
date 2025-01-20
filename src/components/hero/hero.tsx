import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Hero = () => {
  return (
    <section className="w-full">
      <Swiper
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={800}
        modules={[Autoplay]}
        className="w-full"
      >
        <SwiperSlide>
          <img
            src="https://visagehall.ru/upload/resize_cache/webp/iblock/038/mci81vpsuaj7m6znje5b749990rfsdul.webp"
            alt="Slide 1"
            className="w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://visagehall.ru/upload/resize_cache/webp/uf/ee5/f403szm2j9zqga4hu1ecayjhzlu5tyv5.webp"
            alt="Slide 2"
            className="w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://visagehall.ru/upload/resize_cache/webp/resize_cache/uf/e8c/1920_1080_0/gdrd5vwmdbnoyad0s7oiolk7rim344tc.webp"
            alt="Slide 3"
            className="w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://visagehall.ru/upload/resize_cache/webp/resize_cache/uf/200/1920_1080_0/w6ueu7tidtrixt6b4emv43zh2ymlfah1.webp"
            alt="Slide 4"
            className="w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://visagehall.ru/upload/resize_cache/webp/resize_cache/uf/e20/1920_1080_0/kwgnqysbql954qkuputy0p6x072vc4hy.webp"
            alt="Slide 5"
            className="w-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
      <br />
    </section>
  );
};

export default Hero;
