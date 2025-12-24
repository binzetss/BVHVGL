import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";
import AdminPriceDetailFormPage from "./AdminPriceDetailFormPage";

export default function AdminPricePage() {
  const emptyPrice = {
    id: null,
    name: "",
    shortDesc: "",
    heroImage: "",
    mainTitle: "",
    mainText: "",
    date: "",
  };

  const [list, setList] = useState([]);
  const [form, setForm] = useState(emptyPrice);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  /* ===== LOAD LIST ===== */
  const loadList = () => {
    fetch(`${API_BASE}/api/price`)
      .then((res) => res.json())
      .then(setList);
  };

  useEffect(() => {
    loadList();
  }, []);

  /* ===== ACTIONS ===== */
  const selectItem = (item) => {
    setForm(item);
    setSelectedId(item.id);
    setShowForm(true);
  };

  const addNew = () => {
    setForm({ ...emptyPrice });
    setSelectedId(null);
    setShowForm(true);
  };

  const save = () => {
    fetch(`${API_BASE}/api/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(form),
    }).then(() => {
      alert("Lưu bảng giá thành công!");
      loadList();
    });
  };

  const del = (id) => {
    if (!window.confirm("Xóa bảng giá này?")) return;
    fetch(`${API_BASE}/api/price/${id}`, { method: "DELETE" })
      .then(loadList);
  };

  return (
    <div className="admin-news-wrapper">
      <h2 className="admin-news-title-main">Quản lý Bảng Giá</h2>

      {/* ===== LIST ===== */}
      <div className="admin-news-card">
        <div className="admin-news-between">
          <h3 className="admin-news-title">Danh sách bảng giá</h3>
          <button className="btn btn-success" onClick={addNew}>
            + Thêm bảng giá
          </button>
        </div>

        {list.map((item) => (
          <div key={item.id} className="admin-news-item">
            <div
              className="admin-news-item-left"
              onClick={() => selectItem(item)}
            >
              <strong>{item.name}</strong>
              <div className="admin-news-item-date">{item.date}</div>
            </div>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => del(item.id)}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      {/* ===== HEADER FORM ===== */}
      {showForm && (
        <div className="admin-news-card">
          <h5 className="admin-news-title-small">Thông tin bảng giá</h5>

          <input
            className="admin-news-input mb-2"
            placeholder="Tên bảng giá"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <textarea
            className="admin-news-input mb-2"
            placeholder="Mô tả ngắn"
            value={form.shortDesc}
            onChange={(e) =>
              setForm({ ...form, shortDesc: e.target.value })
            }
          />

          <input
            className="admin-news-input mb-2"
            placeholder="URL ảnh Hero"
            value={form.heroImage}
            onChange={(e) =>
              setForm({ ...form, heroImage: e.target.value })
            }
          />

          {/* <input
            className="admin-news-input mb-2"
            placeholder="Tiêu đề chính"
            value={form.mainTitle || ""}
            onChange={(e) =>
              setForm({ ...form, mainTitle: e.target.value })
            }
          />

          <textarea
            className="admin-news-input mb-2"
            placeholder="Nội dung chính"
            value={form.mainText || ""}
            onChange={(e) =>
              setForm({ ...form, mainText: e.target.value })
            }
          /> */}

          <button className="btn btn-primary" onClick={save}>
            Lưu bảng giá
          </button>
        </div>
      )}

      {/* ===== DETAIL ===== */}
      {selectedId && (
        <AdminPriceDetailFormPage priceId={selectedId} />
      )}
    </div>
  );
}
