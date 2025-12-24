import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./TienIchListPage.css";
import { API_BASE } from "../../config";

export default function TienIchListPage() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/tien-ich`)
      .then((res) => res.json())
      .then(setList)
      .catch(() => setList([]));
  }, []);

  const displayList = showAll ? list : list.slice(0, 4);

  return (
    <div className="wrapper">
      <div className="tienich-wrapper">
        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <Link to="/" className="home-link">
            <FaHome /> TRANG CHỦ
          </Link>
          <span className="sep">&gt;</span>
          <span className="current">tiện ích</span>
        </div>

        {/* HEADER */}
        <div className="tienich-header-box">
          <h1 className="tienich-title">TIỆN ÍCH</h1>
          <p className="tienich-intro">
            Các tiện ích được bố trí trong khuôn viên bệnh viện.
          </p>
        </div>

        {/* LIST */}
        <div className="tienich-cards">
          {displayList.map((item, idx) => (
            <div
              key={item.id}
              className="tienich-card"
              onClick={() => navigate(`/tien-ich/${item.id}`)}
            >
              <div className="tienich-card-image">
                <img src={item.heroImage} alt={item.name} />
              </div>

              <div className="tienich-card-content">
                <div className="tienich-card-top">
                  <div className="tienich-card-tag">
                    TIỆN ÍCH {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="tienich-card-title">{item.name}</h3>
                  <p className="tienich-card-desc">{item.shortDesc}</p>
                </div>

                <div className="tienich-card-bottom">
                  <span className="tienich-card-link">
                    Xem chi tiết &gt;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {list.length > 4 && (
          <div className="tienich-show-more">
            <button
              className="tienich-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Thu gọn ↑" : "Xem tất cả →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
