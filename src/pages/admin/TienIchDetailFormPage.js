import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";

export default function TienIchDetailFormPage({ tienIchId }) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!tienIchId) return;

    fetch(`${API_BASE}/api/tien-ich/${tienIchId}/detail`)
      .then((res) => res.json())
      .then((data) => setSections(data.sections || []));
  }, [tienIchId]);

  const addText = () => {
    setSections((prev) => [
      ...prev,
      {
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
        type: "image",
        url: "",
        caption: "",
        sortOrder: prev.length + 1,
      },
    ]);
  };

  const update = (i, field, value) => {
    const arr = [...sections];
    arr[i] = { ...arr[i], [field]: value };
    setSections(arr);
  };

  const remove = (i) => {
    if (!window.confirm("Xóa mục này?")) return;
    setSections((prev) => prev.filter((_, idx) => idx !== i));
  };

  const save = () => {
    fetch(`${API_BASE}/api/tien-ich/${tienIchId}/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ sections }),
    }).then(() => alert("Lưu thành công"));
  };

  return (
    <div className="admin-news-card">
      <h4 className="admin-news-title-small">Nội dung chi tiết</h4>

      {sections.map((s, i) => (
        <div key={i} className="admin-detail-item">
          <div className="admin-news-between mb-2">
            <strong>
              {s.type === "text" ? "Khối văn bản" : "Khối hình ảnh"}
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
        + Văn bản
      </button>
      <button className="btn btn-secondary me-2" onClick={addImage}>
        + Hình ảnh
      </button>

      <button className="btn btn-primary mt-3" onClick={save}>
        Lưu
      </button>
    </div>
  );
}
