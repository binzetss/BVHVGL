import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./ServiceSection.css";
import { LazyImage, LazyBackground } from "../LazyImage/LazyImage";
import { API_BASE } from "../../config";

import bgImage from "../../assets/dichvubg.jpg";

export default function ServiceSection() {
  const swiperRef = useRef(null);
  const [services, setServices] = useState([]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/dichvu`)
      .then((res) => res.json())
      .then((data) => setServices(data || []))
      .catch(() => setServices([]));
  }, []);

  /* ================= AUTO PLAY WHEN IN VIEW ================= */
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

  if (!services.length) return null;

  return (
    <div className="service-wrapper">
      <div className="service-container">
        {/* ===== BACKGROUND ===== */}
        <LazyBackground imageUrl={bgImage} className="service-bg" />

        {/* ===== CONTENT ===== */}
        <div className="service-inner">
          <div className="service-title-wrap">
            <h2 className="service-title">DỊCH VỤ CỦA CHÚNG TÔI</h2>
            <Link to="/dich-vu" className="service-seeall">
              ＋ XEM TẤT CẢ
            </Link>
          </div>

          {/* ===== SLIDER ===== */}
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
              1200: { slidesPerView: 3 },
            }}
            className="service-swiper"
          >
            {services.map((item) => (
              <SwiperSlide key={item.id}>
                <Link
                  to={`/dich-vu/${item.id}`}
                  className="service-card-link"
                >
                  <div className="service-card">
                    <LazyImage
                      src={item.heroImageUrl || item.imageUrl}
                      alt={item.name}
                      className="service-img"
                    />

                    <div className="service-box">
                      <h3>{item.name}</h3>
                      <p>{item.mainTitle}</p>
                      <div className="plus-icon">＋</div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ===== NAV BUTTON ===== */}
          <div className="btn-prev nav-btn">❮</div>
          <div className="btn-next nav-btn">❯</div>
        </div>
      </div>
    </div>
  );
}
