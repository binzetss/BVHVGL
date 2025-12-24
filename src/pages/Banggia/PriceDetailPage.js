import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./PriceDetailPage.css";
import { API_BASE } from "../../config";

export default function PriceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [all, setAll] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // HEADER
    fetch(`${API_BASE}/api/price/${id}`)
      .then((res) => res.json())
      .then((header) => setItem((prev) => ({ ...prev, ...header })));

    // DETAIL
    fetch(`${API_BASE}/api/price/${id}/detail`)
      .then((res) => res.json())
      .then((detail) => setItem((prev) => ({ ...prev, ...detail })));

    // SIDEBAR
    fetch(`${API_BASE}/api/price`)
      .then((res) => res.json())
      .then(setAll);
  }, [id]);

  if (!item) return null;

  return (
    <div className="price-detail-wrapper">
      <div className="price-inner">
        {/* HERO */}
        <div className="price-hero">
          <img src={item.heroImage} alt={item.name} />
          <div className="price-hero-overlay" />
          <div className="price-hero-text">
            <h1>{item.name}</h1>
            {item.mainTitle && <p>{item.mainTitle}</p>}
          </div>
        </div>

        <div className="price-container">
          <div className="price-left">
            <div className="breadcrumb">
              <span onClick={() => navigate("/")}>
                <FaHome /> Trang chủ
              </span>
              <span>/</span>
              <span onClick={() => navigate("/bang-gia")}>Bảng giá</span>
              <span>/</span>
              <strong>{item.name}</strong>
            </div>

            <section className="price-block">
              <h2 className="price-title">{item.name}</h2>
              {item.date && <p className="price-date">{item.date}</p>}

              {item.mainTitle && (
                <h3 className="price-subtitle">{item.mainTitle}</h3>
              )}
              {item.mainText && <p className="price-text">{item.mainText}</p>}

              {item.sections?.map((sec, idx) => {
                if (sec.type === "text") {
                  return (
                    <div className="price-subsection" key={idx}>
                      <h4 className="price-section-title">
                        {idx + 1}. {sec.title}
                      </h4>
                      <p className="price-text">{sec.content}</p>
                    </div>
                  );
                }

                if (sec.type === "image") {
                  return (
                    <div className="price-subsection" key={idx}>
                      <img
                        src={sec.url}
                        alt={sec.caption || ""}
                        style={{
                          width: "100%",
                          borderRadius: "14px",
                          margin: "16px 0",
                        }}
                      />
                      {sec.caption && (
                        <p
                          style={{
                            fontSize: 14,
                            color: "#666",
                            textAlign: "center",
                          }}
                        >
                          {sec.caption}
                        </p>
                      )}
                    </div>
                  );
                }

                return null;
              })}
            </section>
          </div>

          <div className="price-right">
            <h3 className="side-title">DANH SÁCH BẢNG GIÁ</h3>
            <div className="side-list">
              {all.map((p) => (
                <div
                  key={p.id}
                  className={
                    "side-item" + (Number(id) === p.id ? " side-active" : "")
                  }
                  onClick={() => navigate(`/bang-gia/${p.id}`)}
                >
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
