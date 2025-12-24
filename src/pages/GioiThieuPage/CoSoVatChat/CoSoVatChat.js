import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import "./CoSoVatChat.css";

import iconUser from "../../../assets/cosovatchat/user.png";
import iconCalendar from "../../../assets/cosovatchat/calendar1.png";
import { API_BASE } from "../../../config";

export default function CoSoVatChatPage() {
  const [page, setPage] = useState(null);
  const [infraWithCaption, setInfraWithCaption] = useState([]);
  const [equipments, setEquipments] = useState([]);
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth <= 768);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);
  /* ===== LOAD DATA ===== */
  useEffect(() => {
    fetch(`${API_BASE}/api/facility-pages/1`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;

        setPage({
          title: data.title || "",
          author: data.author || "",
          publishDate: data.publishDate || "",
          intro: data.content || "",
          equipmentTitle: data.equipmentTitle || "",
          equipmentDescription: data.equipmentDescription || "",
        });

        setInfraWithCaption(data.subSectionsWithCaption || []);
        setEquipments(data.subSectionsWithoutCaption || []);
      });
  }, []);

  /* ===== INFRA SLIDER ===== */
  const [infraIndex, setInfraIndex] = useState(0);
  const currentInfra = infraWithCaption[infraIndex];
  const totalInfra = infraWithCaption.length;

  const prevInfra = () =>
    setInfraIndex((i) => (i === 0 ? totalInfra - 1 : i - 1));
  const nextInfra = () =>
    setInfraIndex((i) => (i === totalInfra - 1 ? 0 : i + 1));

  /* ===== EQUIPMENT SLIDER ===== */
const ITEMS_PER_SLIDE = isMobile ? 1 : 4;
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = Math.ceil(equipments.length / ITEMS_PER_SLIDE);

  const visibleItems = equipments.length
    ? Array.from({ length: ITEMS_PER_SLIDE }, (_, i) => {
        const realIndex =
          (slideIndex * ITEMS_PER_SLIDE + i) % equipments.length;
        return { ...equipments[realIndex], _realIndex: realIndex };
      })
    : [];

  /* ===== MODAL ===== */
  const [equipModalOpen, setEquipModalOpen] = useState(false);
  const [activeEquipIndex, setActiveEquipIndex] = useState(0);
  const activeEquip = equipments[activeEquipIndex];

  if (!page) return null;

  return (
    <div className="cs-wrapper">
      <div className="cs-container">
        {/* ===== BREADCRUMB ===== */}
        <div className="breadcrumb">
          <a href="/" className="home-link">
            <FaHome /> TRANG CHỦ
          </a>
          <span className="sep">/</span>
          <span className="current">Cơ sở vật chất</span>
        </div>

        {/* ===== TITLE ===== */}
        <h1 className="cs-title">{page.title}</h1>

        {/* ===== META ===== */}
        <div className="cs-meta">
          <div className="cs-meta-item">
            <img src={iconUser} alt="" />
            <span>{page.author}</span>
          </div>
          <div className="cs-meta-item">
            <img src={iconCalendar} alt="" />
            <span>{page.publishDate}</span>
          </div>
        </div>

        <div className="cs-meta-line" />

        {/* ===== INTRO ===== */}
        <p className="cs-text">{page.intro}</p>

        {/* ===== INFRA WITH CAPTION ===== */}
        {currentInfra && (
          <>
            <h2 className="cs-subtitle">Về cơ sở hạ tầng</h2>

            <h3 className="cs-eq-title">{currentInfra.title}</h3>

            <p className="cs-text1">{currentInfra.description}</p>

            <div className="cs-slider eq-slider">
              <button className="cs-slider-btn prev" onClick={prevInfra}>
                ◀
              </button>

              <img
                src={currentInfra.imageUrl}
                className="cs-slider-img show"
                alt=""
              />

              <button className="cs-slider-btn next" onClick={nextInfra}>
                ▶
              </button>
              {currentInfra.imageCaption && (
                <p className="cs-text2">{currentInfra.imageCaption}</p>
              )}
              <div className="cs-slider-dots">
                {infraWithCaption.map((_, i) => (
                  <span
                    key={i}
                    className={i === infraIndex ? "active" : ""}
                    onClick={() => setInfraIndex(i)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* ===== EQUIPMENT ===== */}
        <h2 className="cs-subtitle">Về trang thiết bị y khoa</h2>
        <h3 className="cs-eq-title">{page.equipmentTitle}</h3>
        <p className="cs-text1">{page.equipmentDescription}</p>

        <div className="equip-slider">
          <button
            className="cs-slider-btn equip-btn"
            onClick={() =>
              setSlideIndex(slideIndex === 0 ? totalSlides - 1 : slideIndex - 1)
            }
          >
            ◀
          </button>

          <div className="equip-grid">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="equip-card"
                onClick={() => {
                  setActiveEquipIndex(item._realIndex);
                  setEquipModalOpen(true);
                }}
              >
                <img src={item.imageUrl} className="equip-img" alt="" />
                <div className="equip-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="cs-slider-btn equip-btn"
            onClick={() =>
              setSlideIndex(slideIndex === totalSlides - 1 ? 0 : slideIndex + 1)
            }
          >
            ▶
          </button>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {equipModalOpen && activeEquip && (
        <div
          className="equip-modal-backdrop"
          onClick={() => setEquipModalOpen(false)}
        >
          <div className="equip-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="equip-modal-close"
              onClick={() => setEquipModalOpen(false)}
            >
              ×
            </button>

            <div className="equip-modal-main">
              <div className="equip-modal-left">
                <div className="equip-modal-img-wrapper">
                  <img src={activeEquip.imageUrl} alt="" />
                </div>
              </div>

              <div className="equip-modal-right">
                <h2 className="equip-modal-title">{activeEquip.title}</h2>
                <p className="equip-modal-text">{activeEquip.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
