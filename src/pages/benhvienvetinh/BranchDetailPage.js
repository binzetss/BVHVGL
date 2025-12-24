// src/pages/benhvienvetinh/BranchDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BranchDetailPage.css";
import { FaHome } from "react-icons/fa";
import { API_BASE } from "../../config";

export default function BranchDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(null);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // ID = 1 → giới thiệu BV
    if (Number(id) === 1) {
      navigate("/gioi-thieu");
      return;
    }

    fetch(`${API_BASE}/api/branches/${id}/detail`)
      .then((res) => res.json())
      .then(setDetail)
      .catch(() => setDetail(null));

    fetch(`${API_BASE}/api/branches`)
      .then((res) => res.json())
      .then(setBranches);
  }, [id, navigate]);

  if (!detail) {
    return (
      <div className="branch-wrapper">
        <h2>Không tìm thấy thông tin cơ sở.</h2>
      </div>
    );
  }

  return (
    <div className="branch-wrapper">
      <div className="branch-container">
        {/* LEFT */}
        <div className="branch-left">
          <div className="breadcrumb">
            <span className="link" onClick={() => navigate("/")}>
              <FaHome /> Trang chủ
            </span>
            <span className="sep">/</span>
            <span
              className="link"
              onClick={() => navigate("/benh-vien-ve-tinh")}
            >
              Hệ thống cơ sở
            </span>
            <span className="sep">/</span>
            <span className="current">{detail.name}</span>
          </div>

          <h1 className="branch-title">{detail.name}</h1>

          {detail.sections?.map((sec, idx) => (
            <section key={idx} className="branch-section">
              {sec.type === "text" && (
                <>
                  <h2 className="branch-subtitle">{sec.title}</h2>
                  <div
                    className="branch-text"
                    dangerouslySetInnerHTML={{ __html: sec.content }}
                  />
                </>
              )}

              {sec.type === "image" && (
                <div className="branch-image-box">
                  <img src={sec.url} alt="" />
                  {sec.caption && (
                    <p className="branch-caption">{sec.caption}</p>
                  )}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* RIGHT */}
        <div className="branch-right">
          <h3 className="branch-right-title">HỆ THỐNG Y TẾ HÙNG VƯƠNG</h3>

          <div className="branch-right-list">
            {branches.map((b, index) => (
              <div
                key={b.id}
                className={
                  "branch-right-item" +
                  (Number(id) === b.id ? " branch-right-item-active" : "")
                }
                onClick={() =>
                  index === 0
                    ? navigate("/gioi-thieu")
                    : navigate(`/co-so/${b.id}`)
                }
              >
                {b.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
