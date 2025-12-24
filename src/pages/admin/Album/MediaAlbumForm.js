import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";

export default function MediaAlbumForm({ album, onSaved }) {
  const isEdit = !!album?.id;

  const [form, setForm] = useState({
    title: "",
    mediaType: "PHOTO",
    imageUrl: "",
    isFeatured: false,
  });
  const [saving, setSaving] = useState(false);

  /* ===== LOAD ALBUM TO EDIT ===== */
  useEffect(() => {
    if (!album) {
      setForm({
        title: "",
        mediaType: "PHOTO",
        imageUrl: "",
        isFeatured: false,
      });
      return;
    }

    setForm({
      title: album.title || "",
      mediaType: album.mediaType || "PHOTO",
      imageUrl: album.imageUrl || "",
      isFeatured: !!album.isFeatured,
    });
  }, [album]);

  /* ===== SAVE ===== */
  const save = async () => {
    if (!form.title.trim()) {
      alert("Vui lòng nhập tiêu đề album");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: form.title,
        mediaType: form.mediaType,
        imageUrl: form.imageUrl,
        isFeatured: !!form.isFeatured,
      };

      if (isEdit) {
        // 🔁 UPDATE
        await adminApi(`/api/media-albums/albums/${album.id}`, {
          method: "PUT",
          body: payload,
        });
        alert("Đã cập nhật album");
      } else {
        // ➕ CREATE
        await adminApi("/api/media-albums/albums", {
          method: "PUT",
          body: payload,
        });
        alert("Đã tạo album");
      }

      onSaved();
    } catch (err) {
      console.error(err);
      alert("Lưu album thất bại");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-news-card">
      <h5>
        {isEdit ? "✏️ Chỉnh sửa Album" : "➕ Tạo Album"}
      </h5>

      <input
        className="admin-news-input"
        placeholder="Tiêu đề album"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <select
        className="admin-news-input"
        value={form.mediaType}
        onChange={(e) =>
          setForm({ ...form, mediaType: e.target.value })
        }
        disabled={isEdit} // thường không cho đổi type
      >
        <option value="PHOTO">PHOTO</option>
        <option value="VIDEO">VIDEO</option>
      </select>

      <input
        className="admin-news-input"
        placeholder="Ảnh cover (URL)"
        value={form.imageUrl}
        onChange={(e) =>
          setForm({ ...form, imageUrl: e.target.value })
        }
      />

      <label style={{ display: "block", marginTop: 6 }}>
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={(e) =>
            setForm({ ...form, isFeatured: e.target.checked })
          }
        />{" "}
        Album nổi bật
      </label>

      <button
        className="btn btn-primary mt-2"
        onClick={save}
        disabled={saving}
      >
        {saving
          ? "Đang lưu..."
          : isEdit
          ? "Cập nhật"
          : "Tạo album"}
      </button>

      {isEdit && (
        <button
          className="btn btn-outline-secondary mt-2 ms-2"
          onClick={() => onSaved()}
        >
          Hủy
        </button>
      )}
    </div>
  );
}
