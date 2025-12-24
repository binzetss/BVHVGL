import React, { useEffect, useState } from "react";
import { API_BASE } from "../../../config";

export default function BranchFormPage({ onSelect }) {
  const empty = {
    id: "",
    name: "",
    shortDesc: "",
    image: "",
    detailPath: "",

    // ===== CONTACT INFO =====
    address: "",
    hotline: "",
    emergency: "",
    workingTime: "",
    license: "",
    mapSrc: "",
  };

  const [form, setForm] = useState(empty);
  const [list, setList] = useState([]);

  /* ================= LOAD ================= */
  const load = () => {
    fetch(`${API_BASE}/api/branches`)
      .then((res) => res.json())
      .then(setList);
  };

  useEffect(load, []);

  /* ================= SAVE ================= */
  const save = () => {
    fetch(`${API_BASE}/api/branches`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(form),
    }).then(() => {
      alert("Lưu cơ sở thành công!");
      setForm(empty);
      load();
    });
  };

  /* ================= DELETE ================= */
  const del = (id) => {
    if (!window.confirm("Xóa cơ sở này?")) return;

    fetch(`${API_BASE}/api/branches/${id}`, {
      method: "DELETE",
    }).then(() => {
      alert("Đã xóa!");
      load();
    });
  };

  /* ================= UI ================= */
  return (
    <div className="admin-news-card">
      <h5 className="admin-news-title-small">Quản lý cơ sở</h5>

      {/* ===== BASIC INFO ===== */}
      <input
        className="admin-news-input mb-2"
        placeholder="Tên cơ sở"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        className="admin-news-input mb-2"
        placeholder="Mô tả ngắn"
        value={form.shortDesc}
        onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
      />

      <input
        className="admin-news-input mb-2"
        placeholder="URL hình ảnh"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <input
        className="admin-news-input mb-3"
        placeholder="Detail path (vd: /co-so/3)"
        value={form.detailPath}
        onChange={(e) => setForm({ ...form, detailPath: e.target.value })}
      />

      {/* ===== CONTACT INFO ===== */}
      <hr />

      <input
        className="admin-news-input mb-2"
        placeholder="Địa chỉ"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <input
        className="admin-news-input mb-2"
        placeholder="Hotline"
        value={form.hotline}
        onChange={(e) => setForm({ ...form, hotline: e.target.value })}
      />

      <input
        className="admin-news-input mb-2"
        placeholder="Số cấp cứu"
        value={form.emergency}
        onChange={(e) => setForm({ ...form, emergency: e.target.value })}
      />

      <input
        className="admin-news-input mb-2"
        placeholder="Giờ làm việc"
        value={form.workingTime}
        onChange={(e) => setForm({ ...form, workingTime: e.target.value })}
      />

      <textarea
        className="admin-news-input mb-2"
        placeholder="Thông tin giấy phép"
        value={form.license}
        onChange={(e) => setForm({ ...form, license: e.target.value })}
      />

      <input
        className="admin-news-input mb-3"
        placeholder="Google Map src (iframe src)"
        value={form.mapSrc}
        onChange={(e) => setForm({ ...form, mapSrc: e.target.value })}
      />

      <button className="btn btn-success mb-4" onClick={save}>
        {form.id ? "Cập nhật" : "Thêm mới"}
      </button>

      {/* ===== LIST ===== */}
      <h5 className="admin-news-title">Danh sách cơ sở</h5>

      {list.map((b) => (
        <div key={b.id} className="admin-news-item">
          <div>
            <strong className="admin-news-item-title">{b.name}</strong>
            <div className="admin-news-item-date">{b.shortDesc}</div>
          </div>

          <div>
            <button
              className="btn btn-sm btn-info me-2"
              onClick={() => onSelect(b.id)}
            >
              Nội dung
            </button>

            <button
              className="btn btn-sm btn-warning me-2"
              onClick={() => setForm({ ...empty, ...b })}
            >
              Sửa
            </button>

            <button className="btn btn-sm btn-danger" onClick={() => del(b.id)}>
              Xóa
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
