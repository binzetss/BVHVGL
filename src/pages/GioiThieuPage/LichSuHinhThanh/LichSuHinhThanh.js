import React, { useState, useEffect, useRef } from "react";
import "./LichSuHinhThanh.css";
import { API_BASE } from "../../../config";

export default function LichSuHinhThanh() {
  const [timeline, setTimeline] = useState([]);
  const [years, setYears] = useState([]);
  const [active, setActive] = useState(null);
  const [autoRun, setAutoRun] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const resumeTimerRef = useRef(null);
  /* ================= DETECT MOBILE ================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ================= LOAD API ================= */
  useEffect(() => {
    fetch(`${API_BASE}/api/history-timeline`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.length) return;

        const sorted = [...data].sort((a, b) => a.year - b.year);
        setTimeline(sorted);
        setYears(sorted.map((i) => i.year));
        setActive(sorted[0].year);
      });
  }, []);
  const pauseAutoRun = () => {
    if (!isMobile) return;

    setAutoRun(false);

    // clear timer cũ nếu có
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
  };

  const resumeAutoRun = () => {
    if (!isMobile) return;

    // chờ user đọc xong rồi mới chạy lại
    resumeTimerRef.current = setTimeout(() => {
      setAutoRun(true);
    }, 4000); // 4s sau khi ngừng chạm
  };

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (!autoRun || !years.length) return;

    const interval = setInterval(() => {
      setActive((prev) => {
        const idx = years.indexOf(prev);
        return years[(idx + 1) % years.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRun, years]);

  /* ================= MOBILE YEARS ================= */
  const getMobileYears = () => {
    if (!years.length || active === null) return [];

    const idx = years.indexOf(active);
    if (idx === 0) return years.slice(0, 3);
    if (idx === years.length - 1) return years.slice(-3);
    return years.slice(idx - 1, idx + 2);
  };

  const displayYears = isMobile ? getMobileYears() : years;

  const handleClickYear = (year) => {
    setActive(year);
    setAutoRun(false);
    setTimeout(() => setAutoRun(true), 10000);
  };

  const current = timeline.find((i) => i.year === active);
  if (!current) return null;

  return (
    <div className="ls-wrapper">
      <div className="ls-container">
        {/* TITLE TĨNH */}
        <h2 className="ls-title ls-section-title">LỊCH SỬ HÌNH THÀNH</h2>

        {/* TIMELINE */}
        <div className="ls-timeline">
          {displayYears.map((year, idx) => (
            <div className="ls-time-item" key={year}>
              {!isMobile && idx !== 0 && (
                <div className={`ls-line ${active >= year ? "show" : ""}`} />
              )}

              <div
                className={`ls-year ${active === year ? "active" : ""}`}
                onClick={() => handleClickYear(year)}
              >
                <div className="inner-circle">{year}</div>
              </div>
            </div>
          ))}
        </div>

        {/* TITLE ĐỘNG */}
        <h2 className="ls-title ls-dynamic-title">{current.title}</h2>

        {/* CARD */}
        <div className="ls-card">
          <div className="ls-img-wrapper">
            <img src={current.imageUrl} className="ls-img" alt="" />
          </div>

          <div
            className="ls-text"
            onTouchStart={pauseAutoRun}
            onTouchEnd={resumeAutoRun}
            onScroll={pauseAutoRun}
          >
            <h3>{current.title}</h3>
            <p>{current.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
