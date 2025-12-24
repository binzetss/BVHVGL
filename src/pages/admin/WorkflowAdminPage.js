// src/pages/admin/WorkflowAdminPage.js
import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";
import WorkflowDetailFormPage from "./WorkflowDetailFormPage";

export default function WorkflowAdminPage() {
  const emptyWorkflow = {
    id: null,
    name: "",
    shortDesc: "",
    heroImage: "",
    mainTitle: "",
    mainText: "",
    date: "",
  };

  const [list, setList] = useState([]);
  const [form, setForm] = useState(emptyWorkflow);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadList = () => {
    fetch(`${API_BASE}/api/workflow`)
      .then((res) => res.json())
      .then(setList);
  };

  useEffect(() => {
    loadList();
  }, []);

  const selectItem = (item) => {
    setForm(item);
    setSelectedId(item.id);
    setShowForm(true);
  };

  const addNew = () => {
    setForm({ ...emptyWorkflow });
    setSelectedId(null);
    setShowForm(true);
  };

  const save = () => {
    fetch(`${API_BASE}/api/workflow`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(form),
    }).then(() => {
      alert("Lưu thành công!");
      loadList();
    });
  };

  const del = (id) => {
    if (!window.confirm("Xóa quy trình này?")) return;
    fetch(`${API_BASE}/api/workflow/${id}`, { method: "DELETE" }).then(loadList);
  };

  return (
    <div className="admin-news-wrapper">
      <h2 className="admin-news-title-main">Quản lý Quy Trình Khám Bệnh</h2>

      <div className="admin-news-card">
        <div className="admin-news-between">
          <h3 className="admin-news-title">Danh sách quy trình</h3>
          <button className="btn btn-success" onClick={addNew}>
            + Thêm quy trình
          </button>
        </div>

        {list.map((item) => (
          <div key={item.id} className="admin-news-item">
            <div
              onClick={() => selectItem(item)}
              className="admin-news-item-left"
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

      {showForm && (
        <div className="admin-news-card">
          <h5 className="admin-news-title-small">Thông tin quy trình</h5>

          <input
            className="admin-news-input mb-2"
            placeholder="Tên quy trình"
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
            placeholder="URL ảnh Hero"
            value={form.heroImage}
            onChange={(e) =>
              setForm({ ...form, heroImage: e.target.value })
            }
          />

          <button className="btn btn-primary" onClick={save}>
            Lưu quy trình
          </button>
        </div>
      )}

      {selectedId && <WorkflowDetailFormPage workflowId={selectedId} />}
    </div>
  );
}
