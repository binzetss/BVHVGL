import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./QualityManagement.css";
import { API_BASE } from "../../config";

export default function QualityListPage() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(`${API_BASE}/api/quality-management`)
      .then((res) => res.json())
      .then((data) => setList(data || []))
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  return (
    <div className="qm-list-wrapper">
      <div className="qm-list-container">
        <div className="breadcrumb">
          <a href="/" className="home-link">
            <FaHome className="icon-home" /> TRANG CHỦ
          </a>
          <span className="sep">/</span>
          <span className="current">QUẢN LÝ CHẤT LƯỢNG</span>
        </div>

        <h1 className="qm-list-title">QUẢN LÝ CHẤT LƯỢNG</h1>

        <div className="qm-list-grid">
          {list.map((item) => (
            <div
              key={item.id}
              className="qm-list-item"
              onClick={() => navigate(`/quan-ly-chat-luong/${item.id}`)}
            >
              <p className="qm-list-name">{item.title}</p>
              {item.shortDesc && (
                <p className="qm-list-desc">{item.shortDesc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
