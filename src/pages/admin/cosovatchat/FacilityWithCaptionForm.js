import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";

const PAGE_ID = 1; // ✅ GIỐNG HỆT FacilityPageInfoForm

export default function FacilityWithCaptionForm() {
  const [items, setItems] = useState([]);

  /* ================= LOAD ================= */
  useEffect(() => {
    adminApi(`/api/facility-pages/${PAGE_ID}`)
      .then((data) => {
        setItems(data?.subSectionsWithCaption || []);
      })
      .catch(() => setItems([]));
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
        id: null, // ⚠️ BẮT BUỘC: để Hibernate INSERT
        title: "",
        description: "",
        imageUrl: "",
        imageCaption: "",
      },
    ]);
  };

  /* ================= DELETE ================= */
  const remove = (id) => {
    if (!window.confirm("Xóa slide này?")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  /* ================= SAVE ================= */
  const save = async () => {
    await adminApi(`/api/facility-pages/${PAGE_ID}`, {
      method: "PUT",
      body: {
        subSectionsWithCaption: items,
      },
    });

    alert("Lưu slider thành công!");
  };

  return (
    <div className="admin-news-card mt-4">
      <h5 className="admin-news-title">
        Slider (Có caption ảnh)
      </h5>

      <button
        className="btn btn-success btn-sm mb-3"
        onClick={addNew}
      >
        + Thêm slide
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
              update(
                item.id,
                "description",
                e.target.value
              )
            }
          />

          <input
            className="admin-news-input mb-2"
            placeholder="URL ảnh"
            value={item.imageUrl || ""}
            onChange={(e) =>
              update(
                item.id,
                "imageUrl",
                e.target.value
              )
            }
          />

          <input
            className="admin-news-input mb-2"
            placeholder="Caption ảnh"
            value={item.imageCaption || ""}
            onChange={(e) =>
              update(
                item.id,
                "imageCaption",
                e.target.value
              )
            }
          />

          <button
            className="btn btn-danger btn-sm mt-2"
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
        Lưu toàn bộ slider
      </button>
    </div>
  );
}
