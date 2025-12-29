// ==========================
// AlbumSuKienDetail.jsx
// ==========================
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import "./AlbumSuKienDetail.css";
import CustomerSection from "../../components/CustomerSection/CustomerSection";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { publicApi } from "../../api/publicApi";
import { normalizeImageUrl } from "../../utils/normalizeImageUrl";

export default function AlbumSuKienDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const [album, setAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [numericId]);

  useEffect(() => {
    if (!numericId) return;
    publicApi(`/api/media-albums/albums/${numericId}/detail`).then((data) => {
      if (!data) return;
      setAlbum(data);
      setAlbumImages(data.images || []);
    });
  }, [numericId]);

  useEffect(() => {
    publicApi("/api/media/albums?type=PHOTO").then((list) => {
      if (!Array.isArray(list)) return;
      setOtherEvents(list.filter((i) => Number(i.id) !== numericId));
    });
  }, [numericId]);

  const openLightbox = (src) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc("");
    document.body.style.overflow = "";
  };

  if (!album) return null;

  return (
    <div className="album-wrapper">
      <div className="album-inner">
        {/* ===== BREADCRUMB ===== */}
        <div className="album-breadcrumb">
          <span className="album-breadcrumb-home" onClick={() => navigate("/")}>
            <FaHome /> Trang chủ
          </span>
          <span>/</span>
          <span
            className="album-breadcrumb-link"
            onClick={() => navigate("/thu-vien")}
          >
            Thư viện
          </span>
          <span>/</span>
          <span className="album-breadcrumb-current">Ảnh sự kiện</span>
        </div>

        {/* ===== HERO ===== */}
        <section className="album-hero">
          <div>
            <p className="album-hero-tag">ẢNH SỰ KIỆN</p>
            <h1 className="album-hero-title">{album.title}</h1>

            <div className="album-summary-box">
              <div className="album-summary-header">
                <h2 className="album-summary-title">Tóm tắt sự kiện</h2>
                <button
                  className="album-summary-detail-btn"
                  onClick={() => setSummaryModalOpen(true)}
                >
                  Xem chi tiết
                </button>
              </div>

              <div
                className="album-intro-clamp"
                dangerouslySetInnerHTML={{ __html: album.intro }}
              />
            </div>
          </div>

          {albumImages[0] && (
            <div
              className="album-photo-thumb"
              onClick={() =>
                openLightbox(normalizeImageUrl(albumImages[0].imageUrl))
              }
            >
              <img src={normalizeImageUrl(albumImages[0].imageUrl)} alt="" />
              <div className="album-photo-overlay">
                <span className="album-photo-overlay-text">XEM LỚN</span>
              </div>
            </div>
          )}
        </section>

        {/* ===== GALLERY ===== */}
        <section className="album-gallery-section">
          <div className="album-gallery-grid">
            {albumImages.map((img) => (
              <div key={img.id} className="album-photo-card">
                <div
                  className="album-photo-thumb"
                  onClick={() => openLightbox(normalizeImageUrl(img.imageUrl))}
                >
                  <img src={normalizeImageUrl(img.imageUrl)} alt="" />
                  <div className="album-photo-overlay">
                    <span className="album-photo-overlay-text">XEM LỚN</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== OTHER EVENTS ===== */}
        <section className="album-other-events">
          <h2 className="album-other-events-title">CÁC SỰ KIỆN KHÁC</h2>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={18}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              992: { slidesPerView: 4 },
            }}
          >
            {otherEvents.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="album-other-events-card"
                  onClick={() => navigate(`/thu-vien/anh-su-kien/${item.id}`)}
                >
                  <img src={item.imageUrl} alt={item.title} />
                  <div className="album-other-events-card-title">
                    {item.title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>

      <CustomerSection />

      {/* ===== LIGHTBOX ===== */}
      {lightboxOpen && (
        <div className="album-lightbox" onClick={closeLightbox}>
          <div
            className="album-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightboxSrc} alt="" />
          </div>
        </div>
      )}

      {/* ===== SUMMARY POPUP ===== */}
      {summaryModalOpen && (
        <div
          className="album-summary-modal-backdrop"
          onClick={() => setSummaryModalOpen(false)}
        >
          <div
            className="album-summary-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="album-summary-modal-close"
              onClick={() => setSummaryModalOpen(false)}
            >
              ×
            </button>

            <div className="album-summary-modal-content">
              {/* ===== LEFT CONTENT ===== */}
              <div className="album-summary-modal-left">
                {album.intro && (
                  <div className="album-summary-section">
                    <h3>Giới thiệu</h3>
                    <div dangerouslySetInnerHTML={{ __html: album.intro }} />
                  </div>
                )}

                {album.sections?.map((s, idx) => (
                  <div key={idx} className="album-summary-section">
                    {s.heading && <h3>{s.heading}</h3>}
                    {s.bullets && (
                      <div dangerouslySetInnerHTML={{ __html: s.bullets }} />
                    )}
                  </div>
                ))}
              </div>

              {/* ===== RIGHT SLIDER (FIX MOBILE) ===== */}
              <div className="album-summary-modal-right">
                <Swiper
                  modules={[Autoplay]}
                  direction="vertical"
                  spaceBetween={12}
                  loop
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1 }, // 📱 mobile
                    768: { slidesPerView: 3 }, // 💻 tablet & desktop
                  }}
                  className="album-summary-slider"
                >
                  {albumImages.map((img) => (
                    <SwiperSlide key={img.id}>
                      <img src={normalizeImageUrl(img.imageUrl)} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
