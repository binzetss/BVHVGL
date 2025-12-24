import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";
import { API_BASE } from "../../../config";

export default function CooperationAdminForm() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const data = await adminApi("/api/cooperation-items");
    setItems(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const update = (id, field, value) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, [field]: value } : i
      )
    );
  };

  const addNew = () => {
    setItems((prev) => [
      ...prev,
      {
        id: null,
        title: "",
        description: "",
        imageUrl: "",
        orderIndex: prev.length,
      },
    ]);
  };

const remove = async (index) => {
  const item = items[index];
  if (!window.confirm("Xóa mục hợp tác này?")) return;


  if (item.id) {
    await adminApi(`/api/cooperation-items/${item.id}`, {
      method: "DELETE",
    });
  }


  setItems((prev) => prev.filter((_, i) => i !== index));
};

  const move = (index, dir) => {
    const newItems = [...items];
    const target = index + dir;
    if (target < 0 || target >= newItems.length) return;

    [newItems[index], newItems[target]] =
      [newItems[target], newItems[index]];

    setItems(
      newItems.map((item, i) => ({
        ...item,
        orderIndex: i,
      }))
    );
  };

  const save = async () => {
    await adminApi("/api/cooperation-items", {
      method: "PUT",
      body: items.map((item, i) => ({
        ...item,
        orderIndex: i,
      })),
    });

    alert("Lưu danh sách hợp tác thành công!");
    load();
  };

  return (
    <div className="admin-news-card">
      <h5 className="admin-news-title">
        Hợp tác & Đào tạo chuyên sâu
      </h5>

      <button
        className="btn btn-success btn-sm mb-3"
        onClick={addNew}
      >
        + Thêm hợp tác
      </button>

      {items.map((item, index) => (
        <div
          key={item.id ?? `new-${index}`}
          className="admin-news-card mb-3"
        >
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
            rows={3}
            placeholder="Mô tả"
            value={item.description || ""}
            onChange={(e) =>
              update(item.id, "description", e.target.value)
            }
          />

          <input
            className="admin-news-input mb-2"
            placeholder="URL ảnh"
            value={item.imageUrl || ""}
            onChange={(e) =>
              update(item.id, "imageUrl", e.target.value)
            }
          />

          {item.imageUrl && (
            <img
              src={
                item.imageUrl.startsWith("http")
                  ? item.imageUrl
                  : `${API_BASE}${item.imageUrl}`
              }
              alt=""
              style={{
                width: "180px",
                borderRadius: 8,
                marginBottom: 8,
              }}
            />
          )}

          <div className="d-flex gap-2">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => move(index, -1)}
            >
              ↑
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => move(index, 1)}
            >
              ↓
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => remove(index)}
            >
              Xóa
            </button>
          </div>
        </div>
      ))}

      <button
        className="btn btn-primary mt-3"
        onClick={save}
      >
        Lưu toàn bộ
      </button>
    </div>
  );
}
