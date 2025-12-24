import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logoHV.png";

import iconFB from "../../assets/icon-fb.png";
import iconYT from "../../assets/icon-yt.png";
import iconTT from "../../assets/icon-tt.png";
import iconZalo from "../../assets/icon-zalo.png";
import iconMap from "../../assets/icon-map.png";
import iconSend from "../../assets/icon-send.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="hv-footer">
      <div className="footer-container">
        <div className="col col-1">
          <div className="footer-brand-new">
            <img src={logo} className="footer-logo-new" alt="logo" />
          </div>

          <div className="footer-info">
            <div className="info">BỆNH VIỆN HÙNG VƯƠNG GIA LAI</div>

            <p>
              Địa chỉ: <b>236A Lê Duẩn, Phường Hội Phú, Tỉnh Gia Lai.</b>
            </p>

            <p>Email: info@bvhvgl.com</p>

            <p>
              Số giấy phép: <b>09/GP-TTĐT</b> do Sở Thông tin và Truyền Thông
              Tỉnh Gia Lai cấp ngày 29/11/2023.
            </p>

            <p>Chịu trách nhiệm quản lý nội dung: Trần Gia Phú </p>

            <p>
              Hotline: <b>1800 8015</b>
            </p>
          </div>
        </div>

        <div className="col col-2">
          <h3>GIỜ LÀM VIỆC</h3>

          <p>
            <b>Thứ 2 - Chủ nhật</b>
          </p>
          <p>
            Sáng: <b>7h00 - 11h30</b>
          </p>
          <p>
            Chiều: <b>13h00 - 16h30</b>
          </p>
          <p>Khám bệnh tất cả các ngày trong tuần (Cả ngày nghỉ và Lễ, Tết)</p>

          <div style={{ marginTop: "14px" }}>
            Cấp cứu 24/24:
            <span className="hotline">
              <a href="tel:0914555115">0914.555.115</a>
            </span>
          </div>

          <h3 className="mt20">LIÊN HỆ</h3>

          <div>
            Tổng đài CSKH:
            <span className="hotline">
              <a href="tel:18008015" >1800.8015</a>
            </span>
          </div>
        </div>

        <div className="col col-3">
          <h3>LIÊN KẾT MẠNG XÃ HỘI</h3>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/bvhvgl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={iconFB} alt="Facebook" />
            </a>

            <a
              href="https://www.youtube.com/@bvhvgl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={iconYT} alt="YouTube" />
            </a>

            <a
              href="https://www.tiktok.com/@bvhvgl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={iconTT} alt="TikTok" />
            </a>

            <a
              href="https://zalo.me/bvhvgl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={iconZalo} alt="Zalo" />
            </a>

            <a
              href="https://www.google.com/maps/place/B%E1%BB%87nh+vi%E1%BB%87n+H%C3%B9ng+V%C6%B0%C6%A1ng+Gia+Lai/@13.970758,108.027689,4376m/data=!3m1!1e3!4m6!3m5!1s0x316c1f739262feb5:0x3eb3e5c4c881d10f!8m2!3d13.9707583!4d108.0276891!16s%2Fg%2F11rgc7jq57"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={iconMap} alt="Google Maps" />
            </a>
          </div>

          <ul className="footer-links">
            <li>Tra cứu kết quả</li>
            <li onClick={() => navigate("/quy-trinh-kham-benh")}>Khách hàng cần biết</li>
            <li onClick={() => navigate("/dich-vu")}>Dịch vụ</li>
            <li className="lienhe" onClick={() => navigate("/lien-he")}>Liên hệ</li>
          </ul>

          <h3 className="mt20">ĐĂNG KÝ ĐỂ NHẬN ƯU ĐÃI</h3>

          <div className="email-box">
            <input type="text" placeholder="Nhập địa chỉ email" />
            <button className="email-send">
              <img src={iconSend} alt="send" />
            </button>
          </div>
        </div>
      </div>

      <div className="footer-info fancy-footer">
        <span className="footer-brand">
          Copyright {new Date().getFullYear()} Hùng Vương Gia Lai
        </span>
        <span className="footer-brand">
          Powered by Phòng Công Nghệ Thông Tin - leanhquan™
        </span>
      </div>
    </footer>
  );
}
