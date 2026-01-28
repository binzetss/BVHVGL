import React, { useEffect, useState } from "react";
import "./WhyChoose.css";
import { LazyImage } from "../LazyImage/LazyImage";
import { Link } from "react-router-dom";
import { API_BASE } from "../../config"; 
import imgHospital from "../../assets/hospital-building.jpg";
import logoNhiDong from "../../assets/logo-nhidong.png";
import logoChoRay from "../../assets/logo-choray.png";
import logoHungVuong from "../../assets/logo-hv.png";
import logoBachMai from "../../assets/BACHMAI.png";

const partnerLogos = [
  { id: 1, src: logoNhiDong, name: "BỆNH VIỆN NHI ĐỒNG I" },
  { id: 2, src: logoChoRay, name: "BỆNH VIỆN CHỢ RẪY" },
  { id: 3, src: logoHungVuong, name: "BỆNH VIỆN HÙNG VƯƠNG" },
  { id: 4, src: logoBachMai, name: "BỆNH VIỆN BẠCH MAI" },
];

export default function WhyChoose() {
  const [about, setAbout] = useState(null);

useEffect(() => {
  fetch(`${API_BASE}/api/about-hospital`)
    .then((res) => res.json())
    .then((data) => setAbout(data))
    .catch(console.error);
}, []);

  return (
    <div className="why-wrapper">
      <h2 className="why-title">
        TẠI SAO NÊN CHỌN <br />
        BỆNH VIỆN HÙNG VƯƠNG GIA LAI?
      </h2>

      <div className="why-content">
        <div className="why-image">
          <LazyImage src={imgHospital} alt="Bệnh viện Hùng Vương" />
        </div>

        <div className="why-text">
          {/* ===== NỘI DUNG THẬT TỪ DB ===== */}
          {about?.content && (
            <div
              className="why-html"
              dangerouslySetInnerHTML={{ __html: about.content }}
            />
          )}

          <div className="why-more-wrap">
            <Link to="/gioi-thieu" className="why-more">
              ≪ XEM TẤT CẢ
            </Link>
          </div>

          <div className="why-features">
            <div className="feat-box">
              15 NĂM <br /> KINH NGHIỆM
            </div>
            <div className="feat-box">
              THIẾT BỊ <br /> ĐỒNG BỘ
            </div>
            <div className="feat-box">
              CHI PHÍ <br /> HỢP LÝ
            </div>
          </div>
        </div>
      </div>

      <h3 className="why-sub-title">
        HỢP TÁC CHUYÊN MÔN VỚI CÁC BỆNH VIỆN TUYẾN TRÊN
      </h3>

      <div className="why-partners">
        {partnerLogos.map((partner) => (
          <div key={partner.id} className="partner-item">
            <LazyImage src={partner.src} alt={partner.name} />
            <p>{partner.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
