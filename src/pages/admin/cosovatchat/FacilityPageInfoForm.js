import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";

export default function FacilityPageInfoForm() {
  const [form, setForm] = useState({
    id: null,
    title: "",
    content: "",
    author: "",
    publishDate: "",
  });

  useEffect(() => {
    adminApi("/api/facility-pages/1")
      .then((data) => data && setForm(data))
      .catch(() => {});
  }, []);

  const save = async () => {
    await adminApi("/api/facility-pages/1", {
      method: "PUT",
      body: form,
    });
    alert("Lưu thông tin trang thành công!");
  };

  return (
    <div className="admin-news-card">
      <h5 className="admin-news-title">Thông tin trang</h5>

      <input
        className="admin-news-input mb-2"
        placeholder="Tiêu đề trang"
        value={form.title || ""}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        className="admin-news-input mb-2"
        rows={4}
        placeholder="Nội dung giới thiệu"
        value={form.content || ""}
        onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        }
      />

      <div className="d-flex gap-2">
        <input
          className="admin-news-input"
          placeholder="Tác giả"
          value={form.author || ""}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
        />

        <input
          className="admin-news-input"
          type="date"
          value={form.publishDate || ""}
          onChange={(e) =>
            setForm({
              ...form,
              publishDate: e.target.value,
            })
          }
        />
      </div>

      <button className="btn btn-success mt-2" onClick={save}>
        Lưu thông tin
      </button>
    </div>
  );
}
