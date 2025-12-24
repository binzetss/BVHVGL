import React from "react";
import "./GioiThieuSection.css";
import { LazyImage } from "../../../components/LazyImage/LazyImage";
import { FaUserMd, FaHospitalUser, FaAward } from "react-icons/fa";
import anhGT from "../../../assets/vechungtoi/lichsuhinhthanh/ls-2022.jpg";
import iconbacsi from "../../../assets/vechungtoi/iconbacsi.png";
import iconchuyenkhoa from "../../../assets/vechungtoi/iconchuyenkhoa.png";
import iconkinhnghiem from "../../../assets/vechungtoi/iconkinhnghiem.png";

export default function GioiThieuSection() {
  return (
    <div className="gt-section-wrapper">
      {/* ====== CONTENT 2 CỘT ====== */}
      <div className="gt-section">
        {/* LEFT */}
        <div className="gt-left">
          <div className="why-sub-title">VỀ BỆNH VIỆN</div>

          <h2 className="why-title">HÙNG VƯƠNG GIA LAI</h2>

          <p className="gt-desc">
            Bệnh viện Hùng Vương Gia Lai chính thức được cấp phép xây dựng vào
            ngày 01/9/2021 do Công ty Cổ phần Xây dựng Trung Nguyên làm nhà thầu
            thi công chính. Là Bệnh viện đa khoa tư nhân tọa lạc tại 236A Lê
            Duẩn, P.Trà Bá, TP.Pleiku, Tỉnh Gia Lai với quy mô hoạt động 300
            giường bệnh, được trang bị hệ thống cơ sở vật chất, trang thiết bị y
            tế hiện đại.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="gt-right">
          <LazyImage src={anhGT} alt="Giới thiệu" className="gt-img" />
        </div>
      </div>

      {/* ====== STATISTIC BOX ====== */}
      <div className="gt-stats-box">
        <div className="gt-stat-item">
          <img
            src={iconchuyenkhoa}
            alt="gt"
            className="gt-icon"
          />
          <div className="gt-stat-number">19+</div>
          <div className="gt-stat-label">CHUYÊN KHOA</div>
        </div>

        <div className="gt-stat-item">
          <img
            src={iconbacsi}
            alt="gt"
            className="gt-icon"
          />
          <div className="gt-stat-number">666+</div>
          <div className="gt-stat-label">BÁC SĨ Y TÁ</div>
        </div>

        <div className="gt-stat-item">
          <img
            src={iconkinhnghiem}
            alt="gt"
            className="gt-icon"
          />
          <div className="gt-stat-number">14+</div>
          <div className="gt-stat-label">NĂM KINH NGHIỆM</div>
        </div>
      </div>
    </div>
  );
}
