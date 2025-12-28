import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./DepartmentList.css";
import { getDeptIcon } from "../../utils/getDeptIcon";
import { API_BASE } from "../../config";

export default function DepartmentListPage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(`${API_BASE}/api/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("API ERROR:", err));
  }, []);
  const HIDDEN_DEPT_IDS = [1, 9, 13];
  return (
    <div className="dp-wrapper">
      <div className="dp-container">
        <div className="breadcrumb">
          <a href="/" className="home-link">
            <FaHome className="icon-home" /> TRANG CHỦ
          </a>
          <span className="sep">/</span>
          <span className="current">DANH SÁCH CHUYÊN KHOA</span>
        </div>

        <h1 className="dp-title">DANH SÁCH CHUYÊN KHOA</h1>

        <div className="dp-grid">
          {departments
            .filter((item) => !HIDDEN_DEPT_IDS.includes(item.id))
            .map((item) => (
              <div
                key={item.id}
                className="dp-item"
                onClick={() => navigate(`/chuyen-khoa/${item.id}`)}
              >
                <img
                  src={getDeptIcon(item.name)}
                  alt={item.name}
                  className="dp-icon"
                />
                <p className="dp-name">{item.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
