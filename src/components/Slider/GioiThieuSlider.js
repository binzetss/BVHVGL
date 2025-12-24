import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./GioiThieuSlider.css";
import { LazyImage } from "../LazyImage/LazyImage";
import img1 from "../../assets/vechungtoi/dautrang.jpg";

const slides = [img1];
const fullSlides = slides.length < 2 ? [...slides, ...slides] : slides;

export default function GioiThieuSlider() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => {
        if (!swiperRef.current?.swiper) return;
        entries.forEach((e) => {
          if (e.isIntersecting) swiperRef.current.swiper.autoplay.start();
          else swiperRef.current.swiper.autoplay.stop();
        });
      },
      { threshold: 0.3 }
    );

    if (swiperRef.current) ob.observe(swiperRef.current);
    return () => {
      if (swiperRef.current) ob.unobserve(swiperRef.current);
    };
  }, []);

  return (
    <div className="gt-slider">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={900}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={fullSlides.length > 1}
        pagination={{ clickable: true }}
        className="gt-swiper"
      >
        {fullSlides.map((img, i) => (
          <SwiperSlide key={i}>

            {/* ⭐ OVERLAY TEXT ⭐ */}
            <div className="gt-overlay">
              <h1 className="gt-title-text">Giới thiệu</h1>
              <p className="gt-sub-text">
                Hệ thống Y tế Hùng Vương Gia Lai – Thân thiện, chuyên nghiệp, chu đáo.
              </p>
            </div>

            <LazyImage
              src={img}
              alt={`slider-${i}`}
              className="gt-slider-img"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
