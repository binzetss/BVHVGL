import React, { useState } from "react";
import "./Header.css";

import logo from "../../assets/logo.png";
import calendarIcon from "../../assets/calendar.png";
import phoneIcon from "../../assets/telephone.png";
import loginIcon from "../../assets/icon-user.png";

import flagVN from "../../assets/vietnam.png";
import flagEN from "../../assets/united-kingdom.png";
import flagKH from "../../assets/flag.png";

import searchIcon from "../../assets/seach.png";

export default function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState({
    code: "vi",
    text: "Tiếng Việt",
    img: flagVN,
  });

  const selectLanguage = (code, text, img) => {
    setLanguage({ code, text, img });
    setLangOpen(false);
  };

  return (
    <header className="hv-header">
      {/* ================== TOP BAR ================== */}
      <div className="hv-top">

        {/* LEFT LOGO */}
        <div className="hv-left">
          <img src={logo} className="hv-logo" alt="logo" />
        </div>

        {/* SEARCH BOX */}
        <div className="hv-search-center">
          <input placeholder="Tìm kiếm..." />
          <img src={searchIcon} alt="search" className="hv-search-icon" />
        </div>

        {/* RIGHT ICONS */}
        <div className="hv-right">

          {/* ĐẶT LỊCH */}
          <div className="hv-icon">
            <img src={calendarIcon} className="hv-icon-img2" alt="" />
            <span>Đặt lịch khám</span>
          </div>

          {/* HOTLINE */}
          <div className="hv-icon hv-hotline">
            <img src={phoneIcon} className="hv-icon-img" alt="" />
            <div className="hv-hotline-text">
              <span className="line1">Hotline</span>
              <span className="line2">1800 8015</span>
            </div>
          </div>

          {/* ĐĂNG NHẬP */}
          {/* <div className="hv-icon">
            <img src={loginIcon} className="hv-icon-img1" alt="" />
            <span>Đăng nhập</span>
          </div> */}

          {/* LANGUAGE */}
          <div className="hv-lang" onClick={() => setLangOpen(!langOpen)}>
            <div className="hv-lang-selected">
              <img src={language.img} className="hv-flag-img" alt="" />
              <span>{language.text}</span>
            </div>

            {langOpen && (
              <div className="hv-lang-dropdown">

                <div
                  className="hv-lang-item"
                  onClick={() => selectLanguage("vi", "Tiếng Việt", flagVN)}
                >
                  <img src={flagVN} className="hv-flag-img" />
                  <span>Tiếng Việt</span>
                </div>

                <div
                  className="hv-lang-item"
                  onClick={() => selectLanguage("en", "English", flagEN)}
                >
                  <img src={flagEN} className="hv-flag-img" />
                  <span>English</span>
                </div>

                <div
                  className="hv-lang-item"
                  onClick={() => selectLanguage("kh", "ភាសាខ្មែរ", flagKH)}
                >
                  <img src={flagKH} className="hv-flag-img" />
                  <span>ភាសាខ្មែរ</span>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================== NAV MENU ================== */}
      <nav className="hv-menu">
        <ul>
          <li>
            VỀ CHÚNG TÔI
            <ul className="dropdown">
              <li>Giới thiệu chung</li>
              <li>Đội ngũ bác sĩ</li>
              <li>Cơ sở vật chất</li>
              <li>Sơ đồ tổ chức</li>
              <li>Thư viện</li>
            </ul>
          </li>

          <li>
            CHUYÊN KHOA
            <ul className="dropdown">
              <li>Khoa Sản</li>
              <li>Khoa Nhi</li>
              <li>Khoa Nội tổng hợp</li>
              <li>Khoa Ngoại</li>
              <li>Khoa Y học cổ truyền</li>
            </ul>
          </li>

          <li>
            DỊCH VỤ
            <ul className="dropdown">
              <li>Khám bệnh yêu cầu</li>
              <li>Gói thai sản trọn gói</li>
              <li>Xét nghiệm</li>
              <li>Chẩn đoán hình ảnh</li>
              <li>Cấp cứu 24/7</li>
            </ul>
          </li>

          <li>
            TIN TỨC
            <ul className="dropdown">
              <li>Tin nổi bật</li>
              <li>Tin hoạt động</li>
              <li>Hướng dẫn sức khỏe</li>
              <li>Tuyển dụng</li>
            </ul>
          </li>

          <li>
            KHÁCH HÀNG CẦN BIẾT
            <ul className="dropdown">
              <li>Hướng dẫn đặt lịch</li>
              <li>Quy trình khám bệnh</li>
              <li>Quy định nhập viện</li>
              <li>Bảo hiểm y tế</li>
              <li>Bảng giá dịch vụ</li>
            </ul>
          </li>

          <li>
            LIÊN HỆ
            <ul className="dropdown">
              <li>Thông tin liên hệ</li>
              <li>Đường đi</li>
              <li>Gửi góp ý</li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
