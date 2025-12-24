import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";

export default function HistoryTimelineForm() {
  const [items, setItems] = useState([]);

  /* ================= LOAD ================= */
  const load = async () => {
    const data = await adminApi("/api/history-timeline");
    setItems(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= UPDATE FIELD ================= */
  const update = (id, field, value) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, [field]: value } : i
      )
    );
  };

  /* ================= ADD ================= */
  const addNew = () => {
    setItems((prev) => [
      ...prev,
      {
        id: null,              // ⚠️ bắt buộc null để INSERT
        year: "",
        title: "",
        content: "",
        imageUrl: "",
        orderIndex: prev.length + 1,
      },
    ]);
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    if (!id) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }

    if (!window.confirm("Xóa mốc lịch sử này?")) return;

    await adminApi(`/api/history-timeline/${id}`, {
      method: "DELETE",
    });

    load();
  };

  /* ================= SAVE ================= */
  const save = async () => {
    for (const item of items) {
      if (!item.year) continue;

      if (item.id) {
        await adminApi(`/api/history-timeline/${item.id}`, {
          method: "PUT",
          body: item,
        });
      } else {
        await adminApi("/api/history-timeline", {
          method: "POST",
          body: item,
        });
      }
    }

    alert("Lưu lịch sử hình thành thành công!");
    load();
  };

  return (
    <div className="admin-news-card">
      <h5 className="admin-news-title">Lịch sử hình thành</h5>

      <button
        className="btn btn-success btn-sm mb-3"
        onClick={addNew}
      >
        + Thêm mốc thời gian
      </button>

      {items.map((item, index) => (
        <div
          key={item.id ?? `new-${index}`}
          className="admin-news-card mb-3"
        >
          <div className="d-flex gap-2 mb-2">
            <input
              className="admin-news-input"
              type="number"
              placeholder="Năm (VD: 2024)"
              value={item.year || ""}
              onChange={(e) =>
                update(item.id, "year", e.target.value)
              }
            />

            <input
              className="admin-news-input"
              type="number"
              placeholder="Thứ tự hiển thị"
              value={item.orderIndex || ""}
              onChange={(e) =>
                update(item.id, "orderIndex", e.target.value)
              }
            />
          </div>

          <input
            className="admin-news-input mb-2"
            placeholder="Tiêu đề"
            value={item.title || ""}
            onChange={(e) =>
              update(item.id, "title", e.target.value)
            }
          />

          <textarea
            className="admin-news-input mb-2"
            rows={4}
            placeholder="Nội dung mô tả"
            value={item.content || ""}
            onChange={(e) =>
              update(item.id, "content", e.target.value)
            }
          />

          <input
            className="admin-news-input mb-2"
            placeholder="URL ảnh (https://...)"
            value={item.imageUrl || ""}
            onChange={(e) =>
              update(item.id, "imageUrl", e.target.value)
            }
          />

          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt=""
              style={{
                width: "100%",
                maxHeight: 220,
                objectFit: "cover",
                borderRadius: 6,
                marginBottom: 8,
              }}
            />
          )}

          <button
            className="btn btn-danger btn-sm"
            onClick={() => remove(item.id)}
          >
            Xóa
          </button>
        </div>
      ))}

      <button
        className="btn btn-primary mt-2"
        onClick={save}
      >
        Lưu toàn bộ lịch sử
      </button>
    </div>
  );
}
