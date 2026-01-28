import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";
import "./QualityManagement.css";
import { FaHome } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

export default function QualityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

 
    fetch(`${API_BASE}/api/quality-management/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load quality detail:", err);
        setLoading(false);
      });


    fetch(`${API_BASE}/api/quality-management`)
      .then((res) => res.json())
      .then((list) => {
        setAllArticles(list || []);
      })
      .catch((err) => {
        console.error("Failed to load quality list:", err);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="qm-wrapper">
        <div className="qm-container">
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="qm-wrapper">
        <div className="qm-container">
          <p>Không tìm thấy bài viết</p>
        </div>
      </div>
    );
  }

  return (
    <div className="qm-wrapper">
      <div className="qm-container">
     
        <div className="qm-left">

          <div className="breadcrumb">
            <span onClick={() => navigate("/")} className="link">
              <FaHome /> Trang chủ
            </span>
            <span className="sep">/</span>
            <span onClick={() => navigate("/quan-ly-chat-luong")} className="link">
              Quản Lý Chất Lượng
            </span>
            <span className="sep">/</span>
            <span className="current">{data.title}</span>
          </div>

          <h1 className="qm-title">{data.title}</h1>

     
          {data.shortDesc && (
            <p className="qm-short-desc">{data.shortDesc}</p>
          )}
               {data.pdfUrl && (
            <div className="qm-pdf-section">
              <a
                href={`${API_BASE}${data.pdfUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="qm-pdf-btn"
              >
                📄 Tải file PDF
              </a>
            </div>
          )}

          {/* Sections */}
          {data.sections && data.sections.length > 0 ? (
            data.sections.map((section, index) => (
              <div key={index} className="qm-section">
                {section.type === "text" && (
                  <>
                    {section.title && (
                      <h2 className="qm-subtitle">{section.title}</h2>
                    )}
                    {section.content && (
                      <div
                        className="qm-text"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    )}
                  </>
                )}

                {section.type === "image" && (
                  <div className="qm-img-box">
                    {section.url && (
                      <img
                        src={section.url}
                        alt={section.caption || ""}
                        className="qm-img"
                      />
                    )}
                    {section.caption && (
                      <div className="qm-caption">{section.caption}</div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted">Chưa có nội dung</p>
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="qm-right">
          <h3 className="qm-right-title">Bài viết khác</h3>
          <div className="qm-right-list">
            {allArticles
              .filter((article) => article.id !== parseInt(id))
              .map((article) => (
                <div
                  key={article.id}
                  className={`qm-right-item ${article.id == id ? "active" : ""}`}
                  onClick={() => navigate(`/quan-ly-chat-luong/${article.id}`)}
                >
                  {article.title}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
