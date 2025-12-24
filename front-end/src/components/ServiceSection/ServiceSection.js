import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ServiceSection.css";
import { LazyImage, LazyBackground } from "../LazyImage/LazyImage";

import { serviceData } from "./serviceData";
import bgImage from "../../assets/dichvubg.jpg";

export default function ServiceSection() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!swiperRef.current?.swiper) return;
          entry.isIntersecting
            ? swiperRef.current.swiper.autoplay.start()
            : swiperRef.current.swiper.autoplay.stop();
        });
      },
      { threshold: 0.25 }
    );

    if (swiperRef.current) observer.observe(swiperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="service-wrapper">
      <div className="service-container">

        {/* ẢNH BACKGROUND — NẰM SAU */}
        <LazyBackground imageUrl={bgImage} className="service-bg" />

        {/* NỘI DUNG — ĐÈ LÊN */}
        <div className="service-inner">

          <div className="service-title-wrap">
            <h2 className="service-title">DỊCH VỤ CỦA CHÚNG TÔI</h2>
            <a className="service-seeall">＋ XEM TẤT CẢ</a>
          </div>

          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={25}
            loop
            centeredSlides
            navigation={{
              nextEl: ".btn-next",
              prevEl: ".btn-prev",
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 }
            }}
            className="service-swiper"
          >
            {serviceData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="service-card">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    className="service-img"
                  />
                  <div className="service-box">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <div className="plus-icon">＋</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="btn-prev nav-btn">❮</div>
          <div className="btn-next nav-btn">❯</div>

        </div>
      </div>
    </div>
  );
}
