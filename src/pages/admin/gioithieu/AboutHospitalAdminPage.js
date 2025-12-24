import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";
import CKEditorClassic from "../../../components/CKEditorClassic";

export default function AboutHospitalAdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ===== LOAD CURRENT DATA ===== */
  useEffect(() => {
    adminApi("/api/about-hospital").then((data) => {
      if (!data) return;
      setTitle(data.title || "");
      setContent(data.content || "");
      setIsActive(true);
    });
  }, []);

  /* ===== SAVE ===== */
  const save = async () => {
    if (!content.trim()) {
      alert("Vui lòng nhập nội dung");
      return;
    }

    try {
      setSaving(true);

      await adminApi("/api/admin/about-hospital", {
        method: "PUT",
        body: {
          title,
          content,
          isActive,
        },
      });

      alert("Đã lưu nội dung giới thiệu");
    } catch (err) {
      console.error(err);
      alert("Lưu thất bại");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-news-card">
      <h5>Giới thiệu Bệnh viện</h5>

      {/* TITLE */}
      <input
        className="admin-news-input"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* CKEDITOR */}
      <div style={{ marginTop: 12 }}>
        <CKEditorClassic
          value={content}
          onChange={setContent}
        />
      </div>

      {/* ACTIVE */}
      <label className="admin-news-checkbox mt-2">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Nội dung đang hiển thị
      </label>

      {/* SAVE */}
      <button
        className="media-btn primary mt-3"
        onClick={save}
        disabled={saving}
      >
        {saving ? "Đang lưu..." : "Lưu nội dung"}
      </button>
    </div>
  );
}
