import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";
import "./albumcss.css";

export default function MediaAlbumDetailForm({ album }) {
  const isVideo = album?.mediaType === "VIDEO";

  /* ===== GIỮ NGUYÊN NHƯ BAN ĐẦU ===== */
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const [sections, setSections] = useState([]);
  const [images, setImages] = useState([]);

  /* ===== FEATURE IMAGE ===== */
  const [featureImage, setFeatureImage] = useState("");

  /* ===== VIDEO ===== */
  const [videoType, setVideoType] = useState("URL");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoEmbed, setVideoEmbed] = useState("");

  /* ===== UI ===== */
  const [openImages, setOpenImages] = useState(true);
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [folderLink, setFolderLink] = useState("");
  const [collapseFolderImages, setCollapseFolderImages] = useState(true);

  /* ================= LOAD ALBUM ================= */
  useEffect(() => {
    if (!album) return;
    setIsFeatured(!!album.isFeatured);
    setFeatureImage(album.imageUrl || "");
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

  /* ================= LOAD FOLDER BY LINK ================= */
  const handleLoadFolderByLink = async () => {
    try {
      if (!folderLink.includes("/images/")) {
        alert("Link folder không hợp lệ");
        return;
      }

      const url = new URL(folderLink);
      const base = url.origin;
      const path = decodeURIComponent(url.pathname.split("/images/")[1]);

      const apiUrl = `${base}/api/folder/media?path=${encodeURIComponent(
        path
      )}&recursive=true`;

      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!Array.isArray(data.media)) {
        alert("Không lấy được ảnh");
        return;
      }

      setImages(
        data.media.map((p) => ({
          id: Math.random(),
          imageUrl: `${base}/images/${p}`,
        }))
      );

      setCollapseFolderImages(true);
      setShowFolderInput(false);
      setFolderLink("");
    } catch (err) {
      console.error(err);
      alert("Lỗi load folder ảnh");
    }
  };

  /* ================= DELETE ALL IMAGES ================= */
  const deleteAllImages = () => {
    if (!window.confirm("Xóa toàn bộ ảnh khỏi album? (xóa DB)")) return;
    setImages([]);
    setCollapseFolderImages(true);
  };

  /* ================= SAVE ================= */
  const save = async () => {
    try {
      await adminApi("/api/media-albums/albums", {
        method: "PUT",
        body: {
          id: album.id,
          title: album.title,
          mediaType: album.mediaType,
          imageUrl: featureImage,
          isFeatured,
        },
      });

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

  if (!album) return null;

  return (
    <div className="admin-news-card">
      <h5>
        Chi tiết {album.mediaType}: {album.title}
      </h5>

      {/* ===== GIỮ NGUYÊN ĐÚNG NHƯ BAN ĐẦU ===== */}
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

      {/* ===== FEATURE IMAGE ===== */}
      <h6>Ảnh nổi bật</h6>
      <input
        className="admin-news-input"
        placeholder="Link ảnh nổi bật"
        value={featureImage}
        onChange={(e) => setFeatureImage(e.target.value)}
      />

      {/* ================= IMAGES ================= */}
      <div className="media-collapse">
        <div
          className="media-collapse-header"
          onClick={() => setOpenImages(!openImages)}
        >
          <div className="media-collapse-title">
            Ảnh ({images.length})
          </div>
        </div>

        {openImages && (
          <div className="media-collapse-body">
            <button
              className="media-btn outline sm"
              onClick={() => setShowFolderInput(true)}
            >
              + Lấy ảnh từ folder
            </button>

            {images.length > 0 && (
              <>
                <button
                  className="media-btn sm"
                  style={{ marginLeft: 8 }}
                  onClick={() =>
                    setCollapseFolderImages(!collapseFolderImages)
                  }
                >
                  {collapseFolderImages ? "Hiện ảnh" : "Thu gọn ảnh"}
                </button>

                <button
                  className="media-btn danger sm"
                  style={{ marginLeft: 8 }}
                  onClick={deleteAllImages}
                >
                  🗑️ Xóa toàn bộ ảnh
                </button>
              </>
            )}

            {!collapseFolderImages &&
              images.map((img) => (
                <input
                  key={img.id}
                  className="admin-news-input"
                  style={{ marginTop: 8 }}
                  value={img.imageUrl}
                  onChange={(e) =>
                    setImages(
                      images.map((x) =>
                        x.id === img.id
                          ? { ...x, imageUrl: e.target.value }
                          : x
                      )
                    )
                  }
                />
              ))}
          </div>
        )}
      </div>

      <button className="media-btn primary mt-3" onClick={save}>
        Lưu chi tiết
      </button>

      {/* ===== MODAL ===== */}
      {showFolderInput && (
        <div className="media-modal">
          <div className="media-modal-content">
            <h4>Nhập link folder ảnh</h4>
            <input
              className="admin-news-input"
              placeholder="https://image.bvhvgl.com/images/..."
              value={folderLink}
              onChange={(e) => setFolderLink(e.target.value)}
            />
            <div style={{ marginTop: 10 }}>
              <button
                className="media-btn primary sm"
                onClick={handleLoadFolderByLink}
              >
                Lấy ảnh
              </button>
              <button
                className="media-btn sm"
                onClick={() => setShowFolderInput(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
