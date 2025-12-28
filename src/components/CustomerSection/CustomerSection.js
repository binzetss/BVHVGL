import React, { useRef, useEffect, useState } from "react";
import "./CustomerSection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { LazyImage } from "../LazyImage/LazyImage";
import { API_BASE } from "../../config";

export default function CustomerSection() {
  const swiperRef = useRef(null);
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/sponsors`)
      .then((res) => res.json())
      .then((data) => setLogos(data || []))
      .catch(() => setLogos([]));
  }, []);

  return (
    <div className="cus-wrapper">
      <h2 className="cus-title">Khách Hàng Của Chúng Tôi</h2>

      <Swiper
        ref={swiperRef}
        modules={[Pagination, Autoplay]}
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="cus-swiper"
        breakpoints={{
          0: { slidesPerView: 3, spaceBetween: 12 },
          768: { slidesPerView: 4, spaceBetween: 24 },
          1100: { slidesPerView: 5, spaceBetween: 30 },
        }}
      >
        {logos.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="cus-card">
              <LazyImage
                src={item.imageUrl}
                alt={item.name}
                className="cus-img"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
