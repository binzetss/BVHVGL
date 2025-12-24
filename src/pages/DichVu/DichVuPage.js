import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DichVuPage.css";
import { FaHome } from "react-icons/fa";
import { API_BASE } from "../../config";

export default function DichVuPage() {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  /* DETECT MOBILE */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* LOAD DATA */
  useEffect(() => {
    fetch(`${API_BASE}/api/dichvu`)
      .then((res) => res.json())
      .then((data) => setServices(data || []));
  }, []);

  /* RESET PAGE WHEN BREAKPOINT CHANGE */
  useEffect(() => {
    setPage(1);
  }, [isMobile]);

  const perPage = isMobile ? 6 : 9;   // ✅ AN TOÀN
  const totalPages = Math.ceil(services.length / perPage) || 1;
  const startIndex = (page - 1) * perPage;
  const currentServices = services.slice(startIndex, startIndex + perPage);

  const prev = () => page > 1 && setPage(page - 1);
  const next = () => page < totalPages && setPage(page + 1);

  return (
    <div className="sv-wrapper">
      <div className="sv-container">

        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <a href="/" className="home-link">
            <FaHome className="icon-home" /> TRANG CHỦ
          </a>
          <span className="sep">/</span>
          <span className="current">DỊCH VỤ</span>
        </div>

        <h1 className="sv-title">DỊCH VỤ</h1>

        {/* GRID */}
        <div className="sv-grid">
          {currentServices.map((item) => (
            <Link key={item.id} to={`/dich-vu/${item.id}`} className="sv-card-link">
              <div className="sv-card">
                <div className="sv-card-img-box">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="sv-card-name">{item.name}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="sv-pagination">
          <button className={"sv-page-btn" + (page === 1 ? " sv-page-btn-disabled":"")} onClick={prev}>‹</button>

          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              className={"sv-page-btn" + (page === idx+1 ? " sv-page-btn-active": "")}
              onClick={() => setPage(idx+1)}
            >
              {idx+1}
            </button>
          ))}

          <button className={"sv-page-btn" + (page === totalPages ? " sv-page-btn-disabled":"")} onClick={next}>›</button>
        </div>
      </div>
    </div>
  );
}
