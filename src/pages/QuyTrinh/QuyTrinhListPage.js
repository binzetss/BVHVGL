// src/pages/QuyTrinh/QuyTrinhListPage.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./QuyTrinhListPage.css";
import { API_BASE } from "../../config";

export default function QuyTrinhListPage() {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/workflow`)
      .then((res) => res.json())
      .then((json) => setList(json))
      .catch(() => setList([]));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/quy-trinh/${id}`);
  };

  const displayList = showAll ? list : list.slice(0, 4);

  return (
    <div className="wrapper">
      <div className="workflow-wrapper">
        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <Link to="/" className="home-link">
            <FaHome className="icon-home" /> TRANG CHỦ
          </Link>
          <span className="sep">&gt;</span>
          <span className="current">quy trình khám bệnh</span>
        </div>

        {/* HEADER */}
        <div className="workflow-header-box">
          <h1 className="workflow-title">QUY TRÌNH KHÁM BỆNH</h1>
          <p className="workflow-intro">
            Quý khách vui lòng tham khảo các quy trình khám bệnh dưới đây để
            chuẩn bị hồ sơ, giấy tờ và sắp xếp thời gian phù hợp trước khi đến
            bệnh viện.
          </p>
        </div>

        {/* DANH SÁCH QUY TRÌNH */}
        <div className="workflow-cards">
          {displayList.map((item, index) => (
            <div
              key={item.id}
              className="workflow-card"
              onClick={() => handleCardClick(item.id)}
            >
              <div className="workflow-card-image">
                <img src={item.heroImage} alt={item.name} />
              </div>

              <div className="workflow-card-content">
                <div className="workflow-card-top">
                  <div className="workflow-card-tag">
                    QUY TRÌNH {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="workflow-card-title">{item.name}</h3>
                  <p className="workflow-card-desc">{item.shortDesc}</p>
                </div>

                <div className="workflow-card-bottom">
                  <span className="workflow-card-link">Xem chi tiết &gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        {list.length > 4 && (
          <div className="workflow-show-more">
            <button
              className="workflow-more-btn"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Thu gọn danh sách ↑" : "Xem tất cả quy trình →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
