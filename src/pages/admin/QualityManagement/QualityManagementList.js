import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";
import { useNavigate } from "react-router-dom";
import "./qualityManagement.css";

const normalize = (str = "") =>
  str
    .toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d");

export default function QualityManagementList() {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    try {
      const data = await adminApi("/api/admin/quality-management");
      setList(data || []);
    } catch (err) {
      console.error("Failed to load quality management list:", err);
      setList([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;

    try {
      await adminApi(`/api/admin/quality-management/${id}`, {
        method: "DELETE",
      });
      alert("Đã xóa bài viết");
      loadList();
    } catch (err) {
      alert("Xóa thất bại: " + err.message);
    }
  };

  const filtered = list.filter((item) => {
    const k = normalize(keyword);
    return (
      normalize(item.title || "").includes(k) ||
      normalize(item.shortDesc || "").includes(k)
    );
  });

  return (
    <div className="admin-card">
      <h3>Quản lý bài viết Chất lượng</h3>

      <div className="mb-3 d-flex gap-2">
        <input
          className="admin-news-input flex-grow-1"
          placeholder="Tìm theo tiêu đề hoặc mô tả"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="media-btn primary"
          onClick={() => navigate("/admin/quality-management/new")}
        >
          + Tạo mới
        </button>
      </div>

      <table className="admin-table mt-2">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Tiêu đề</th>
            <th style={{ width: "40%" }}>Mô tả ngắn</th>
            <th style={{ width: "20%" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                {keyword ? "Không tìm thấy kết quả" : "Chưa có bài viết nào"}
              </td>
            </tr>
          ) : (
            filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.shortDesc}</td>
                <td>
                  <button
                    className="media-btn outline sm me-2"
                    onClick={() =>
                      navigate(`/admin/quality-management/${item.id}`)
                    }
                  >
                    Sửa
                  </button>
                  <button
                    className="media-btn danger sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
