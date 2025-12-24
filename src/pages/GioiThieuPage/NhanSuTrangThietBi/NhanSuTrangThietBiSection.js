import React, { useEffect, useState } from "react";
import "./NhanSuTrangThietBiSection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { API_BASE } from "../../../config";

export default function NhanSuTrangThietBiSection() {
  const [equipments, setEquipments] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ===== LOAD API ===== */
  useEffect(() => {
    fetch(`${API_BASE}/api/facility-pages/1`)
      .then((res) => res.json())
      .then((data) => {
        setEquipments(data?.subSectionsWithoutCaption || []);
      })
      .catch(() => setEquipments([]));
  }, []);

  const activeEquip = equipments[activeIndex];

  return (
    <div className="nstb-wrapper">

      {/* ==================== */}
      {/* 1) ĐỘI NGŨ NHÂN SỰ  */}
      {/* ==================== */}
      <div className="nstb-container">
        <h2 className="gt-title">ĐỘI NGŨ NHÂN SỰ NĂNG ĐỘNG, NHIỆT HUYẾT</h2>

        <div className="nstb-row">
          <div className="nstb-box bg1">
            <div className="nstb-box-header">01 Bác sĩ</div>
            <p>Cùng với g với việc chú trọng đào tạo chuyên môn, Bệnh viện luôn quan tâm..nh viện luôn quan tâm...</p>
          </div>

          <div className="nstb-box bg2">
            <div className="nstb-box-header">02 Điều dưỡng</div>
                     <p>Cùng với g với việc chú trọng đào tạo chuyên môn, Bệnh viện luôn quan tâm..nh viện luôn quan tâm...</p>
          </div>

          <div className="nstb-box bg3">
            <div className="nstb-box-header">03 Đào tạo nhân sự</div>
            <p>Cùng với g với việc chú trọng đào tạo chuyên môn, Bệnh viện luôn quan tâm..nh viện luôn quan tâm...</p>
          </div>
        </div>
      </div>

      {/* =================================== */}
      {/* 2) TRANG THIẾT BỊ HIỆN ĐẠI */}
      {/* =================================== */}
      <div className="nstb-container">
        <div className="nstb-equip-row">

          {/* ===== LEFT TEXT – SYNC SLIDE ===== */}
          <div className="nstb-equip-left">
            <h2 className="gt-title">TRANG THIẾT BỊ HIỆN ĐẠI</h2>

            {activeEquip && (
              <>
                <p>{activeEquip.description}</p>
              </>
            )}
          </div>

          {/* ===== RIGHT SLIDER ===== */}
          <div className="nstb-equip-right">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000 }}
              loop={true}
              slidesPerView={1}
              pagination={false}
              onSlideChange={(swiper) =>
                setActiveIndex(swiper.realIndex)
              }
            >
              {equipments.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="nstb-slide-card">
                    <img
                      src={item.imageUrl}
                      className="nstb-slide-img"
                      alt=""
                    />
                    <div className="nstb-slide-title">
                      {item.title}
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>

    </div>
  );
}
