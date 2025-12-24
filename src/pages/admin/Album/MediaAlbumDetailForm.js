import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./albumcss.css";

export default function MediaAlbumDetailForm({ album }) {
  const isVideo = album?.mediaType === "VIDEO";

  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const [sections, setSections] = useState([]);
  const [images, setImages] = useState([]);

  const [videoType, setVideoType] = useState("URL");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoEmbed, setVideoEmbed] = useState("");

  const [openImages, setOpenImages] = useState(true);
  const [openVideo, setOpenVideo] = useState(true);

  /* ================= LOAD FEATURED FROM ALBUM ================= */
  useEffect(() => {
    if (!album) return;
    setIsFeatured(!!album.isFeatured);
  }, [album]);

  /* ================= LOAD DETAIL ================= */
  useEffect(() => {
    if (!album?.id) return;

    adminApi(`/api/media-albums/albums/${album.id}/detail`).then((data) => {
      if (!data) return;

      setTitle(data.title || "");
      setIntro(data.intro || "");

      setSections(
        (data.sections || []).map((s) => ({
          id: Math.random(),
          heading: s.heading || "",
          bullets: s.bullets || "",
        }))
      );

      setImages(
        (data.images || []).map((img) => ({
          id: Math.random(),
          imageUrl: img.imageUrl || "",
        }))
      );

      setVideoType(data.videoType || "URL");
      setVideoUrl(data.videoUrl || "");
      setVideoEmbed(data.videoEmbed || "");
    });
  }, [album?.id]);

  /* ================= SAVE ================= */
  const save = async () => {
    try {
      /* ===== 1. SAVE ALBUM (FEATURED) ===== */
      await adminApi("/api/media-albums/albums", {
        method: "PUT",
        body: {
          id: album.id,
          title: album.title,
          mediaType: album.mediaType,
          imageUrl: album.imageUrl,
          isFeatured, // 🔥 LƯU ĐÚNG
        },
      });

      /* ===== 2. SAVE DETAIL ===== */
      await adminApi("/api/media-albums/albums/detail", {
        method: "PUT",
        body: {
          albumId: album.id,
          title,
          intro,
          sections,
          images,
          videoType,
          videoUrl: videoType === "URL" ? videoUrl : null,
          videoEmbed: videoType === "EMBED" ? videoEmbed : null,
        },
      });

      alert("Đã lưu chi tiết album");
    } catch (err) {
      console.error(err);
      alert("Lưu thất bại");
    }
  };

  /* ================= DELETE ================= */
  const deleteImage = (id) => {
    if (!window.confirm("Xóa ảnh này?")) return;
    setImages(images.filter((i) => i.id !== id));
  };

  const deleteVideo = () => {
    if (!window.confirm("Xóa video?")) return;
    setVideoUrl("");
    setVideoEmbed("");
  };

  if (!album) return null;

  return (
    <div className="admin-news-card">
      <h5>
        Chi tiết {album.mediaType}: {album.title}
      </h5>

      {/* ===== BASIC INFO ===== */}
      <input
        className="admin-news-input"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="admin-news-input"
        rows={3}
        placeholder="Intro"
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
      />

      {/* ===== FEATURED ===== */}
      <label className="admin-news-checkbox">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        Tin / Album nổi bật
      </label>

      {/* ================= IMAGES ================= */}
      <div className="media-collapse">
        <div
          className="media-collapse-header"
          onClick={() => setOpenImages(!openImages)}
        >
          <div className="media-collapse-title">
            Ảnh ({images.length})
          </div>
          <div className={`media-collapse-arrow ${openImages ? "open" : ""}`}>
            ▶
          </div>
        </div>

        {openImages && (
          <div className="media-collapse-body">
            <button
              className="media-btn outline sm"
              onClick={() =>
                setImages([...images, { id: Math.random(), imageUrl: "" }])
              }
            >
              + Thêm ảnh
            </button>

            {images.map((img) => (
              <div key={img.id} style={{ marginTop: 10 }}>
                <div className="media-inline-header">
                  <strong>Ảnh</strong>
                  <button
                    className="media-btn danger sm"
                    onClick={() => deleteImage(img.id)}
                  >
                    ✕ Xóa
                  </button>
                </div>

                <input
                  className="admin-news-input"
                  placeholder="Link ảnh"
                  value={img.imageUrl}
                  onChange={(e) =>
                    setImages(images.map((x) =>
                      x.id === img.id
                        ? { ...x, imageUrl: e.target.value }
                        : x
                    ))
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= VIDEO ================= */}
      {isVideo && (
        <div className="media-collapse">
          <div
            className="media-collapse-header"
            onClick={() => setOpenVideo(!openVideo)}
          >
            <div className="media-collapse-title">Video</div>

            {(videoUrl || videoEmbed) && (
              <button
                className="media-btn danger sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteVideo();
                }}
              >
                ✕ Xóa
              </button>
            )}

            <div className={`media-collapse-arrow ${openVideo ? "open" : ""}`}>
              ▶
            </div>
          </div>

          {openVideo && (
            <div className="media-collapse-body">
              <select
                className="admin-news-input"
                value={videoType}
                onChange={(e) => setVideoType(e.target.value)}
              >
                <option value="URL">Video URL</option>
                <option value="EMBED">Nhúng iframe</option>
              </select>

              {videoType === "URL" && (
                <input
                  className="admin-news-input"
                  placeholder="Link video"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              )}

              {videoType === "EMBED" && (
                <textarea
                  className="admin-news-input"
                  rows={4}
                  placeholder="Iframe embed"
                  value={videoEmbed}
                  onChange={(e) => setVideoEmbed(e.target.value)}
                />
              )}
            </div>
          )}
        </div>
      )}

      <button className="media-btn primary mt-3" onClick={save}>
        Lưu chi tiết
      </button>
    </div>
  );
}
