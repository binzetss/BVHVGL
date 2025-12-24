import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";

export default function SponsorAdminForm() {
  const [items, setItems] = useState([]);

  /* ================= LOAD ================= */
  const load = async () => {
    const data = await adminApi("/api/sponsors");
    setItems(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= UPDATE ================= */
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
        id: null, // ⚠️ BẮT BUỘC để Hibernate INSERT
        name: "",
        imageUrl: "",
        orderIndex: prev.length,
      },
    ]);
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    if (!window.confirm("Xóa nhà tài trợ này?")) return;

    if (id) {
      await adminApi(`/api/sponsors/${id}`, {
        method: "DELETE",
      });
    }

    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  /* ================= SAVE ================= */
  const save = async () => {
    await adminApi("/api/sponsors", {
      method: "PUT",
      body: items,
    });

    alert("Lưu nhà tài trợ thành công!");
    load(); // reload lại từ DB
  };

  return (
    <div className="admin-news-card">
      <h5 className="admin-news-title">
        Quản lý Nhà tài trợ
      </h5>

      <button
        className="btn btn-success btn-sm mb-3"
        onClick={addNew}
      >
        + Thêm nhà tài trợ
      </button>

      {items.map((item, index) => (
        <div
          key={item.id ?? `new-${index}`}
          className="admin-news-card mb-3"
        >
          <input
            className="admin-news-input mb-2"
            placeholder="Tên nhà tài trợ (admin quản lý)"
            value={item.name || ""}
            onChange={(e) =>
              update(item.id, "name", e.target.value)
            }
          />

          <input
            className="admin-news-input mb-2"
            placeholder="URL logo"
            value={item.imageUrl || ""}
            onChange={(e) =>
              update(item.id, "imageUrl", e.target.value)
            }
          />

          <input
            className="admin-news-input mb-2"
            type="number"
            placeholder="Thứ tự hiển thị"
            value={item.orderIndex ?? 0}
            onChange={(e) =>
              update(
                item.id,
                "orderIndex",
                Number(e.target.value)
              )
            }
          />

          {/* Preview logo */}
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt=""
              style={{
                maxWidth: 200,
                marginBottom: 10,
                borderRadius: 6,
                border: "1px solid #ddd",
              }}
            />
          )}

          <div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => remove(item.id)}
            >
              Xóa
            </button>
          </div>
        </div>
      ))}

      <button
        className="btn btn-primary mt-2"
        onClick={save}
      >
        Lưu toàn bộ nhà tài trợ
      </button>
    </div>
  );
}
