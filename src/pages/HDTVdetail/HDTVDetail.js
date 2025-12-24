// src/pages/GioiThieuPage/HDTVDetail/HDTVDetail.js
import React, { useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { hdtvData } from "./hdtvDetailData";
import "./hdtvDetail.css";

export default function HDTVDetail() {
  const { id } = useParams();
  const memberId = Number(id);

  const navigate = useNavigate();

  const member = useMemo(
    () => hdtvData.find((m) => m.id === memberId),
    [memberId]
  );


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [memberId]);


  useEffect(() => {
    const sections = document.querySelectorAll(".fade-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [memberId]);

  if (!member) {
    return (
      <div className="wrapper">
        <div className="hdtv-detail-wrapper">
          <p>Không tìm thấy thông tin thành viên Hội đồng thành viên.</p>
          <Link to="/so-do-to-chuc" className="hdtv-back">
            ← Quay lại sơ đồ tổ chức
          </Link>
        </div>
      </div>
    );
  }

  const line1 =
    member.position ||
    (member.title && member.title.trim().replace(/,\s*$/, ""));

  const line2 = member.department || "Hội đồng thành viên";
  const line3 = member.organization || "Bệnh viện Hùng Vương Gia Lai";

  return (
    <div className="wrapper">
      <div className="hdtv-detail-wrapper">
        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <span onClick={() => navigate("/")} className="link">
            <FaHome className="icon-home" /> Trang chủ
          </span>
          <span className="sep">/</span>
          <span onClick={() => navigate("/so-do-to-chuc")} className="link">
            SƠ ĐỒ TỔ CHỨC
          </span>
          <span className="sep">/</span>
          <span className="current">HỘI ĐỒNG THÀNH VIÊN</span>
          <span className="sep">/</span>
          <span className="current">{member.name}</span>
        </div>

        {/* ============== LAYOUT 2 CỘT ============== */}
        <div className="hdtv-layout">
          {/* Cột trái */}
          <div className="hdtv-left">
            <div className="hdtv-photo-box">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="hdtv-left-name-box">
              <div className="hdtv-left-name">{member.name}</div>
            </div>
          </div>

          {/* Cột phải */}
          <div className="hdtv-right">
            <h1 className="hdtv-name-main">{member.name}</h1>

            {line1 && (
              <div className="hdtv-line-main hdtv-line-strong">{line1}</div>
            )}
            {line2 && <div className="hdtv-line-main">{line2}</div>}
            {line3 && <div className="hdtv-line-main">{line3}</div>}

            {/* GIỚI THIỆU */}
            {member.description && (
              <section className="hdtv-block fade-section">
                <h2 className="hdtv-block-title">GIỚI THIỆU</h2>
                <p className="hdtv-desc">{member.description}</p>
              </section>
            )}

            {/* TẦM NHÌN – SỨ MỆNH CÁ NHÂN */}
            {member.vision && (
              <section className="hdtv-block fade-section">
                <h2 className="hdtv-block-title">
                  TẦM NHÌN – SỨ MỆNH CÁ NHÂN
                </h2>
                <p className="hdtv-desc">{member.vision}</p>
              </section>
            )}

            {/* QUÁ TRÌNH ĐÀO TẠO / HỌC VẤN */}
            {member.education?.length > 0 && (
              <section className="hdtv-block fade-section">
                <h2 className="hdtv-block-title">
                  Quá trình đào tạo - học vấn
                </h2>
                <div className="hdtv-timeline">
                  {member.education.map((item, idx) => (
                    <div className="hdtv-timeline-row" key={idx}>
                      <div className="hdtv-timeline-year">{item.year}</div>
                      <div className="hdtv-timeline-text">
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

     
            {member.work?.length > 0 && (
              <section className="hdtv-block fade-section">
                <h2 className="hdtv-block-title">Quá trình công tác</h2>
                <div className="hdtv-timeline">
                  {member.work.map((item, idx) => (
                    <div className="hdtv-timeline-row" key={idx}>
                      <div className="hdtv-timeline-year">{item.year}</div>
                      <div className="hdtv-timeline-text">
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LĨNH VỰC PHỤ TRÁCH / THẾ MẠNH */}
            {member.specialties?.length > 0 && (
              <section className="hdtv-block fade-section">
                <h2 className="hdtv-block-title">Lĩnh vực phụ trách</h2>
                <ul className="hdtv-specialty-list">
                  {member.specialties.map((sp, idx) => (
                    <li key={idx}>{sp}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* =============== HÌNH ẢNH HOẠT ĐỘNG (NẾU CÓ) =============== */}
        {member.activities?.length > 0 && (
          <section className="hdtv-block hdtv-full-block hdtv-activity-block fade-section">
            <div className="hdtv-full-inner">
              <h2 className="hdtv-block-title hdtv-block-title-center">
                HÌNH ẢNH HOẠT ĐỘNG CỦA {member.name}
              </h2>

              {member.activities.map((img, idx) => (
                <figure className="hdtv-activity-figure" key={idx}>
                  <img
                    src={img.src}
                    alt={img.caption || member.name}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  {img.caption && (
                    <figcaption className="hdtv-activity-caption">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
