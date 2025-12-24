// src/pages/TienIch/TienIchDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./TienIchDetailPage.css";
import { API_BASE } from "../../config";

export default function TienIchDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [all, setAll] = useState([]);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  fetch(`${API_BASE}/api/tien-ich/${id}`)
    .then(res => res.json())
    .then(header => {
      setItem(prev => ({ ...prev, ...header }));
    });

  fetch(`${API_BASE}/api/tien-ich/${id}/detail`)
    .then(res => res.json())
    .then(detail => {
      setItem(prev => ({ ...prev, ...detail }));
    });

  fetch(`${API_BASE}/api/tien-ich`)
    .then(res => res.json())
    .then(setAll);
}, [id]);


  if (!item) return null;

  return (
    <div className="workflow-detail-wrapper">
      <div className="workflow-inner">
        {/* HERO */}
        <div className="workflow-hero">
          <img src={item.heroImage} alt={item.name} />
          <div className="workflow-hero-overlay" />
          <div className="workflow-hero-text">
            <h1>{item.name}</h1>
            <p>{item.shortDesc}</p>
          </div>
        </div>

        <div className="workflow-container">
          {/* LEFT */}
          <div className="workflow-left">
            <section className="wf-block">
              <h2 className="wf-title">{item.name}</h2>

              {item.sections?.map((sec, idx) => {
                if (sec.type === "text") {
                  return (
                    <div className="wf-subsection" key={idx}>
                      {sec.title && (
                        <h4 className="wf-step-title">
                          {idx + 1}. {sec.title}
                        </h4>
                      )}
                      <p className="wf-text">{sec.content}</p>
                    </div>
                  );
                }

                if (sec.type === "image") {
                  return (
                    <div className="wf-subsection" key={idx}>
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
                        <p style={{ textAlign: "center", fontSize: 14 }}>
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

          {/* RIGHT */}
          <div className="workflow-right">
            <h3 className="side-title">TIỆN ÍCH KHÁC</h3>
            <div className="side-list">
              {all.map((p) => (
                <div
                  key={p.id}
                  className={
                    "side-item" +
                    (Number(id) === Number(p.id) ? " side-active" : "")
                  }
                  onClick={() => navigate(`/tien-ich/${p.id}`)}
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
