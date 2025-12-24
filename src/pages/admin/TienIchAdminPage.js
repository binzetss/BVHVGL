// src/pages/admin/tienich/TienIchAdminPage.js
import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";
import TienIchDetailFormPage from "./TienIchDetailFormPage";

export default function TienIchAdminPage() {
  const emptyForm = {
    id: null,
    name: "",
    shortDesc: "",
    heroImage: "",
    date: "",
  };

  const [list, setList] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [selectedId, setSelectedId] = useState(null);

  const loadList = () => {
    fetch(`${API_BASE}/api/tien-ich`)
      .then((res) => res.json())
      .then(setList);
  };

  useEffect(() => {
    loadList();
  }, []);

  const selectItem = (item) => {
    setForm(item);
    setSelectedId(item.id);
  };

  const addNew = () => {
    setForm({ ...emptyForm });
    setSelectedId(null);
  };

  const save = () => {
    fetch(`${API_BASE}/api/tien-ich`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(form),
    }).then(() => {
      alert("Lưu tiện ích thành công!");
      loadList();
    });
  };

  const del = (id) => {
    if (!window.confirm("Xóa tiện ích này?")) return;
    fetch(`${API_BASE}/api/tien-ich/${id}`, { method: "DELETE" }).then(loadList);
  };

  return (
    <div className="admin-news-wrapper">
      <h2 className="admin-news-title-main">Quản lý Tiện Ích</h2>

      {/* ===== LIST ===== */}
      <div className="admin-news-card">
        <div className="admin-news-between">
          <h3 className="admin-news-title">Danh sách tiện ích</h3>
          <button className="btn btn-success" onClick={addNew}>
            + Thêm tiện ích
          </button>
        </div>

    {Array.isArray(list) && list.map((item) => (
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

      {/* ===== FORM HEADER ===== */}
      <div className="admin-news-card">
        <h5 className="admin-news-title-small">Thông tin tiện ích</h5>

        <input
          className="admin-news-input mb-2"
          placeholder="Tên tiện ích"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
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

        <button className="btn btn-primary" onClick={save}>
          Lưu tiện ích
        </button>
      </div>

      {/* ===== DETAIL ===== */}
      {selectedId && <TienIchDetailFormPage tienIchId={selectedId} />}
    </div>
  );
}
