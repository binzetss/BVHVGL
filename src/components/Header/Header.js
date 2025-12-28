import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import "./search.css";
import { FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";
import calendarIcon from "../../assets/calendar.png";
import phoneIcon from "../../assets/telephone.png";

import flagVN from "../../assets/vietnam.png";
import flagEN from "../../assets/united-kingdom.png";
import flagKH from "../../assets/flag.png";

import searchIcon from "../../assets/icons/searh.png";

// ICON MOBILE
import menuIcon from "../../assets/icons/menu.png";
import phoneCallIcon from "../../assets/icons/phone-call.png";
import chevronDownIcon from "../../assets/icons/chevron-down.png";
import chevronUpIcon from "../../assets/icons/chevron-up.png";

import { normalize, makeShort, menuSearchData } from "../data/searchIndex";

export default function Header() {
  const navigate = useNavigate();

  const [langOpen, setLangOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // MOBILE STATES
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const searchRef = useRef(null);

  const closeSearch = () => {
    setResults([]);
    setActiveIndex(-1);
    setSearchText("");
    setShowSearch(false); // mobile
  };
  const [language, setLanguage] = useState({
    code: "vi",
    text: "Tiếng Việt",
    img: flagVN,
  });

  const selectLanguage = (code, text, img) => {
    setLanguage({ code, text, img });
    setLangOpen(false);
  };

  // =================== SEARCH ===================
  const handleSearch = (value) => {
    setSearchText(value);
    const key = normalize(value);

    if (!key) {
      closeSearch(); // ✅ TỰ ĐÓNG SEARCH
      return;
    }

    let filtered = menuSearchData.filter((item) => {
      const full = normalize(item.title);
      const short = makeShort(item.title);
      return full.includes(key) || short.includes(key);
    });

    if (filtered.length === 0) {
      const fuzzy = menuSearchData.filter((item) =>
        normalize(item.title).includes(key.slice(0, 2))
      );

      setResults([{ type: "empty", text: "Không tìm thấy kết quả" }, ...fuzzy]);
      setActiveIndex(-1);
      return;
    }

    setResults(filtered);
    setActiveIndex(0);
  };

  const handleKeyDown = (e) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      const item = results[activeIndex];
      if (!item || item.type === "empty") return;

      navigate(item.path);
      closeSearch(); // ✅
    }

    if (e.key === "Escape") {
      closeSearch(); // ✅
    }
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =================== MOBILE DROPDOWN ===================
  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  const mobileNavigate = (path) => {
    setShowMenu(false);
    setOpenDropdown(null);
    navigate(path);
  };

  const SearchBox = ({ onSelect }) => (
    <div className="hv-search-center" ref={searchRef}>
      <input
        placeholder="Tìm kiếm..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <img src={searchIcon} className="hv-search-icon" alt="search" />

      {results.length > 0 && (
        <div className="search-results">
          {results.map((item, idx) =>
            item.type === "empty" ? (
              <div key={idx} className="search-empty">
                {item.text}
              </div>
            ) : (
              <div
                key={idx}
                className={`search-item ${idx === activeIndex ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  onSelect(item.path);
                  setSearchText("");
                  setResults([]);
                  setActiveIndex(-1);
                }}
              >
                {item.title}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );

  return (
    <header className="hv-header">
      {/* ================= MOBILE BAR ================= */}
      <div className="hv-mobile-bar">
        <img
          src={menuIcon}
          className="m-icon-btn"
          alt="Menu"
          onClick={() => setShowMenu(true)}
        />

        <img src={logo} className="m-logo" alt="logo" />

        <div className="m-icons">
          <a href="tel:18008015">
            <img src={phoneCallIcon} className="m-icon-btn" alt="Hotline" />
          </a>
          <img
            src={searchIcon}
            className="m-icon-seach"
            alt="Tìm kiếm"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        </div>
      </div>
      {/* ================= MOBILE SEARCH BOX ================= */}
      {showSearch && (
        <div className="m-search-wrapper">
          <div className="hv-search-center mobile-search" ref={searchRef}>
            <input
              placeholder="Tìm kiếm..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />

            <img src={searchIcon} className="hv-search-icon" alt="search" />

            {results.length > 0 && (
              <div className="search-results">
                {results.map((item, idx) =>
                  item.type === "empty" ? (
                    <div key={idx} className="search-empty">
                      {item.text}
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className={`search-item ${
                        idx === activeIndex ? "active" : ""
                      }`}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => {
                        navigate(item.path);
                        setSearchText("");
                        setResults([]);
                        setActiveIndex(-1);
                        setShowSearch(false);
                      }}
                    >
                      {item.title}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`m-side-menu ${showMenu ? "open" : ""}`}>
        <div className="m-side-header">
          <img
            src="https://image.bvhvgl.com/images/LoGo HVGL/logo_chinh.png"
            alt="HVGL Logo"
            className="m-menu-logo"
            onClick={() => mobileNavigate("/")}
            style={{ cursor: "pointer" }}
          />
          <FaTimes
            className="m-close-btn m-icon-svg"
            onClick={() => setShowMenu(false)}
          />
        </div>

        <ul className="m-main-menu">
          {/* ===== VỀ CHÚNG TÔI ===== */}
          <li>
            <div className="m-item" onClick={() => toggleDropdown("about")}>
              <span>Về chúng tôi</span>
              <img
                src={openDropdown === "about" ? chevronUpIcon : chevronDownIcon}
                className="m-arrow"
                alt=""
              />
            </div>

            {openDropdown === "about" && (
              <ul className="m-submenu">
                <li onClick={() => mobileNavigate("/")}>Trang chủ</li>
                <li onClick={() => mobileNavigate("/gioi-thieu")}>
                  Giới thiệu chung
                </li>
                <li onClick={() => mobileNavigate("/doi-ngu-bac-si")}>
                  Đội ngũ bác sĩ
                </li>
                <li onClick={() => mobileNavigate("/co-so-vat-chat")}>
                  Cơ sở vật chất
                </li>
                <li onClick={() => mobileNavigate("/so-do-to-chuc")}>
                  Sơ đồ tổ chức
                </li>
                <li onClick={() => mobileNavigate("/thu-vien")}>
                  Thư viện hình ảnh
                </li>
                <li onClick={() => mobileNavigate("/benh-vien-ve-tinh")}>
                  Bệnh viện/Phòng khám vệ tinh
                </li>
              </ul>
            )}
          </li>

          {/* ===== CHUYÊN KHOA ===== */}
          <li>
            <div className="m-item">
              {/* CLICK CHỮ → ĐI TRANG CHÍNH */}
              <span onClick={() => mobileNavigate("/chuyen-khoa")}>
                Chuyên khoa
              </span>

              {/* CLICK ICON → MỞ / ĐÓNG SUBMENU */}
              <img
                src={openDropdown === "khoa" ? chevronUpIcon : chevronDownIcon}
                className="m-arrow"
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("khoa");
                }}
              />
            </div>

            {openDropdown === "khoa" && (
              <ul className="m-submenu">
                <li onClick={() => mobileNavigate("/chuyen-khoa/17")}>
                  Khám bệnh
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/12")}>
                  Hồi sức tích cực - Chống độc
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/5")}>
                  Nội tổng hợp - Tim mạch
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/8")}>
                  Ngoại tổng hợp
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/7")}>
                  Chấn thương chỉnh hình
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/3")}>
                  Liên chuyên khoa
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/10")}>Nhi</li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/4")}>
                  Phụ sản
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/2")}>
                  Phục hồi chức năng - Y học cổ truyền
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/16")}>
                  Phẫu thuật - Gây mê hồi sức
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/15")}>
                  Chẩn đoán hình ảnh
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/18")}>
                  Xét nghiệm
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/6")}>Dược</li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/11")}>
                  Dinh dưỡng
                </li>
                <li onClick={() => mobileNavigate("/chuyen-khoa/14")}>
                  Kiểm soát nhiễm khuẩn
                </li>
              </ul>
            )}
          </li>

          {/* ===== DỊCH VỤ ===== */}
          <li>
            <div className="m-item">
              {/* CLICK CHỮ → ĐI TRANG CHÍNH */}
              <span onClick={() => mobileNavigate("/dich-vu")}>Dịch vụ</span>

              {/* CLICK ICON → MỞ / ĐÓNG SUBMENU */}
              <img
                src={
                  openDropdown === "service" ? chevronUpIcon : chevronDownIcon
                }
                className="m-arrow"
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("service");
                }}
              />
            </div>

            {openDropdown === "service" && (
              <ul className="m-submenu">
                <li onClick={() => mobileNavigate("/dich-vu/1")}>Cấp cứu</li>
                <li onClick={() => mobileNavigate("/dich-vu/2")}>
                  Khám sức khỏe VIP, doanh nghiệp
                </li>
                <li onClick={() => mobileNavigate("/dich-vu/3")}>
                  Tim mạch - Điện quang can thiệp
                </li>
                <li onClick={() => mobileNavigate("/dich-vu/4")}>
                  Phẫu thuật thẩm mỹ
                </li>
                <li onClick={() => mobileNavigate("/dich-vu/5")}>
                  Da liễu thẩm mỹ
                </li>
                <li onClick={() => mobileNavigate("/dich-vu/6")}>Nha Khoa</li>
                <li onClick={() => mobileNavigate("/dich-vu/7")}>Tiêm chủng</li>
                <li onClick={() => mobileNavigate("/dich-vu/8")}>
                  Hỗ trợ sinh sản IUI
                </li>
                <li onClick={() => mobileNavigate("/dich-vu/9")}>Tâm bệnh</li>
                <li onClick={() => mobileNavigate("/dich-vu/10")}>
                  Nội soi &amp; thăm dò chức năng
                </li>
                <li onClick={() => mobileNavigate("/dich-vu/11")}>
                  Thận nhân tạo
                </li>
              </ul>
            )}
          </li>
          {/* ===== TIN TỨC ===== */}
          <li>
            <div className="m-item">
              <span onClick={() => mobileNavigate("/tin-tuc")}>Tin tức</span>

              <img
                src={openDropdown === "news" ? chevronUpIcon : chevronDownIcon}
                className="m-arrow"
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("news");
                }}
              />
            </div>

            {openDropdown === "news" && (
              <ul className="m-submenu">
                <li onClick={() => mobileNavigate("/tin-tuc")}>
                  Tin hoạt động
                </li>
                <li onClick={() => mobileNavigate("/tin-tuc")}>
                  Y học thường thức
                </li>
                <li onClick={() => mobileNavigate("/tin-tuc")}>
                  Tin tuyển dụng
                </li>
                <li onClick={() => mobileNavigate("/tin-tuc")}>
                  Bản tin sức khỏe Hùng Vương
                </li>
              </ul>
            )}
          </li>
          {/* ===== KHÁCH HÀNG CẦN BIẾT ===== */}
          <li>
            <div className="m-item">
              <span>Khách hàng cần biết</span>
              <img
                src={openDropdown === "khach" ? chevronUpIcon : chevronDownIcon}
                className="m-arrow"
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("khach");
                }}
              />
            </div>

            {openDropdown === "khach" && (
              <ul className="m-submenu">
                <li onClick={() => mobileNavigate("/quy-trinh-kham-benh")}>
                  Quy trình khám bệnh
                </li>

                <li onClick={() => mobileNavigate("/tien-ich")}>Tiện ích</li>

                <li onClick={() => mobileNavigate("/che-do-bhyt-bao-lanh")}>
                  Chế độ BHYT/Bảo lãnh viện
                </li>

                <li onClick={() => mobileNavigate("/bang-gia")}>
                  Bảng giá dịch vụ
                </li>

                <li
                  onClick={() => {
                    setShowMenu(false);
                    setOpenDropdown(null);
                    window.open(
                      "http://lichphongkham.bvhvgl.com/lich-phong-kham-7-ngay",
                      "_blank"
                    );
                  }}
                >
                  Lịch làm việc của Bác sĩ
                </li>

                <li onClick={() => mobileNavigate("/tai-app-hvgl-care")}>
                  TẢI APP HVGL CARE
                </li>
              </ul>
            )}
          </li>

          {/* ===== LIÊN HỆ ===== */}
          <li>
            <div className="m-item" onClick={() => toggleDropdown("lienhe")}>
              <span>Liên hệ</span>
              <img
                src={
                  openDropdown === "lienhe" ? chevronUpIcon : chevronDownIcon
                }
                className="m-arrow"
                alt=""
              />
            </div>

            {openDropdown === "lienhe" && (
              <ul className="m-submenu">
                <li onClick={() => mobileNavigate("/lien-he")}>
                  Thông tin liên hệ
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* OVERLAY MOBILE */}
      {showMenu && (
        <div className="m-overlay" onClick={() => setShowMenu(false)} />
      )}
      {/* ================= DESKTOP HEADER ================= */}
      <div className="hv-top">
        <div className="hv-left">
          <Link to="/">
            <img src={logo} className="hv-logo" alt="logo" />
          </Link>
        </div>

        <div className="hv-search-center" ref={searchRef}>
          <input
            placeholder="Tìm kiếm..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <img src={searchIcon} className="hv-search-icon" alt="search" />

          {results.length > 0 && (
            <div className="search-results">
              {results.map((item, idx) =>
                item.type === "empty" ? (
                  <div key={idx} className="search-empty">
                    {item.text}
                  </div>
                ) : (
                  <div
                    key={idx}
                    className={`search-item ${
                      idx === activeIndex ? "active" : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      navigate(item.path);
                      setSearchText("");
                      setResults([]);
                      setActiveIndex(-1);
                    }}
                  >
                    {item.title}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <div className="hv-right">
          <a
            href="https://zalo.me/bvhvgl"
            target="_blank"
            rel="noopener noreferrer"
            className="hv-icon hv-booking"
          >
            <img
              src={calendarIcon}
              className="hv-icon-img2"
              alt="Đặt lịch khám"
            />
            <span>Đặt lịch khám</span>
          </a>

          <a href="tel:18008015" className="hv-icon hv-hotline">
            <img src={phoneIcon} className="hv-icon-img" alt="Hotline" />
            <div className="hv-hotline-text">
              <span className="line1">Hotline</span>
              <span className="line2">1800 8015</span>
            </div>
          </a>

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
                  <img src={flagVN} className="hv-flag-img" alt="" />
                  <span>Tiếng Việt</span>
                </div>

                <div
                  className="hv-lang-item"
                  onClick={() => selectLanguage("en", "English", flagEN)}
                >
                  <img src={flagEN} className="hv-flag-img" alt="" />
                  <span>English</span>
                </div>

                <div
                  className="hv-lang-item"
                  onClick={() => selectLanguage("kh", "ភាសាខ្មែរ", flagKH)}
                >
                  <img src={flagKH} className="hv-flag-img" alt="" />
                  <span>ភាសាខ្មែរ</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ================= DESKTOP NAV ================= */}
      <nav className="hv-menu">
        <ul>
          <li>
            <span className="menu-title" onClick={() => navigate("/")}>
              VỀ CHÚNG TÔI
            </span>
            <ul className="dropdown">
              <li>Tour Tham quan 360/Microsite</li>
              <li onClick={() => navigate("/gioi-thieu")}>Giới thiệu chung</li>
              <li onClick={() => navigate("/co-so-vat-chat")}>
                Cơ sở vật chất
              </li>
              <li onClick={() => navigate("/so-do-to-chuc")}>Sơ đồ tổ chức</li>
              <li onClick={() => navigate("/doi-ngu-bac-si")}>
                {" "}
                Đội ngũ bác sĩ{" "}
              </li>
              <li onClick={() => navigate("/thu-vien")}>Thư viện hìnhh ảnh</li>
              <li onClick={() => navigate("/benh-vien-ve-tinh")}>
                Bệnh viện/Phòng khám vệ tinh
              </li>
            </ul>
          </li>
          <li onClick={() => navigate("/chuyen-khoa")}>
            CHUYÊN KHOA
            <ul className="dropdown" onClick={(e) => e.stopPropagation()}>
              <li onClick={() => navigate("/chuyen-khoa/17")}>Khám bệnh</li>
              <li onClick={() => navigate("/chuyen-khoa/12")}>
                Hồi sức tích cực - Chống độc
              </li>
              <li onClick={() => navigate("/chuyen-khoa/5")}>
                Nội tổng hợp - Tim mạch
              </li>
              <li onClick={() => navigate("/chuyen-khoa/8")}>Ngoại tổng hợp</li>
              <li onClick={() => navigate("/chuyen-khoa/7")}>
                Chấn thương chỉnh hình
              </li>
              <li onClick={() => navigate("/chuyen-khoa/3")}>
                Liên chuyên khoa
              </li>
              <li onClick={() => navigate("/chuyen-khoa/10")}>Nhi</li>
              <li onClick={() => navigate("/chuyen-khoa/4")}>Phụ sản</li>
              <li onClick={() => navigate("/chuyen-khoa/2")}>
                Phục hồi chức năng - Y học cổ truyền
              </li>
              <li onClick={() => navigate("/chuyen-khoa/16")}>
                Phẫu thuật - Gây mê hồi sức
              </li>
              <li onClick={() => navigate("/chuyen-khoa/15")}>
                Chẩn đoán hình ảnh
              </li>
              <li onClick={() => navigate("/chuyen-khoa/18")}>Xét nghiệm</li>
              <li onClick={() => navigate("/chuyen-khoa/6")}>Dược</li>
              <li onClick={() => navigate("/chuyen-khoa/11")}>Dinh dưỡng</li>
              <li onClick={() => navigate("/chuyen-khoa/14")}>
                Kiểm soát nhiễm khuẩn
              </li>
            </ul>
          </li>

          <li onClick={() => navigate("/dich-vu")}>
            DỊCH VỤ
            <ul className="dropdown" onClick={(e) => e.stopPropagation()}>
              <li onClick={() => navigate("/dich-vu/1")}>Cấp cứu</li>
              <li onClick={() => navigate("/dich-vu/2")}>
                Khám sức khỏe VIP, doanh nghiệp
              </li>
              <li onClick={() => navigate("/dich-vu/3")}>
                Tim mạch - Điện quang can thiệp
              </li>
              <li onClick={() => navigate("/dich-vu/4")}>Phẫu thuật thẩm mỹ</li>
              <li onClick={() => navigate("/dich-vu/5")}>Da liễu thẩm mỹ</li>
              <li onClick={() => navigate("/dich-vu/6")}>Nha Khoa</li>
              <li onClick={() => navigate("/dich-vu/7")}>Tiêm chủng</li>
              <li onClick={() => navigate("/dich-vu/8")}>
                Hỗ trợ sinh sản IUI
              </li>
              <li onClick={() => navigate("/dich-vu/9")}>Tâm bệnh</li>
              <li onClick={() => navigate("/dich-vu/10")}>
                Nội soi &amp; thăm dò chức năng
              </li>
              <li onClick={() => navigate("/dich-vu/11")}>Thận nhân tạo</li>
            </ul>
          </li>

          <li onClick={() => navigate("/tin-tuc")}>
            TIN TỨC
            <ul className="dropdown" onClick={(e) => e.stopPropagation()}>
              <li onClick={() => navigate("/tin-tuc")}>Tin hoạt động</li>
              <li onClick={() => navigate("/tin-tuc")}>Y học thường thức</li>
              <li onClick={() => navigate("/tin-tuc")}>Tin Tuyển dụng</li>
              <li onClick={() => navigate("/tin-tuc")}>
                Bản tin sức khỏe Hùng Vương
              </li>
            </ul>
          </li>

          <li>
            KHÁCH HÀNG CẦN BIẾT
            <ul className="dropdown">
              <li onClick={() => navigate("/quy-trinh-kham-benh")}>
                Quy trình khám bệnh
              </li>
              <li onClick={() => navigate("/tien-ich")}>Tiện ích</li>
              <li onClick={() => navigate("/che-do-bhyt-bao-lanh")}>
                Chế độ BHYT/Bảo lãnh viện
              </li>
              <li onClick={() => navigate("/bang-gia")}>Bảng giá dịch vụ</li>
              <li
                onClick={() =>
                  window.open(
                    "http://lichphongkham.bvhvgl.com/lich-phong-kham-7-ngay",
                    "_blank"
                  )
                }
              >
                Lịch làm việc của Bác sĩ
              </li>
              <li onClick={() => navigate("/tai-app-hvgl-care")}>
                TẢI APP HVGL CARE
              </li>
            </ul>
          </li>

          <li onClick={() => navigate("/lien-he")}>
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
