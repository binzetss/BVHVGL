import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./TinHoatDong.css";

/* =========================
   HOOK: DETECT MOBILE
========================= */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
};

export default function TinHoatDong() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({});

  /* ======================
     FETCH DATA
  ====================== */
  useEffect(() => {
    fetch(`${API_BASE}/api/news/categories`)
      .then((res) => res.json())
      .then((cats) => {
        setCategories(cats);

        cats.forEach((cat) => {
          fetch(`${API_BASE}/api/news/category/${cat.id}`)
            .then((res) => res.json())
            .then((json) => {
              setData((prev) => ({
                ...prev,
                [cat.id]: json,
              }));
            });
        });
      });
  }, []);

  /* ======================
     NAVIGATION
  ====================== */
  const openDetail = (id) => {
    navigate(`/tin-tuc/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ======================
     RENDER GROUP
  ====================== */
  const renderGroup = (cat) => {
    const group = data[cat.id];
    if (!group) return null;

    const featured = group.featured;
    const items = group.items || [];

    return (
      <section className="news-section" key={cat.id}>
        <h1 className="news-title">{cat.name}</h1>
        <p className="news-desc">{cat.description}</p>

        {/* ===== FEATURED NEWS ===== */}
        {featured && (
          <div
            className="news-feature-row"
            onClick={() => openDetail(featured.id)}
          >
            <div className="news-feature-left">
              <div className="news-main-photo">
                <img
                  src={featured.thumbnailUrl}
                  alt={featured.title}
                />
              </div>
            </div>

            <div className="news-feature-right">
              <div className="news-highlight-box">
                <h3 className="news-highlight-title">
                  {featured.title}
                </h3>
                <p className="news-highlight-text">
                  {featured.summary}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===== LIST (MOBILE) / SLIDER (DESKTOP) ===== */}
        {isMobile ? (
          /* ===== MOBILE LIST ===== */
          <div className="news-mobile-list">
            {items.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="news-mobile-item"
                onClick={() => openDetail(item.id)}
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                />
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        ) : (
          /* ===== DESKTOP SLIDER ===== */
          <div className="news-slider-wrapper">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
              loop
              spaceBetween={24}
              slidesPerView={4}
              className="news-swiper"
            >
              {items.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    className="news-card"
                    onClick={() => openDetail(item.id)}
                  >
                    <div className="news-thumb">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                      />
                    </div>
                    <h3 className="news-card-title">
                      {item.title}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>
    );
  };

  /* ======================
     RENDER PAGE
  ====================== */
  return (
    <div className="wrapper">
      <div className="news-inner">
        <div className="breadcrumb">
          <a href="/" className="home-link">
            <FaHome /> TRANG CHỦ
          </a>
          <span className="sep">/</span>
          <span className="current">TIN TỨC</span>
        </div>

        {categories.map((cat) => renderGroup(cat))}
      </div>
    </div>
  );
}
