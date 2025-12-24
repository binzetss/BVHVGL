import React, { useRef, useEffect } from "react";
import "./CustomerSection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { LazyImage } from "../LazyImage/LazyImage";

// ===== Logo sample =====
import fullerton from "../../assets/logontt1.jpg";
import leapstack from "../../assets/logontt2.jpg";
import pacific from "../../assets/logontt3.jpg";
import papaya from "../../assets/logontt4.jpg";
import leapstack1 from "../../assets/logontt5.jpg";
import pacific1 from "../../assets/logontt6.jpg";
import papaya1 from "../../assets/logontt7.jpg";

export default function CustomerSection() {
  const swiperRef = useRef(null);

  const logos = [
    { id: 1, image: fullerton },
    { id: 2, image: leapstack },
    { id: 3, image: pacific },
    { id: 4, image: pacific1 },
    { id: 5, image: papaya1 },
    { id: 6, image: leapstack1 },
        { id: 7, image: papaya }
  ];

  /** ===== AUTO STOP WHEN OUT OF SCREEN ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const swiper = swiperRef.current?.swiper;
        if (!swiper) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) swiper.autoplay.start();
          else swiper.autoplay.stop();
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
    <div className="cus-wrapper">
      <h2 className="cus-title">KHÁCH HÀNG CỦA CHÚNG TÔI</h2>

      <Swiper
        ref={swiperRef}
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={5}
        loop={true}
        speed={650}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="cus-swiper"
        breakpoints={{
          0: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1100: { slidesPerView: 5 },
        }}
      >
        {logos.map((i) => (
          <SwiperSlide key={i.id}>
            <div className="cus-card">
              <LazyImage 
                src={i.image}
                alt="Customer Logo"
                className="cus-img"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
