import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./EquipmentSection.css";
import { LazyImage, LazyBackground } from "../LazyImage/LazyImage";

import bg from "../../assets/bgtrangthietbihiendai.png";
import { API_BASE } from "../../config";

export default function EquipmentSection() {
  const [equipments, setEquipments] = useState([]);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    fetch(`${API_BASE}/api/facility-pages/1`)
      .then((res) => res.json())
      .then((data) => {
        setEquipments(data?.subSectionsWithoutCaption || []);
      })
      .catch(() => setEquipments([]));
  }, []);

  if (!equipments.length) return null;

  return (
    <div className="eq-wrapper">
      <div className="eq-container">
        <LazyBackground imageUrl={bg} className="eq-bg" />

        <div className="eq-inner">
          <h2 className="eq-title">TRANG THIẾT BỊ HIỆN ĐẠI</h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: false, // 🔥 rất quan trọng
            }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".eq-next",
              prevEl: ".eq-prev",
            }}
            noSwiping
            noSwipingClass="no-swiping"
            className="eq-swiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {equipments.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="eq-slide">
                  {/* ===== TEXT (READ ZONE) ===== */}
                  <div
                    className="eq-box no-swiping"
                    onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                    onMouseLeave={() => swiperRef.current?.autoplay.start()}
                    onMouseDown={() => swiperRef.current?.autoplay.stop()}
                    onMouseUp={() => swiperRef.current?.autoplay.start()}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    <button
                      className="eq-btn"
                      onClick={() => navigate("/co-so-vat-chat")}
                    >
                      ＋ XEM THÊM
                    </button>
                  </div>

                  {/* ===== IMAGE (SWIPE ZONE) ===== */}
                  <div className="eq-img-box">
                    <LazyImage
                      src={item.imageUrl}
                      alt={item.title}
                      className="eq-img"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="eq-prev">❮</div>
          <div className="eq-next">❯</div>
        </div>
      </div>
    </div>
  );
}
