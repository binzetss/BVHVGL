import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "./HopTacSection.css";
import { API_BASE } from "../../../config";

export default function HopTacSection() {
  const [active, setActive] = useState(0);
  const [items, setItems] = useState([]);
  const swiperRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  /* ===== DETECT MOBILE ===== */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ===== LOAD API ===== */
  useEffect(() => {
    fetch(`${API_BASE}/api/cooperation-items`)
      .then((res) => res.json())
      .then(setItems);
  }, []);

  /* ===== PAUSE / RESUME AUTOPLAY (MOBILE ONLY) ===== */
  const pauseAutoplay = () => {
    if (!isMobile || !swiperRef.current) return;

    swiperRef.current.autoplay.stop();

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
  };

  const resumeAutoplay = () => {
    if (!isMobile || !swiperRef.current) return;

    resumeTimerRef.current = setTimeout(() => {
      swiperRef.current?.autoplay.start();
    }, 4000);
  };

  /* ===== CLEANUP ===== */
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const handleChange = (index) => {
    setActive(index);
    swiperRef.current?.slideTo(index);
  };

  if (!items.length) return null;

  return (
    <div className="ht-wrapper">
      <div className="ht-container">
        <h2 className="ht-title">HỢP TÁC VÀ ĐÀO TẠO CHUYÊN SÂU</h2>

        <div className="ht-content">
          {/* LEFT (DESKTOP ONLY) */}
          <div className="ht-left">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`ht-item ${active === index ? "active" : ""}`}
                onMouseEnter={() => handleChange(index)}
                onClick={() => handleChange(index)}
              >
                <div className="ht-item-title">{item.title}</div>
                <div className="ht-item-desc">{item.description}</div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="ht-right">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActive(swiper.activeIndex)}
            >
              {items.map((item) => (
                <SwiperSlide key={item.id}>
                  <img
                    src={
                      item.imageUrl?.startsWith("http")
                        ? item.imageUrl
                        : `${API_BASE}${item.imageUrl}`
                    }
                    className="ht-img"
                    alt={item.title}
                  />

                  {/* MOBILE CAPTION – MOBILE ONLY */}
                  {isMobile && (
                    <div
                      className="ht-mobile-caption"
                      onTouchStart={pauseAutoplay}
                      onTouchEnd={resumeAutoplay}
                    >
                      <div className="ht-mobile-title">{item.title}</div>

                      <div className="ht-mobile-desc" onScroll={pauseAutoplay}>
                        {item.description}
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
