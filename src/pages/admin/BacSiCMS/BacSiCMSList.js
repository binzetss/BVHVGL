import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";
import { useNavigate } from "react-router-dom";
import "./bacSiCMS.css";

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

export default function BacSiAdminList() {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    adminApi("/api/admin/bac-si/list").then(setList);
  }, []);

  const filtered = list.filter((bs) => {
    const k = normalize(keyword);
    return (
      normalize(bs.hoVaTen).includes(k) ||
      normalize(bs.maSo).includes(k)
    );
  });

  return (
    <div className="admin-card">
      <h3>Quản lý nội dung bác sĩ</h3>

      <input
        className="admin-news-input"
        placeholder="Tìm theo mã số hoặc tên"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <table className="admin-table mt-2">
        <thead>
          <tr>
            <th>Mã số</th>
            <th>Họ tên</th>
            <th>Chức danh</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((bs) => (
            <tr key={bs.maSo}>
              <td>{bs.maSo}</td>
              <td>{bs.hoVaTen}</td>
              <td>{bs.chucDanhTen}</td>
              <td>
                <button
                  className="media-btn outline sm"
                  onClick={() =>
                    navigate(`/admin/bac-si/${bs.maSo}`)
                  }
                >
                  Nhập nội dung
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
