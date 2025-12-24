import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./ContactPage.css";
import MessengerIcon from "../../assets/messenger.png";
import ZaloIcon from "../../assets/zalo.png";
import YoutubeIcon from "../../assets/icon-yt.png";
import FacebookIcon from "../../assets/icon-fb.png";
import { API_BASE } from "../../config";

export default function ContactPage() {
  const [branches, setBranches] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  /* ================= LOAD FROM BE ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/branches`)
      .then((res) => res.json())
      .then((data) => {
        setBranches(data || []);
        if (data?.length) setSelectedId(data[0].id);
      });
  }, []);

  const selectedBranch = branches.find((b) => b.id === selectedId) || {};

  if (!branches.length) return null;

  return (
    <div className="wrapper">
      <div className="contactpage-wrapper">
        {/* ================= BREADCRUMB ================= */}
        <div className="breadcrumb">
          <a href="/" className="home-link">
            <FaHome className="icon-home" /> TRANG CHỦ
          </a>
          <span className="sep">/</span>
          <span className="current">liên hệ</span>
        </div>

        {/* ================= INTRO ================= */}
        <div className="contact-intro">
          <h2 className="contact-title">LIÊN HỆ</h2>
          <p className="contact-subtitle">
            Kết nối nhanh với Bệnh viện Hùng Vương Gia Lai qua các kênh sau:
          </p>

          <div className="contact-channel-grid">
            <a
              href="https://zalo.me/bvhvgl"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <img src={ZaloIcon} alt="Zalo" className="channel-icon" />
              <div className="channel-text">
                <div className="channel-name">Zalo OA</div>
                <div className="channel-desc">Đặt lịch & nhận thông báo</div>
                <div className="channel-handle">
                  Bệnh viện Hùng Vương Gia Lai
                </div>
              </div>
            </a>

            <a
              href="https://m.me/157566379728871"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <img src={MessengerIcon} alt="Messenger" className="channel-icon" />
              <div className="channel-text">
                <div className="channel-name">Messenger</div>
                <div className="channel-desc">Nhắn tin trực tiếp Fanpage</div>
                <div className="channel-handle">m.me/157566379728871</div>
              </div>
            </a>

            <a
              href="https://www.facebook.com/bvhvgl"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <img src={FacebookIcon} alt="Facebook" className="channel-icon" />
              <div className="channel-text">
                <div className="channel-name">Facebook</div>
                <div className="channel-desc">Fanpage chính thức</div>
                <div className="channel-handle">www.facebook.com/bvhvgl</div>
              </div>
            </a>

            <a
              href="https://www.youtube.com/@bvhvgl"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <img src={YoutubeIcon} alt="YouTube" className="channel-icon" />
              <div className="channel-text">
                <div className="channel-name">YouTube</div>
                <div className="channel-desc">Video tư vấn sức khỏe</div>
                <div className="channel-handle">
                  BV Hùng Vương Gia Lai Official
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* ================= MAIN ================= */}
        <div className="contact-main">
          {/* LEFT */}
          <div className="contact-left">
            {branches.map((branch, index) =>
              branch.id === selectedId ? (
                <div key={branch.id} className="branch-main-card">
                  <div
                    className="branch-main-header"
                    onClick={() => setSelectedId(branch.id)}
                  >
                    <div className="branch-main-number">{index + 1}</div>
                    <div className="branch-main-title">{branch.name}</div>
                  </div>

                  {branch.shortDesc && (
                    <p className="branch-main-desc">{branch.shortDesc}</p>
                  )}

                  <Link
                    to={branch.detailPath || `/co-so/${branch.id}`}
                    className="branch-main-btn"
                  >
                    Chi tiết về cơ sở &gt;
                  </Link>
                </div>
              ) : (
                <button
                  key={branch.id}
                  className="branch-mini-item"
                  onClick={() => setSelectedId(branch.id)}
                >
                  <div className="branch-mini-number">{index + 1}</div>
                  <div className="branch-mini-name">{branch.name}</div>
                </button>
              )
            )}
          </div>

          {/* RIGHT */}
          <div className="contact-right">
            <div className="info-box">
              <FaMapMarkerAlt className="info-icon" />
              <span>{selectedBranch.address}</span>
            </div>

            <div className="info-box">
              <FaPhoneAlt className="info-icon" />
              <div className="info-text">
                <div className="info-line">
                  CSKH: <b>{selectedBranch.hotline || "Đang cập nhật"}</b>
                </div>
                <div className="info-line">
                  Cấp cứu 115:{" "}
                  <b>{selectedBranch.emergency || "Đang cập nhật"}</b>
                </div>
              </div>
            </div>

            <div className="info-box">
              <FaClock className="info-icon" />
              <span>{selectedBranch.workingTime}</span>
            </div>

            <div className="info-box info-license">
              {selectedBranch.license}
            </div>

            {selectedBranch.mapSrc && (
              <div className="branch-map-wrapper">
                <iframe
                  className="contact-map-iframe"
                  title={`map-branch-${selectedBranch.id}`}
                  src={selectedBranch.mapSrc}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
