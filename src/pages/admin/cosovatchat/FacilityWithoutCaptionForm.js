import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";

export default function FacilityWithoutCaptionForm() {
  /* ===== PAGE INFO (SECTION TEXT) ===== */
  const [pageInfo, setPageInfo] = useState({
    equipmentTitle: "",
    equipmentDescription: "",
  });

  /* ===== SLIDER ITEMS ===== */
  const [items, setItems] = useState([]);

  /* ================= LOAD ================= */
  const load = async () => {
    const data = await adminApi("/api/facility-pages/1");

    setPageInfo({
      equipmentTitle: data?.equipmentTitle || "",
      equipmentDescription: data?.equipmentDescription || "",
    });

    setItems(data?.subSectionsWithoutCaption || []);
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= UPDATE ITEM ================= */
  const updateItem = (id, field, value) => {
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
        id: null, // ⚠️ để Hibernate INSERT
        title: "",
        description: "",
        imageUrl: "",
      },
    ]);
  };

  /* ================= REMOVE ================= */
  const remove = (id) => {
    if (!window.confirm("Xóa thiết bị này?")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  /* ================= SAVE ALL ================= */
  const save = async () => {
    await adminApi("/api/facility-pages/1", {
      method: "PUT",
      body: {
        equipmentTitle: pageInfo.equipmentTitle,
        equipmentDescription: pageInfo.equipmentDescription,
        subSectionsWithoutCaption: items,
      },
    });

    alert("Lưu trang thiết bị y khoa thành công!");
    load();
  };

  return (
    <div className="admin-news-card mt-4">
      <h5 className="admin-news-title">
        Trang thiết bị y khoa
      </h5>

      {/* ===== SECTION TEXT ===== */}
      <input
        className="admin-news-input mb-2"
        placeholder="Tiêu đề trang thiết bị y khoa"
        value={pageInfo.equipmentTitle}
        onChange={(e) =>
          setPageInfo({
            ...pageInfo,
            equipmentTitle: e.target.value,
          })
        }
      />

      <textarea
        className="admin-news-input mb-3"
        rows={3}
        placeholder="Mô tả trang thiết bị y khoa"
        value={pageInfo.equipmentDescription}
        onChange={(e) =>
          setPageInfo({
            ...pageInfo,
            equipmentDescription: e.target.value,
          })
        }
      />

      <hr />

      {/* ===== SLIDER ===== */}
      <button
        className="btn btn-success btn-sm mb-3"
        onClick={addNew}
      >
        + Thêm thiết bị
      </button>

      {items.map((item, index) => (
        <div
          key={item.id ?? `new-${index}`}
          className="admin-news-card mb-3"
        >
          <input
            className="admin-news-input mb-2"
            placeholder="Tiêu đề thiết bị"
            value={item.title || ""}
            onChange={(e) =>
              updateItem(item.id, "title", e.target.value)
            }
          />

          <textarea
            className="admin-news-input mb-2"
            placeholder="Mô tả"
            value={item.description || ""}
            onChange={(e) =>
              updateItem(
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
              updateItem(item.id, "imageUrl", e.target.value)
            }
          />

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
        Lưu toàn bộ trang thiết bị y khoa
      </button>
    </div>
  );
}
