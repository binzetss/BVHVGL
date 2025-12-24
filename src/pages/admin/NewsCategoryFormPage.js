import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";

export default function NewsCategoryFormPage() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);

  const emptyCategory = {
    id: "",
    name: "",
    description: "",
    sortOrder: 0,
  };

  const [form, setForm] = useState(emptyCategory);

  const load = () => {
    fetch(`${API_BASE}/api/news/categories`)
      .then((res) => res.json())
      .then(setCategories);
  };

  useEffect(load, []);

  const save = () => {
    fetch(`${API_BASE}/api/news/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(form),
    }).then(() => {
      alert("Lưu thành công!");
      setForm(emptyCategory);
      setEditing(null);
      load();
    });
  };

  /* ===============================
     DELETE CATEGORY – FIX VERSION
     =============================== */
  const del = (id) => {
    if (!window.confirm("Xóa nhóm tin này?")) return;

    fetch(`${API_BASE}/api/news/categories/${id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          alert(msg); // Hiển thị thông báo từ BE
          return;
        }

        alert("Xóa thành công!");
        load();
      })
      .catch(() => alert("Có lỗi xảy ra!"));
  };

  return (
    <div className="admin-news-wrapper">
      <h2 className="admin-news-title-main">Quản lý nhóm tin tức</h2>

      {/* FORM ADD/EDIT */}
      <div className="admin-news-card">
        <h5 className="admin-news-title-small">
          {editing ? "Chỉnh sửa nhóm tin" : "Thêm nhóm tin mới"}
        </h5>

        <input
          className="admin-news-input mb-2"
          placeholder="Tên nhóm tin"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="admin-news-input mb-2"
          placeholder="Mô tả nhóm tin"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="admin-news-input mb-3"
          placeholder="Thứ tự"
          type="number"
          value={form.sortOrder}
          onChange={(e) =>
            setForm({ ...form, sortOrder: Number(e.target.value) })
          }
        />

        <button className="btn btn-success" onClick={save}>
          {editing ? "Cập nhật" : "Thêm mới"}
        </button>
      </div>

      {/* LIST */}
      <div className="admin-news-card">
        <h5 className="admin-news-title">Danh sách nhóm tin</h5>

        {categories.map((c) => (
          <div key={c.id} className="admin-news-item">
            <div>
              <strong className="admin-news-item-title">{c.name}</strong>
              <div className="admin-news-item-date">{c.description}</div>
            </div>

            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => {
                  setEditing(true);
                  setForm(c);
                }}
              >
                Sửa
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => del(c.id)}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
