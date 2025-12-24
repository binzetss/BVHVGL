import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";
import { useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import iconCalendar1 from "../../assets/tintuc/calendar1.png";
import iconCalendar from "../../assets/tintuc/calendar1.png";
import iconUser from "../../assets/tintuc/user.png";
import iconView from "../../assets/tintuc/view.png";

import likeIcon from "../../assets/tintuc/like.png";
import likeIcon2 from "../../assets/tintuc/like2.png";
import dislikeIcon from "../../assets/tintuc/disslike.png";
import dislikeIcon2 from "../../assets/tintuc/disslike2.png";

import "./newsDetail.css";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [sections, setSections] = useState([]);
  const [related, setRelated] = useState([]);
  const [reaction, setReaction] = useState(null);

  const handleLike = () => {
    setReaction((prev) => (prev === "like" ? null : "like"));
  };

  const handleDislike = () => {
    setReaction((prev) => (prev === "dislike" ? null : "dislike"));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(`${API_BASE}/api/news/${id}`)
      .then((res) => res.json())
      .then((n) => {
        setNews(n);

        fetch(`${API_BASE}/api/news/${id}/detail`)
          .then((res) => res.json())
          .then((d) => setSections(d.sections || []));

        fetch(`${API_BASE}/api/news/category/${n.categoryId}`)
          .then((res) => res.json())
          .then((json) => {
            const list = [json.featured, ...json.items].filter(
              (x) => x && x.id != id
            );
            setRelated(list);
          });
      });
  }, [id]);

  if (!news) return <p>Đang tải...</p>;

  return (
    <div className="nd-wrapper">
      <div className="nd-container">
        <div className="nd-left">
          {/* BREADCRUMB */}
          <div className="breadcrumb">
            <span onClick={() => navigate("/")} className="link">
              <FaHome className="icon-home" /> Trang chủ
            </span>
            <span className="sep">/</span>
            <span onClick={() => navigate("/tin-tuc")} className="link">
              Tin tức
            </span>
            <span className="sep">/</span>
            <span className="current">{news.title}</span>
          </div>

          {/* MAIN MENU (NỘI DUNG CHÍNH) */}

          {/* TITLE */}
          <h1 className="nd-title">{news.title}</h1>

          {/* DATE + AUTHOR */}
          <p className="nd-date">
            <img src={iconCalendar1} className="nd-date-icon" alt="" />
            {news.date}

            <span className="nd-author">
              <img src={iconUser} className="nd-author-icon" alt="" />
              {news.author}
            </span>
          </p>
          {/* <div className="nd-main-menu">
            <span className="nd-main-icon">☰</span>
            Nội dung chính
          </div> */}
          {/* HERO IMAGE */}
          {news.thumbnailUrl && (
            <div className="nd-image-box">
              <img src={news.thumbnailUrl} className="nd-image" alt="" />
            </div>
          )}

          {/* CONTENT SECTIONS */}
          {sections.map((sec, i) => (
            <div key={i} className="nd-content-block">
              {sec.type === "text" && (
                <>
                  <h2 className="nd-subtitle">{sec.title}</h2>
                  <div
                    className="nd-content"
                    dangerouslySetInnerHTML={{ __html: sec.content }}
                  />
                </>
              )}

              {sec.type === "image" && (
                <div className="nd-image-box">
                  <img src={sec.url} className="nd-image" alt="" />
                  {sec.caption && <p className="nd-caption">{sec.caption}</p>}
                </div>
              )}
            </div>
          ))}

          {/* FOOTER (VIEWS + LIKE / DISLIKE) */}
          <div className="nd-bottom">
            <div className="nd-views-box">
              <img src={iconView} className="nd-icon" alt="" />
              <span className="nd-views-number">{news.views}</span>
            </div>

            <div className="nd-react-group">
              <button className="nd-react-btn" onClick={handleLike}>
                <img
                  src={reaction === "like" ? likeIcon2 : likeIcon}
                  className="nd-icon-sm"
                  alt="like"
                />
              </button>

              <button className="nd-react-btn" onClick={handleDislike}>
                <img
                  src={reaction === "dislike" ? dislikeIcon2 : dislikeIcon}
                  className="nd-icon-sm"
                  alt="dislike"
                />
              </button>

              <span className="nd-help-text">Bài viết hữu ích?</span>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="nd-right">
          <h3 className="nd-right-title">TIN TỨC LIÊN QUAN</h3>

          {related.map((r) => (
            <div
              key={r.id}
              className="nd-right-item"
              onClick={() => navigate(`/tin-tuc/${r.id}`)}
            >
              <img src={r.thumbnailUrl} className="nd-right-thumb" alt="" />
              <div className="nd-right-info">
                <div className="nd-right-item-title">{r.title}</div>
                <div className="nd-right-item-date">
                  <img
                    src={iconCalendar}
                    className="nd-date-icon"
                    alt="calendar"
                  />
                  {r.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
