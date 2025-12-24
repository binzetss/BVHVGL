import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./SpecialtySection.css";
import { LazyImage } from "../LazyImage/LazyImage";

import capcuu from "../../assets/ICONCHUYENKHOA/115.png";
import CDHA from "../../assets/ICONCHUYENKHOA/CDHA.png";
import CTCH from "../../assets/ICONCHUYENKHOA/CTCH.png";
import Dalieu from "../../assets/ICONCHUYENKHOA/Dalieu.png";
import DinhDuong from "../../assets/ICONCHUYENKHOA/DinhDuong.png";
import Duoc from "../../assets/ICONCHUYENKHOA/Duoc.png";
import HSCC from "../../assets/ICONCHUYENKHOA/hscc.png";
import Khambenh from "../../assets/ICONCHUYENKHOA/Khambenh.png";
import KSNK from "../../assets/ICONCHUYENKHOA/KSNK.png";
import LCK from "../../assets/ICONCHUYENKHOA/LCK.png";
import Ngoai from "../../assets/ICONCHUYENKHOA/ngoai.png";
import nhi from "../../assets/ICONCHUYENKHOA/nhi.png";
import noi from "../../assets/ICONCHUYENKHOA/noi.png";
import san from "../../assets/ICONCHUYENKHOA/san.png";
import tim from "../../assets/ICONCHUYENKHOA/tim.png";
import TMH from "../../assets/ICONCHUYENKHOA/TMH.png";
import UB from "../../assets/ICONCHUYENKHOA/UB.png";
import XN from "../../assets/ICONCHUYENKHOA/XN.png";
import YHCT from "../../assets/ICONCHUYENKHOA/YHCT.png";

const specialtyData = [
  { id: 1, name: "Cấp Cứu 115", image: capcuu },
  { id: 2, name: "Chẩn Đoán Hình Ảnh", image: CDHA },
  { id: 3, name: "Chấn Thương Chỉnh Hình", image: CTCH },
  { id: 4, name: "Da Liễu", image: Dalieu },
  { id: 5, name: "Dinh Dưỡng", image: DinhDuong },
  { id: 6, name: "Dược", image: Duoc },
  { id: 7, name: "Hồi Sức Cấp Cứu", image: HSCC },
  { id: 8, name: "Khám Bệnh", image: Khambenh },
  { id: 9, name: "Kiểm Soát Nhiễm Khuẩn", image: KSNK },
  { id: 10, name: "Liên Chuyên Khoa", image: LCK },
  { id: 11, name: "Khoa Ngoại", image: Ngoai },
  { id: 12, name: "Khoa Nhi", image: nhi },
  { id: 13, name: "Khoa Nội", image: noi },
  { id: 14, name: "Khoa Sản", image: san },
  { id: 15, name: "Tim Mạch", image: tim },
  { id: 16, name: "Tai - Mũi - Họng", image: TMH },
  { id: 17, name: "Khoa Ung Bướu", image: UB },
  { id: 18, name: "Xét Nghiệm", image: XN },
  { id: 19, name: "Y Học Cổ Truyền", image: YHCT },
];

export default function SpecialtySection() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (swiperRef.current?.swiper) {
            if (entry.isIntersecting) {
              swiperRef.current.swiper.autoplay.start();
            } else {
              swiperRef.current.swiper.autoplay.stop();
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (swiperRef.current) {
      observer.observe(swiperRef.current);
    }

    return () => {
      if (swiperRef.current) {
        observer.unobserve(swiperRef.current);
      }
    };
  }, []);

  return (
    <div className="sp-wrapper">
      <div className="sp-container">
        <h2 className="sp-title">CHUYÊN KHOA</h2>

        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={4}
          centeredSlides={false}
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
          }}
          breakpoints={{
            0: { slidesPerView: 1.5, spaceBetween: 20 },
            480: { slidesPerView: 2, spaceBetween: 25 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1100: { slidesPerView: 4, spaceBetween: 35 },
            1400: { slidesPerView: 5, spaceBetween: 40 },
          }}
          className="specialty-swiper"
        >
          {specialtyData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="sp-card">
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  className="sp-icon"
                />
                <p className="sp-name">{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="sp-btn">XEM THÊM</button>
      </div>
    </div>
  );
}
