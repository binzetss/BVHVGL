import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewsSection.css";

import { LazyImage } from "../LazyImage/LazyImage";
import Lichicon from "../../assets/calendar1.png";

import { API_BASE } from "../../config";

export default function NewsSection() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [newsData, setNewsData] = useState({});

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    fetch(`${API_BASE}/api/news/categories`)
      .then((res) => res.json())
      .then((cats) => {
        const first3 = cats.slice(0, 3);
        setCategories(first3);

        first3.forEach((cat) => {
          fetch(`${API_BASE}/api/news/category/${cat.id}`)
            .then((res) => res.json())
            .then((json) => {
              setNewsData((prev) => ({
                ...prev,
                [cat.id]: json,
              }));
            });
        });
      });
  }, []);

  // ======================
  // NAVIGATION
  // ======================
  const openDetail = (id) => {
    navigate(`/tin-tuc/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ======================
  // UTIL: FORMAT DATE dd/mm/yyyy
  // ======================
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ======================
  // DATA PROCESSING
  // ======================
  const sortByDateDesc = (items = []) =>
    [...items].sort((a, b) => new Date(b.date) - new Date(a.date));

  // gom toàn bộ bài từ 3 category
  const allItems = categories.flatMap((cat) => newsData[cat.id]?.items || []);

  // sort theo ngày
  const sortedItems = sortByDateDesc(allItems);

  // mapping theo layout
  const bigNews = sortedItems[0]; // 1 bài to
  const list = sortedItems.slice(1, 5); // 5 bài nhỏ

  // ======================
  // RENDER
  // ======================
  return (
    <div className="news-wrapper">
      <h2 className="news-title">TIN TỨC VÀ SỰ KIỆN</h2>

      <div className="news-grid">
        {/* LEFT BIG NEWS */}
        {bigNews && (
          <div className="news-big" onClick={() => openDetail(bigNews.id)}>
            <LazyImage
              src={bigNews.thumbnailUrl}
              alt={bigNews.title}
              className="news-big-img"
            />

            <div className="news-big-text">
              <h3>{bigNews.title}</h3>
              <p>{bigNews.summary}</p>
            </div>

            <div className="news-big-footer">
              <div className="news-big-line"></div>
              <div className="news-big-date">
                <span className="news-date-icon">
                  <LazyImage src={Lichicon} alt="calendar" />
                </span>
                {formatDate(bigNews.date)}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT LIST (KHÔNG HIỂN THỊ NGÀY) */}
        <div className="news-list">
          {list.map((item) => (
            <div
              className="news-item"
              key={item.id}
              onClick={() => openDetail(item.id)}
            >
              <LazyImage
                src={item.thumbnailUrl}
                alt={item.title}
                className="news-item-img"
              />

              <div className="news-item-content">
                <h4>{item.title}</h4>
                <p>{item.summary}</p>

                <div className="news-item-link">
                  <span>XEM CHI TIẾT</span>
                
                </div>
              </div>
            </div>
          ))}

          <div className="news-btn-right">
            <button className="news-btn" onClick={() => navigate("/tin-tuc")}>
              XEM THÊM TẤT CẢ TIN TỨC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
