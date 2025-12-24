import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import BacSiSectionForm from "./BacSiSectionForm";
import "./bacSiCMS.css";

export default function BacSiAdminDetail() {
  const { maSo } = useParams();

  const [info, setInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [sections, setSections] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!maSo) return;

    const load = async () => {
      try {
        setLoading(true);

        /* ===== CMS CONTENT (WEBSITE DB) ===== */
        const d = await adminApi(`/api/admin/bac-si/${maSo}/content`);

        setAvatarUrl(d?.avatarUrl || "");
        setSections(d?.sections || []);   // 🔥 MULTI SECTION
        setImages(d?.images || []);

        /* ===== INFO BÁC SĨ (NSCL_2022 – READ ONLY) ===== */
        const infoRes = await adminApi(`/api/bac-si/${maSo}`);
        setInfo(infoRes);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [maSo]);

  /* ================= SAVE ================= */
  const save = async () => {
    if (!maSo) return;

    await adminApi(`/api/admin/bac-si/${maSo}/content`, {
      method: "PUT",
      body: {
        avatarUrl,
        sections: sections.map((s, idx) => ({
          ...s,
          sortOrder: idx, // 🔥 QUAN TRỌNG: thứ tự hiển thị
        })),
        images,
      },
    });

    alert("Đã lưu nội dung bác sĩ");
  };

  /* ================= UI ================= */
  if (!maSo) {
    return <div className="admin-card">Không tìm thấy mã bác sĩ</div>;
  }

  if (loading) {
    return <div className="admin-card">Đang tải dữ liệu…</div>;
  }

  if (!info) {
    return <div className="admin-card">Không tìm thấy bác sĩ</div>;
  }

  return (
    <div className="admin-card">
      <h3>{info.hoVaTen}</h3>
      <p>
        {info.chucDanhTen} – Mã số: {info.maSo}
      </p>

      {/* ===== AVATAR ===== */}
      <input
        className="admin-news-input"
        placeholder="Link ảnh đại diện bác sĩ"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />

      {/* ===== SECTIONS ===== */}
      <h4>Nội dung hiển thị</h4>

      {sections.map((s, idx) => (
        <BacSiSectionForm
          key={s.id || idx}
          section={s}
          onChange={(val) =>
            setSections(sections.map((x, i) => (i === idx ? val : x)))
          }
          onDelete={() =>
            setSections(sections.filter((_, i) => i !== idx))
          }
        />
      ))}

      <button
        className="media-btn outline sm"
        onClick={() =>
          setSections([
            ...sections,
            {
              id: Date.now(),
              title: "",
              content: "",
            },
          ])
        }
      >
        + Thêm section
      </button>

      {/* ===== IMAGES ===== */}
      <h4 className="mt-3">Ảnh bác sĩ làm việc</h4>

      {images.map((img, idx) => (
        <div key={img.id || idx} className="media-inline-header">
          <input
            className="admin-news-input"
            placeholder="Link ảnh"
            value={img.imageUrl || ""}
            onChange={(e) =>
              setImages(
                images.map((x, i) =>
                  i === idx ? { ...x, imageUrl: e.target.value } : x
                )
              )
            }
          />
          <button
            className="media-btn danger sm"
            onClick={() =>
              setImages(images.filter((_, i) => i !== idx))
            }
          >
            ✕
          </button>
        </div>
      ))}

      <button
        className="media-btn outline sm"
        onClick={() =>
          setImages([...images, { id: Date.now(), imageUrl: "" }])
        }
      >
        + Thêm ảnh hoạt động
      </button>

      <button className="media-btn primary mt-3" onClick={save}>
        Lưu toàn bộ
      </button>
    </div>
  );
}
