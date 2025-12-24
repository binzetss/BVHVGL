import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "./SpecialtySection.css";
import { LazyImage } from "../LazyImage/LazyImage";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";
import { getDeptIcon } from "../../utils/getDeptIcon";

export default function SpecialtySection() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  /* ================= FETCH API ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/departments`)
      .then((res) => res.json())
      .then(setDepartments)
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  /* ================= AUTOPLAY CONTROL ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const swiper = swiperRef.current?.swiper;
          if (!swiper) return;

          entry.isIntersecting
            ? swiper.autoplay.start()
            : swiper.autoplay.stop();
        });
      },
      { threshold: 0.3 }
    );

    if (swiperRef.current) observer.observe(swiperRef.current);
    return () => observer.disconnect();
  }, []);

  if (!departments.length) return null;

  return (
    <div className="sp-wrapper">
      <div className="sp-container">
        <h2 className="sp-title">CHUYÊN KHOA</h2>

        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={4}
          loop
          speed={550}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            el: ".sp-pagination",
          }}
          breakpoints={{
          0: { slidesPerView: 3, spaceBetween: 12 },
            480: { slidesPerView: 2, spaceBetween: 25 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1100: { slidesPerView: 4, spaceBetween: 35 },
            1400: { slidesPerView: 5, spaceBetween: 40 },
          }}
          className="specialty-swiper"
        >
          {departments.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="sp-card"
                onClick={() => navigate(`/chuyen-khoa/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <LazyImage
                  src={getDeptIcon(item.name)}
                  alt={item.name}
                  className="sp-icon"
                />
                <p className="sp-name">{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="sp-pagination" />

        <button className="sp-btn" onClick={() => navigate("/chuyen-khoa")}>
          XEM THÊM
        </button>
      </div>
    </div>
  );
}
