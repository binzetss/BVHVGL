// ==========================
// AlbumSuKienDetailVideo.jsx
// ==========================
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { publicApi } from "../../api/publicApi";
import CustomerSection from "../../components/CustomerSection/CustomerSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./AlbumSuKienDetailVideo.css";

export default function AlbumSuKienDetailVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const [data, setData] = useState(null);
  const [otherVideos, setOtherVideos] = useState([]);

  useEffect(() => {
    publicApi(`/api/media/albums/${id}/detail`).then(setData);
  }, [id]);

  useEffect(() => {
    publicApi("/api/media/albums?type=VIDEO").then((res) => {
      setOtherVideos((res || []).filter((v) => v.id !== numericId));
    });
  }, [numericId]);

  if (!data) return null;

  return (
    <div className="vd-wrapper">
      <div className="vd-inner">
        <h1 className="vd-title">{data.title}</h1>

        {data.intro && (
          <div
            className="vd-description"
            dangerouslySetInnerHTML={{ __html: data.intro }}
          />
        )}

        {data.videoType === "URL" && data.videoUrl && (
          <div className="vd-video-wrapper">
            <div className="vd-video-card">
              <div className="vd-video-ratio">
                <video src={data.videoUrl} controls playsInline />
              </div>
            </div>
          </div>
        )}

        {data.videoType === "EMBED" && data.videoEmbed && (
          <div className="vd-video-wrapper">
            <div className="vd-video-card">
              <div
                className="vd-video-ratio"
                dangerouslySetInnerHTML={{ __html: data.videoEmbed }}
              />
            </div>
          </div>
        )}

        {Array.isArray(data.sections) && data.sections.length > 0 && (
          <div className="vd-description">
            {data.sections.map((s, idx) => (
              <div key={idx}>
                {s.heading && <h3>{s.heading}</h3>}
                {s.bullets && (
                  <div
                    dangerouslySetInnerHTML={{ __html: s.bullets }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {Array.isArray(data.images) && data.images.length > 0 && (
          <div className="vd-images">
            {data.images.map(
              (img, idx) =>
                img.imageUrl && (
                  <img key={idx} src={img.imageUrl} alt="" />
                )
            )}
          </div>
        )}

        {/* ===== OTHER VIDEOS SLIDER ===== */}
        <section style={{ marginTop: 48 }}>
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={4}
            spaceBetween={18}
            loop
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              992: { slidesPerView: 4 },
            }}
          >
            {otherVideos.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="vd-video-card"
                  onClick={() =>
                    navigate(`/thu-vien/video/${item.id}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="vd-video-ratio">
                    <img
                      src={item.imageUrl}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>

      <CustomerSection />
    </div>
  );
}
