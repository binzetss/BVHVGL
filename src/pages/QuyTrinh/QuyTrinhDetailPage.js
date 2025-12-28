// src/pages/QuyTrinh/QuyTrinhDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./QuyTrinhDetailPage.css";
import { API_BASE } from "../../config";

export default function QuyTrinhDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [all, setAll] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(`${API_BASE}/api/workflow/${id}`)
      .then((res) => res.json())
      .then((header) => {
        setItem((prev) => ({ ...prev, ...header }));
      });

    fetch(`${API_BASE}/api/workflow/${id}/detail`)
      .then((res) => res.json())
      .then((detail) => {
        setItem((prev) => ({ ...prev, ...detail }));
      });

    fetch(`${API_BASE}/api/workflow`)
      .then((res) => res.json())
      .then(setAll);
  }, [id]);

  if (!item) return null;

  return (
    <div className="workflow-detail-wrapper">
      <div className="workflow-inner">
        <div className="workflow-hero">
          <img src={item.heroImage} alt={item.name} />
          <div className="workflow-hero-overlay" />
          <div className="workflow-hero-text">
            <h1>{item.name}</h1>
          </div>
        </div>

        <div className="workflow-container">
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
                      <div
                        className="wf-text"
                        dangerouslySetInnerHTML={{ __html: sec.content }}
                      />
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

          <div className="workflow-right">
            <h3 className="side-title">DANH MỤC QUY TRÌNH</h3>
            <div className="side-list">
              {all.map((p) => (
                <div
                  key={p.id}
                  className={
                    "side-item" +
                    (Number(id) === Number(p.id) ? " side-active" : "")
                  }
                  onClick={() => navigate(`/quy-trinh/${p.id}`)}
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
