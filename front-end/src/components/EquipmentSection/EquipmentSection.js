import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./EquipmentSection.css";
import { LazyImage, LazyBackground } from "../LazyImage/LazyImage";

import bg from "../../assets/bgtrangthietbihiendai.png";
import mri1 from "../../assets/mri.jpg";
import ct1 from "../../assets/service2.jpg";

const equipmentData = [
  {
    id: 1,
    title: "Máy chụp cộng hưởng từ (MRI)",
    desc: "Hệ thống máy MRI 1.5 Tesla – chẩn đoán chính xác, nhanh chóng.",
    image: mri1,
  },
  {
    id: 2,
    title: "Máy chụp CT Scanner đa dãy",
    desc: "Chụp CT dựng hình 3D – hỗ trợ chẩn đoán chính xác.",
    image: ct1,
  }
];

export default function EquipmentSection() {
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
            navigation={{
              nextEl: ".eq-next",
              prevEl: ".eq-prev",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            className="eq-swiper"
          >
            {equipmentData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="eq-slide">

                  {/* BOX TRÁI ĐÈ LÊN ẢNH */}
                  <div className="eq-box">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <button className="eq-btn">＋ XEM THÊM</button>
                  </div>

                  {/* ẢNH PHẢI */}
                  <div className="eq-img-box">
                    <LazyImage src={item.image} className="eq-img" />
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
