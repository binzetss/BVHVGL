// src/pages/HVGL/AppDownloadPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaApple,
  FaGooglePlay,
  FaQrcode,
  FaArrowRight,
} from "react-icons/fa";

import FeatureImage from "../../assets/bgmyapp.png";
import BgHero from "../../assets/app/bghero.png";

import QrIos from "../../assets/app/QR.png";
import QrAndroid from "../../assets/app/QR2.png";
import App1 from "../../assets/app/anh2.png";
import App2 from "../../assets/app/anh1.png";
import App3 from "../../assets/app/anh3.png";
import App4 from "../../assets/app/anh4.png";
import App5 from "../../assets/app/anh5.png";
import App6 from "../../assets/app/anh6.png";

import "./AppDownloadPage.css";

export default function AppDownloadPage() {
  const navigate = useNavigate();

  // Danh sách ảnh chạy slider bên phải
  const screenshots = [App1, App2, App3, App4, App5, App6];

  // Slider index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Nền QR: mặc định iOS
  const [platform, setPlatform] = useState("ios"); // "ios" | "android"

  const currentQr = platform === "ios" ? QrIos : QrAndroid;

  // Auto slide ảnh 6 hình (1 -> 6 -> 1 ...)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 2500); // 2.5s đổi 1 ảnh

    return () => clearInterval(interval);
  }, [screenshots.length]);

  // Scroll top khi vào trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Click chọn iOS
  const handleSelectIos = (e) => {
    e.preventDefault();
    setPlatform("ios");
  };

  // Click chọn Android
  const handleSelectAndroid = (e) => {
    e.preventDefault();
    setPlatform("android");
  };

  return (
    <div className="appdl-wrapper">
      <div className="appdl-inner">
        {/* ===== HERO ===== */}
        <div
          className="appdl-hero"
          style={{ backgroundImage: `url(${BgHero})` }}
        >
          <div className="appdl-hero-overlay" />
          <div className="appdl-hero-text">
            <h1>TẢI APP HVGL CARE</h1>
            <p>
              Đặt lịch khám, theo dõi hồ sơ sức khỏe và nhận thông báo từ bệnh
              viện mọi lúc, mọi nơi – chỉ với một ứng dụng duy nhất.
            </p>
          </div>
        </div>

        {/* ===== BODY ===== */}
        <div className="appdl-container">
          {/* LEFT CONTENT */}
          <div className="appdl-left">
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <span className="link" onClick={() => navigate("/")}>
                <FaHome className="icon-home" /> TRANG CHỦ
              </span>
              <span className="sep">&gt;</span>
              <span className="current">TẢI APP HVGL CARE</span>
            </div>

            {/* BLOCK CHÍNH */}
            <section className="appdl-block">
              <h2 className="appdl-title">Tải ứng dụng HVGL Care</h2>
              <p className="appdl-desc">
                Ứng dụng <strong>HVGL Care</strong> giúp bạn quản lý lịch khám,
                xem kết quả cận lâm sàng, theo dõi quá trình điều trị và nhận
                thông báo từ bệnh viện một cách nhanh chóng, an toàn.
              </p>

              {/* QR + BUTTONS */}
              <div className="appdl-main-grid">
                {/* QR BLOCK */}
                {/* QR ONLY – NO BOX */}
                <div className="appdl-qr-wrapper">
                  <div className="appdl-qr-title">
                    {platform === "ios"
                      ? "Quét mã QR để tải nhanh trên App Store (iOS)"
                      : "Quét mã QR để tải nhanh trên Google Play (Android)"}
                  </div>

                  <img
                    key={platform}
                    src={currentQr}
                    alt="QR tải app HVGL Care"
                    className="appdl-qr-image"
                  />

                  <p className="appdl-note-small" style={{ marginTop: 8 }}>
                    Nếu không quét được QR, bạn có thể chọn tải trực tiếp qua
                    App Store / CH Play bên dưới.
                  </p>
                </div>

                {/* DOWNLOAD BUTTONS + STEPS */}
                <div className="appdl-download-card">
                  <div className="appdl-btn-group">
                    {/* iOS */}
                    <a
                      href="#"
                      onClick={handleSelectIos}
                      className={
                        "appdl-store-btn " +
                        (platform === "ios" ? "ios-active" : "ios-inactive")
                      }
                    >
                      <FaApple className="appdl-store-icon" />
                      <div className="appdl-store-text">
                        <span className="small">Tải trên</span>
                        <span className="big">App Store (iOS)</span>
                      </div>
                      <FaArrowRight className="appdl-store-arrow" />
                    </a>

                    {/* Android */}
                    <a
                      href="#"
                      onClick={handleSelectAndroid}
                      className={
                        "appdl-store-btn " +
                        (platform === "android"
                          ? "android-active"
                          : "android-inactive")
                      }
                    >
                      <FaGooglePlay className="appdl-store-icon" />
                      <div className="appdl-store-text">
                        <span className="small">Tải trên</span>
                        <span className="big">Google Play (Android)</span>
                      </div>
                      <FaArrowRight className="appdl-store-arrow" />
                    </a>
                  </div>

                  <div className="appdl-steps">
                    <h3 className="appdl-steps-title">Hướng dẫn tải app</h3>
                    <ol>
                      <li>
                        Mở <strong>App Store</strong> (iPhone) hoặc{" "}
                        <strong>CH Play</strong> (Android) trên điện thoại.
                      </li>
                      <li>
                        Tìm kiếm với từ khóa <strong>“HVGL Care”</strong>.
                      </li>
                      <li>
                        Chọn <strong>Cài đặt / Install</strong> và đăng nhập
                        bằng số điện thoại đã đăng ký tại bệnh viện.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            {/* BANNER TÍNH NĂNG */}
            <div className="appdl-feature-section">
              <img src={FeatureImage} alt="Tính năng ứng dụng HVGL Care" />
            </div>
          </div>

          {/* RIGHT – APP PREVIEW + AUTO SLIDER */}
          <div className="appdl-right">
            <div className="appdl-phone-card">
              <div className="appdl-phone-header">
                <span className="appdl-chip">Giao diện ứng dụng</span>
                <h3>HVGL Care trên điện thoại</h3>
                <p>
                  Giao diện đơn giản, thân thiện, tối ưu cho người dùng mọi lứa
                  tuổi.
                </p>
              </div>

              <div className="appdl-phone-body">
                <div className="appdl-phone-mockup">
                  <div className="appdl-phone-inner">
                    <img
                      src={screenshots[currentIndex]}
                      alt={`Màn hình HVGL Care ${currentIndex + 1}`}
                    />
                  </div>
                </div>

                <div className="appdl-phone-features">
                  <ul>
                    <li>Đặt lịch khám nhanh chóng, hạn chế chờ đợi.</li>
                    <li>Theo dõi kết quả khám và toa thuốc mọi lúc.</li>
                    <li>Nhận nhắc lịch tái khám, tiêm chủng, xét nghiệm.</li>
                    <li>Kết nối thông tin giữa bệnh nhân và bệnh viện.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* TIP BOX */}
            <div className="appdl-tip-box">
              <h4>Lưu ý khi cài đặt</h4>
              <p>
                Để trải nghiệm đầy đủ tính năng, hãy cho phép ứng dụng HVGL Care
                truy cập <strong>thông báo (Notification)</strong> trên điện
                thoại của bạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
