import React from "react";
import CKEditorClassic from "../../../components/CKEditorClassic";

export default function QMSectionForm({ section, onChange, onDelete }) {
  if (section.type === "text") {
    return (
      <div className="admin-news-card">
        <div className="media-inline-header">
          <strong>Nội dung văn bản</strong>
          <button className="media-btn danger sm" onClick={onDelete}>
            ✕ Xóa
          </button>
        </div>

        <input
          className="admin-news-input"
          placeholder="Tiêu đề"
          value={section.title || ""}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
        />

        <CKEditorClassic
          value={section.content || ""}
          onChange={(val) => onChange({ ...section, content: val })}
        />
      </div>
    );
  }

  if (section.type === "image") {
    return (
      <div className="admin-news-card">
        <div className="media-inline-header">
          <strong>Hình ảnh</strong>
          <button className="media-btn danger sm" onClick={onDelete}>
            ✕ Xóa
          </button>
        </div>

        <input
          className="admin-news-input"
          placeholder="URL hình ảnh"
          value={section.url || ""}
          onChange={(e) => onChange({ ...section, url: e.target.value })}
        />

        {section.url && (
          <img
            src={section.url}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              marginTop: "10px",
              borderRadius: "4px",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}

        <input
          className="admin-news-input mt-2"
          placeholder="Chú thích (tuỳ chọn)"
          value={section.caption || ""}
          onChange={(e) => onChange({ ...section, caption: e.target.value })}
        />
      </div>
    );
  }

  return null;
}
