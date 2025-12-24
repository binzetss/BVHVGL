import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

import { adminApi } from "../../api/adminApi";
import CustomerSection from "../../components/CustomerSection/CustomerSection";
import "./ThuVienMedia.css";

/* ===== HOOK: DETECT MOBILE ===== */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
};

export default function ThuVienMedia() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [photoAlbums, setPhotoAlbums] = useState([]);
  const [videoAlbums, setVideoAlbums] = useState([]);

  const [featuredPhoto, setFeaturedPhoto] = useState(null);
  const [featuredVideo, setFeaturedVideo] = useState(null);

  const [featuredPhotoIntro, setFeaturedPhotoIntro] = useState("");
  const [featuredVideoIntro, setFeaturedVideoIntro] = useState("");

  /* ===== LOAD LIST ===== */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    adminApi("/api/media-albums").then((data) => {
      const list = data || [];

      const photos = list.filter((a) => a.mediaType === "PHOTO");
      const videos = list.filter((a) => a.mediaType === "VIDEO");

      setPhotoAlbums(photos);
      setVideoAlbums(videos);

      const fp = photos.find((a) => a.isFeatured) || photos[0] || null;
      const fv = videos.find((a) => a.isFeatured) || videos[0] || null;

      setFeaturedPhoto(fp);
      setFeaturedVideo(fv);
    });
  }, []);

  /* ===== LOAD FEATURED PHOTO DETAIL ===== */
  useEffect(() => {
    if (!featuredPhoto?.id) return;

    setFeaturedPhotoIntro("");

    adminApi(`/api/media-albums/albums/${featuredPhoto.id}/detail`)
      .then((d) => setFeaturedPhotoIntro(d?.intro || ""));
  }, [featuredPhoto?.id]);

  /* ===== LOAD FEATURED VIDEO DETAIL ===== */
  useEffect(() => {
    if (!featuredVideo?.id) return;

    setFeaturedVideoIntro("");

    adminApi(`/api/media-albums/albums/${featuredVideo.id}/detail`)
      .then((d) => setFeaturedVideoIntro(d?.intro || ""));
  }, [featuredVideo?.id]);

  /* ===== HANDLER ===== */
  const handleVideoClick = (id) => {
    navigate(`/thu-vien/video/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPhotoDetailPath = (id) =>
    id ? `/thu-vien/anh-su-kien/${id}` : "#";

  const handleFeatureClick = () => {
    if (featuredPhoto?.id) {
      navigate(getPhotoDetailPath(featuredPhoto.id));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ===== RENDER PHOTO SLIDER/LIST ===== */
  const renderPhotoGallery = () => {
    if (isMobile) {
      return (
        <div className="tv-mobile-list">
          {photoAlbums.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              to={getPhotoDetailPath(item.id)}
              className="tv-thumb-card-link"
            >
              <div className="tv-thumb-card">
                <div className="tv-thumb-img-wrap">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="tv-thumb-img"
                  />
                </div>
                <div className="tv-thumb-caption">
                  {item.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }

    return (
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Grid]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={4}
        slidesPerGroup={1}
        grid={{ rows: 2, fill: "row" }}
        spaceBetween={24}
        rewind
        className="tv-swiper"
      >
        {photoAlbums.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              to={getPhotoDetailPath(item.id)}
              className="tv-thumb-card-link"
            >
              <div className="tv-thumb-card">
                <div className="tv-thumb-img-wrap">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="tv-thumb-img"
                  />
                </div>
                <div className="tv-thumb-caption">
                  {item.title}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  /* ===== RENDER VIDEO SLIDER/LIST ===== */
  const renderVideoGallery = () => {
    if (isMobile) {
      return (
        <div className="tv-mobile-list">
          {videoAlbums.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="tv-thumb-card"
              onClick={() => handleVideoClick(item.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="tv-thumb-img-wrap tv-thumb-video-wrap">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="tv-thumb-img"
                />
                <div className="tv-thumb-play">▶</div>
              </div>
              <div className="tv-thumb-caption">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Grid]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        slidesPerView={4}
        slidesPerGroup={1}
        grid={{ rows: 2, fill: "row" }}
        spaceBetween={24}
        rewind
        className="tv-swiper"
      >
        {videoAlbums.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="tv-thumb-card"
              onClick={() => handleVideoClick(item.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="tv-thumb-img-wrap tv-thumb-video-wrap">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="tv-thumb-img"
                />
                <div className="tv-thumb-play">▶</div>
              </div>
              <div className="tv-thumb-caption">
                {item.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  /* ===== RENDER PAGE ===== */
  return (
    <div className="wrapper">
      <div className="tv-media-inner">
        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <a href="/" className="home-link">
            <FaHome className="icon-home" /> TRANG CHỦ
          </a>
          <span className="sep">/</span>
          <span className="current">Thư viện</span>
        </div>

        {/* ============== THƯ VIỆN ẢNH ============== */}
        {featuredPhoto && (
          <section className="tv-section">
            <h1 className="tv-title">THƯ VIỆN ẢNH</h1>

            <div
              className="tv-feature-row"
              onClick={handleFeatureClick}
              style={{ cursor: "pointer" }}
            >
              <div className="tv-feature-left">
                <div className="tv-main-photo">
                  <img
                    src={featuredPhoto.imageUrl}
                    alt={featuredPhoto.title}
                  />
                </div>
              </div>

              <div className="tv-feature-right">
                <div className="tv-highlight-box">
                  <div className="tv-highlight-header">
                    <h2 className="tv-highlight-label">Ảnh nổi bật</h2>
                  </div>
                  <h3 className="tv-highlight-title">
                    {featuredPhoto.title}
                  </h3>
                  <p className="tv-highlight-text">
                    {featuredPhotoIntro}
                  </p>
                </div>
              </div>
            </div>

            <div className="tv-slider-wrapper">
              {renderPhotoGallery()}
            </div>
          </section>
        )}

        {/* ============== THƯ VIỆN VIDEO ============== */}
        {featuredVideo && (
          <section className="tv-section tv-video-section">
            <h2 className="tv-title">THƯ VIỆN VIDEO</h2>

            <div
              className="tv-feature-row"
              onClick={() => handleVideoClick(featuredVideo.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="tv-feature-left">
                <div className="tv-main-video">
                  <img
                    src={featuredVideo.imageUrl}
                    alt={featuredVideo.title}
                  />
                  <div className="tv-video-play-icon">▶</div>
                </div>
              </div>

              <div className="tv-feature-right">
                <div className="tv-highlight-box">
                  <div className="tv-highlight-header">
                    <h2 className="tv-highlight-label">Video nổi bật</h2>
                  </div>
                  <h3 className="tv-highlight-title">
                    {featuredVideo.title}
                  </h3>
                  <p className="tv-highlight-text">
                    {featuredVideoIntro}
                  </p>
                </div>
              </div>
            </div>

            <div className="tv-slider-wrapper">
              {renderVideoGallery()}
            </div>
          </section>
        )}
      </div>

      <CustomerSection />
    </div>
  );
}