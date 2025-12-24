import React from "react";
import "./Footer.css";
import logo from "../../assets/logoHV.png";

import iconFB from "../../assets/icon-fb.png";
import iconYT from "../../assets/icon-yt.png";
import iconTT from "../../assets/icon-tt.png";
import iconZalo from "../../assets/icon-zalo.png";
import iconMap from "../../assets/icon-map.png";
import iconSend from "../../assets/icon-send.png";
import iconHotline from "../../assets/icon-phone.png";
import iconBooking from "../../assets/edit.png";

export default function Footer() {
  return (
    <footer className="hv-footer">

      <div className="footer-container">

        {/* ===== CỘT 1 ===== */}
        <div className="col col-1">
          <div className="footer-brand-new">
  <img src={logo} className="footer-logo-new" alt="logo" />
</div>

          <div className="footer-info">
            <div className="info">
              BỆNH VIỆN HÙNG VƯƠNG GIA LAI
            </div>

            <p>
              Địa chỉ: <b>236A Lê Duẩn, Phường Trà Bá, Thành phố Pleiku, Tỉnh Gia Lai.</b>
            </p>

            <p>Email: info@bvhvgl.com</p>

            <p>
              Số giấy phép: <b>09/GP-TTĐT</b> do Sở Thông tin và Truyền Thông Tỉnh Gia Lai cấp ngày 29/11/2023.
            </p>

            <p>Chịu trách nhiệm quản lý nội dung: Trần Gia Phú.</p>

            <p>Hotline: <b>1800 8015</b></p>
          </div>

         
        </div>

        {/* ===== CỘT 2 ===== */}
        <div className="col col-2">
          <h3>GIỜ LÀM VIỆC</h3>

          <p><b>Thứ 2 - Chủ nhật</b></p>
          <p>Sáng: <b>7h00 - 11h30</b></p>
          <p>Chiều: <b>13h00 - 16h30</b></p>
          <p>Khám bệnh tất cả các ngày trong tuần (Cả ngày nghỉ và Lễ, Tết)</p>

          <p style={{ marginTop: "14px" }}>Cấp cứu 24/24: <div className="hotline"><a>0914.555.115</a></div></p>
          
          <h3 className="mt20">LIÊN HỆ</h3>
          <p>Tổng đài CSKH: <div className="hotline"><a>1800.8015</a></div></p>
        </div>

        {/* ===== CỘT 3 ===== */}
        <div className="col col-3">
          <h3>LIÊN KẾT MẠNG XÃ HỘI</h3>

          <div className="social-icons">
            <img src={iconFB} alt="fb" />
            <img src={iconYT} alt="yt" />
            <img src={iconTT} alt="tiktok" />
            <img src={iconZalo} alt="zalo" />
            <img src={iconMap} alt="maps" />
          </div>

          <ul className="footer-links">
            <li>Tra cứu kết quả</li>
            <li>Khách hàng cần biết</li>
            <li>Dịch vụ</li>
            <li className="lienhe">Liên hệ</li>
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
    © {new Date().getFullYear()} Hệ thống Y tế Hùng Vương Gia Lai
  </span>  <span className="footer-brand">
     Phòng Công Nghệ Thông Tin - leanhquan™
  </span>
</div>

    </footer>
  );
}
