import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";

export default function AdminPriceDetailFormPage({ priceId }) {
  const [sections, setSections] = useState([]);

  /* ===== LOAD DETAIL ===== */
  useEffect(() => {
    if (!priceId) return;

    fetch(`${API_BASE}/api/price/${priceId}/detail`)
      .then((res) => res.json())
      .then((data) => setSections(data.sections || []));
  }, [priceId]);

  /* ===== ADD ===== */
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

  /* ===== UPDATE ===== */
  const update = (i, field, value) => {
    setSections((prev) => {
      const arr = [...prev];
      arr[i] = { ...arr[i], [field]: value };
      return arr;
    });
  };

  const remove = (i) => {
    if (!window.confirm("Xóa mục này?")) return;
    setSections((prev) => prev.filter((_, idx) => idx !== i));
  };

  /* ===== SAVE ===== */
  const save = () => {
    fetch(`${API_BASE}/api/price/${priceId}/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ sections }),
    }).then(() => alert("Lưu nội dung bảng giá thành công!"));
  };

  return (
    <div className="admin-news-card">
      <h4 className="admin-news-title-small">
        Nội dung chi tiết bảng giá
      </h4>

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
                onChange={(e) =>
                  update(i, "title", e.target.value)
                }
              />
              <textarea
                className="admin-news-input mb-2"
                placeholder="Nội dung"
                value={s.content || ""}
                onChange={(e) =>
                  update(i, "content", e.target.value)
                }
              />
            </>
          ) : (
            <>
              <input
                className="admin-news-input mb-2"
                placeholder="URL hình ảnh"
                value={s.url || ""}
                onChange={(e) =>
                  update(i, "url", e.target.value)
                }
              />
              <input
                className="admin-news-input mb-2"
                placeholder="Chú thích ảnh"
                value={s.caption || ""}
                onChange={(e) =>
                  update(i, "caption", e.target.value)
                }
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
