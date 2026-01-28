import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./HomeSlider.css";
import { LazyImage } from "../LazyImage/LazyImage";

import banner1 from "../../assets/bgslide.jpg";
import banner2 from "../../assets/cttm.jpg";
import banner3 from "../../assets/cc115.jpg";
import banner4 from "../../assets/KSK.jpg";
import banner5 from "../../assets/NƠI KHÁM CHỮA BỆNH.jpg";
import banner6 from "../../assets/tblkcb.jpg";

const slides = [banner1,banner2,banner3,banner4,banner5,banner6];
const fullSlides = slides.length > 6 ? [...slides, ...slides] : slides;

export default function HomeSlider() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (swiperRef.current?.swiper) {
            entry.isIntersecting
              ? swiperRef.current.swiper.autoplay.start()
              : swiperRef.current.swiper.autoplay.stop();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (swiperRef.current) observer.observe(swiperRef.current);

    return () => {
      if (swiperRef.current) observer.unobserve(swiperRef.current);
    };
  }, []);

  return (
    <div className="slider-wrapper">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={fullSlides.length > 1}        // ⭐ AUTO FIX
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation
        fadeEffect={{ crossFade: true }}
        className="slider-swiper"
      >
        {fullSlides.map((img, i) => (
          <SwiperSlide key={i}>
            <LazyImage src={img} alt={`Banner ${i + 1}`} className="slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
