// src/pages/admin/WorkflowDetailFormPage.js
import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";

export default function WorkflowDetailFormPage({ workflowId }) {
  const [sections, setSections] = useState([]);

  /* LOAD SECTIONS */
  useEffect(() => {
    if (!workflowId) return;

    fetch(`${API_BASE}/api/workflow/${workflowId}/detail`)
      .then((res) => res.json())
      .then((data) => setSections(data.sections || []));
  }, [workflowId]);

  const addText = () => {
    setSections((prev) => [
      ...prev,
      {
        id: null,
        type: "text",
        title: "",
        content: "",
        sortOrder: prev.length + 1,
      },
    ]);
  };

  const addImage = () => {
    setSections((prev) => [
      ...prev,
      {
        id: null,
        type: "image",
        url: "",
        caption: "",
        sortOrder: prev.length + 1,
      },
    ]);
  };

  const update = (index, field, value) => {
    setSections((prev) => {
      const arr = [...prev];
      arr[index] = { ...arr[index], [field]: value };
      return arr;
    });
  };

  const remove = (index) => {
    if (!window.confirm("Xóa mục này?")) return;
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const save = () => {
    fetch(`${API_BASE}/api/workflow/${workflowId}/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ sections }),
    }).then(() => alert("Lưu nội dung thành công!"));
  };

  return (
    <div className="admin-news-card">
      <h4 className="admin-news-title-small">Nội dung chi tiết</h4>

      {sections.map((s, i) => (
        <div key={i} className="admin-detail-item">
          <div className="admin-news-between mb-2">
            <strong>
              {s.type === "text" ? "Khối Văn Bản" : "Khối Hình Ảnh"}
            </strong>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => remove(i)}
            >
              Xóa
            </button>
          </div>

          {s.type === "text" ? (
            <>
              <input
                className="admin-news-input mb-2"
                placeholder="Tiêu đề"
                value={s.title || ""}
                onChange={(e) => update(i, "title", e.target.value)}
              />
              <textarea
                className="admin-news-input mb-2"
                placeholder="Nội dung"
                value={s.content || ""}
                onChange={(e) => update(i, "content", e.target.value)}
              />
            </>
          ) : (
            <>
              <input
                className="admin-news-input mb-2"
                placeholder="URL hình ảnh"
                value={s.url || ""}
                onChange={(e) => update(i, "url", e.target.value)}
              />
              <input
                className="admin-news-input mb-2"
                placeholder="Chú thích"
                value={s.caption || ""}
                onChange={(e) => update(i, "caption", e.target.value)}
              />
            </>
          )}

          <input
            className="admin-news-input mb-2"
            type="number"
            placeholder="Thứ tự"
            value={s.sortOrder ?? i + 1}
            onChange={(e) =>
              update(i, "sortOrder", Number(e.target.value))
            }
          />
        </div>
      ))}

      <button className="btn btn-secondary me-2" onClick={addText}>
        + Thêm khối văn bản
      </button>
      <button className="btn btn-secondary me-2" onClick={addImage}>
        + Thêm khối hình ảnh
      </button>

      <button className="btn btn-primary mt-3" onClick={save}>
        Lưu thay đổi
      </button>
    </div>
  );
}
