import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";
import NewsDetailFormPage from "./NewsDetailFormPage";

export default function AdminNewsFormPage() {
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);

  const emptyNews = {
    id: "",
    categoryId: "",
    title: "",
    summary: "",
    thumbnailUrl: "",
    featured: false,
    author: "",
    date: "",
  };

  const [form, setForm] = useState(emptyNews);

  /* LOAD CATEGORY */
  useEffect(() => {
    fetch(`${API_BASE}/api/news/categories`)
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  /* LOAD LIST */
  const loadList = (catId) => {
    setSelectedCat(catId);
    setSelectedNews(null);

    if (!catId) return;

    fetch(`${API_BASE}/api/news/category/${catId}`)
      .then((res) => res.json())
      .then((json) => {
        const items = [...(json.featured ? [json.featured] : []), ...json.items];
        setList(items);
      });
  };

  /* SELECT NEWS */
  const selectNews = (n) => {
    setForm(n);
    setSelectedNews(n.id);
  };

  /* ADD NEW */
  const addNew = () => {
    setForm({
      ...emptyNews,
      categoryId: selectedCat,
    });
    setSelectedNews(null);
  };

  /* SAVE — FULL FIX */
  const save = () => {
    if (!form.categoryId) return alert("Chọn nhóm tin!");

    fetch(`${API_BASE}/api/news`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((saved) => {
        alert("Lưu thành công!");

        // UPDATE FORM + SELECTED NEWS
        setForm(saved);
        setSelectedNews(saved.id);

        // Reload danh sách
        loadList(saved.categoryId);
      });
  };

  /* DELETE */
  const del = (id) => {
    if (!window.confirm("Xóa bài viết này?")) return;

    fetch(`${API_BASE}/api/news/${id}`, { method: "DELETE" }).then(() =>
      loadList(selectedCat)
    );
  };

  return (
    <div className="admin-news-wrapper">

      <h2 className="admin-news-title-main">Quản lý tin tức</h2>

      {/* CATEGORY SELECT */}
      <div className="admin-news-card">
        <label className="admin-news-label">Nhóm tin:</label>

        <div className="admin-select-wrapper">
          <select
            className="admin-select"
            value={selectedCat}
            onChange={(e) => loadList(e.target.value)}
          >
            <option value="">-- Chọn nhóm tin --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <span className="admin-select-icon">▼</span>
        </div>
      </div>

      {/* LIST */}
      {selectedCat && (
        <div className="admin-news-card">
          <div className="admin-news-between">
            <h3 className="admin-news-title">Danh sách bài viết</h3>

            <button className="btn btn-success" onClick={addNew}>
              + Thêm bài viết
            </button>
          </div>

          {list.map((n) => (
            <div key={n.id} className="admin-news-item">
              <div
                onClick={() => selectNews(n)}
                className="admin-news-item-left"
              >
                <strong className="admin-news-item-title">{n.title}</strong>
                <div className="admin-news-item-date">{n.date}</div>
              </div>

              <button className="btn btn-sm btn-danger" onClick={() => del(n.id)}>
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}

      {/* FORM */}
      {(form.categoryId || form.id) && (
        <div className="admin-news-card">
          <h5 className="admin-news-title-small">Thông tin bài viết</h5>

          <input
            className="admin-news-input mb-2"
            placeholder="Tiêu đề"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="admin-news-input mb-2"
            placeholder="Mô tả ngắn"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
          />

          <input
            className="admin-news-input mb-2"
            placeholder="URL Thumbnail"
            value={form.thumbnailUrl}
            onChange={(e) =>
              setForm({ ...form, thumbnailUrl: e.target.value })
            }
          />

          <input
            className="admin-news-input mb-2"
            placeholder="Tên tác giả"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />

          <label className="admin-news-checkbox">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm({ ...form, featured: e.target.checked })
              }
            />
            Bài nổi bật
          </label>

          <button className="btn btn-primary" onClick={save}>
            Lưu bài viết
          </button>
        </div>
      )}

      {form.id && <NewsDetailFormPage newsId={form.id} />}
    </div>
  );
}
