import CKEditorClassic from "../../../components/CKEditorClassic";

export default function BacSiSectionForm({ section, onChange, onDelete }) {
  return (
    <div className="admin-news-card">
      <div className="media-inline-header">
        <strong>Nội dung</strong>
        <button
          className="media-btn danger sm"
          onClick={onDelete}
        >
          ✕ Xóa
        </button>
      </div>

      <input
        className="admin-news-input"
        placeholder="Tiêu đề"
        value={section.title}
        onChange={(e) =>
          onChange({ ...section, title: e.target.value })
        }
      />

      <CKEditorClassic
        value={section.content}
        onChange={(val) =>
          onChange({ ...section, content: val })
        }
      />
    </div>
  );
}
