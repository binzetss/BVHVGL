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
            <div className="nstb-box-header">144 Bác sĩ</div>
            <p>
              Bệnh viện Hùng Vương Gia Lai sẵn sàng tiếp nhận, đào tạo đội ngũ
              bác sĩ với mong muốn nâng cao trình độ chuyên môn, đáp ứng nhu cầu
              sử dụng dịch vụ y tế chất lượng cao của người dân trong việc tư
              vấn chuyên môn, thăm khám trực tiếp và điều trị nội trú.
            </p>
          </div>

          <div className="nstb-box bg2">
            <div className="nstb-box-header">259 Điều dưỡng, Hộ sinh, KTV</div>
            <p>
              Điều dưỡng, hộ sinh, kỹ thuật viên tại bệnh viện đều là những
              gương mặt trẻ, nhiệt huyết, giàu kinh nghiệm, được đào tạo bài
              bản, luôn đề cao tinh thần trách nhiệm, thân thiện với người bệnh,
              giúp người bệnh an tâm, thoải mái trong suốt quá trình thăm khám
              và điều trị.
            </p>
          </div>

          <div className="nstb-box bg3">
            <div className="nstb-box-header"> 21 Dược sĩ</div>
            <p>
              Dược sĩ có nhiệm vụ bảo quản, lưu trữ, quản lý và cung cấp thuốc
              cho người bệnh. Tham gia tư vấn cho bệnh nhân cũng như tất cả mọi
              người về thuốc, cách thức sử dụng thuốc hiệu quả và nâng cao hiểu
              biết về chăm sóc sức khỏe
            </p>
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
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {equipments.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="nstb-slide-card">
                    <img
                      src={item.imageUrl}
                      className="nstb-slide-img"
                      alt=""
                    />
                    <div className="nstb-slide-title">{item.title}</div>
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
