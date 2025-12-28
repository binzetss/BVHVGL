import React from "react";
import "./GioiThieuSection.css";
import { LazyImage } from "../../../components/LazyImage/LazyImage";
import { FaUserMd, FaHospitalUser, FaAward } from "react-icons/fa";
import anhGT from "../../../assets/vechungtoi/lichsuhinhthanh/ls-2022.jpg";
import iconbacsi from "../../../assets/vechungtoi/iconbacsi.png";
import iconchuyenkhoa from "../../../assets/vechungtoi/iconchuyenkhoa.png";
import iconkinhnghiem from "../../../assets/vechungtoi/iconkinhnghiem.png";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
export default function GioiThieuSection() {
  return (
    <div className="gt-section-wrapper">
          {/* ===== BREADCRUMB ===== */}
      <div className="gt-breadcrumb">
        <Link to="/" className="gt-breadcrumb-link">
          <FaHome className="gt-breadcrumb-icon" /> TRANG CHỦ
        </Link>
        <span className="gt-breadcrumb-sep">/</span>
        <span className="gt-breadcrumb-current">Về chúng tôi</span>
      </div>
      {/* ====== CONTENT 2 CỘT ====== */}
      <div className="gt-section">
        {/* LEFT */}
        <div className="gt-left">
          <div className="why-sub-title">VỀ BỆNH VIỆN</div>

          <h2 className="why-title">HÙNG VƯƠNG GIA LAI</h2>

          <div className="gt-desc">
            <p>
              <strong>
                Bệnh viện Hùng Vương Gia Lai chính thức động thổ khởi công vào
                ngày 26/9/2021, đánh dấu sự khởi đầu của một hành trình đầy ý
                nghĩa.
              </strong>
            </p>

            <p>
              <strong>Bệnh viện Hùng Vương Gia Lai</strong> tọa lạc tại 236A Lê
              Duẩn, P. Hội Phú, tỉnh Gia Lai với quy mô hoạt động 300 giường
              bệnh, được trang bị hệ thống cơ sở vật chất, trang thiết bị y tế
              hiện đại. Với đội ngũ nòng cốt là các bác sĩ, điều dưỡng được đào
              tạo bài bản tại Đại học Y Dược TP.HCM, Đại học Y Hà Nội, Đại học Y
              Dược Huế,… Bên cạnh đó, Bệnh viện luôn chú trọng hợp tác chuyên
              môn, chuyển giao kỹ thuật và kỹ thuật cao với đội ngũ chuyên gia
              đến từ các bệnh viện tuyến trên.
            </p>

            <p>
              <strong>Bệnh viện Hùng Vương Gia Lai</strong> là thành viên của Hệ
              thống Y tế Hùng Vương, có nền tảng vững chắc với chặng đường hơn
              15 năm hình thành và phát triển (28/09/2010 đến nay). Bệnh viện đã
              chính thức đi vào hoạt động từ ngày 13/02/2024 với đầy đủ các
              chuyên khoa, đặc biệt là Đơn vị cấp cứu 115 với dịch vụ cấp cứu
              tại nhà và tại hiện trường.
            </p>

            <p>
            
                Với phương châm <strong>“Thân thiện - Chuyên nghiệp - Chu đáo” </strong>,
              {" "}
              chúng tôi sẽ phấn đấu trở thành địa chỉ khám, chữa bệnh và chăm
              sóc sức khỏe uy tín, tin cậy chất lượng cao cho người dân trên địa
              bàn tỉnh Gia Lai nói riêng, khu vực miền Trung - Tây Nguyên nói
              chung và hai nước bạn Lào &amp; Campuchia trong thời gian tới.
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="gt-right">
          <LazyImage src={anhGT} alt="Giới thiệu" className="gt-img" />
        </div>
      </div>

      {/* ====== STATISTIC BOX ====== */}
      <div className="gt-stats-box">
        <div className="gt-stat-item">
          <img src={iconchuyenkhoa} alt="gt" className="gt-icon" />
          <div className="gt-stat-number">15+</div>
          <div className="gt-stat-label">CHUYÊN KHOA</div>
        </div>

        <div className="gt-stat-item">
          <img src={iconbacsi} alt="gt" className="gt-icon" />
          <div className="gt-stat-number">338+</div>
          <div className="gt-stat-label">BÁC SĨ, ĐIỀU DƯỠNG</div>
        </div>

        <div className="gt-stat-item">
          <img src={iconkinhnghiem} alt="gt" className="gt-icon" />
          <div className="gt-stat-number">15+</div>
          <div className="gt-stat-label">NĂM KINH NGHIỆM</div>
        </div>
      </div>
    </div>
  );
}
