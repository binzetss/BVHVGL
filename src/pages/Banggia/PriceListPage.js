import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import "./PriceListPage.css";
import { API_BASE } from "../../config";

const VISIBLE_COUNT = 4;

/* =========================
   UTILS SEARCH (GIỮ NGUYÊN)
========================= */
const normalizeText = (str) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
};

const createShortcut = (str) => {
  const normalized = normalizeText(str);
  return normalized
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("");
};

export default function PriceListPage() {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [showAll, setShowAll] = useState(false);

  /* ===== LOAD LIST ===== */
  useEffect(() => {
    fetch(`${API_BASE}/api/price`)
      .then((res) => res.json())
      .then(setList)
      .catch(() => setList([]));
  }, []);

  /* ===== FILTER + SEARCH ===== */
  const filteredList = useMemo(() => {
    let data = [...list];

    if (selectedId) {
      const idNum = Number(selectedId);
      data = data.filter((item) => item.id === idNum);
    }

    const search = normalizeText(searchTerm);
    if (search) {
      data = data.filter((item) => {
        const nameNorm = normalizeText(item.name);
        const descNorm = normalizeText(item.shortDesc);
        const shortcut = createShortcut(item.name);

        return (
          nameNorm.includes(search) ||
          descNorm.includes(search) ||
          shortcut.includes(search)
        );
      });
    }

    return data;
  }, [list, searchTerm, selectedId]);

  const displayList = showAll
    ? filteredList
    : filteredList.slice(0, VISIBLE_COUNT);

  return (
    <div className="wrapper">
      <div className="pricelist-wrapper">
        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <Link to="/" className="home-link">
            <FaHome /> TRANG CHỦ
          </Link>
          <span className="sep">&gt;</span>
          <span className="current">bảng giá</span>
        </div>

        {/* HEADER */}
        <div className="pricelist-header-box">
          <h1 className="pricelist-title">BẢNG GIÁ</h1>

          <div className="pricelist-filter-bar">
            <div className="pricelist-select-wrapper">
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                <option value="">CHỌN BẢNG GIÁ</option>
                {list.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pricelist-search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Tìm nhanh theo tên gói..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSelectedId("")}
              />
            </div>
          </div>
        </div>

        {/* LIST */}
        <div className="pricelist-grid">
          {displayList.map((item, idx) => (
            <div
              key={item.id}
              className="pricelist-card"
              onClick={() => navigate(`/bang-gia/${item.id}`)}
            >
              <div className="pricelist-card-image">
                <img src={item.heroImage} alt={item.name} />
              </div>

              <div className="pricelist-card-content">
                <div className="pricelist-card-top">
                  <div className="pricelist-card-tag">
                    BẢNG GIÁ {String(idx + 1).padStart(2, "0")}
                  </div>

                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-desc">{item.shortDesc}</p>
                </div>

                <div className="pricelist-card-bottom">
                  <span className="card-detail-link">
                    Xem chi tiết &gt;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SHOW MORE */}
        {filteredList.length > VISIBLE_COUNT && (
          <div className="pricelist-show-more">
            <button
              className="pricelist-more-btn"
              onClick={() => setShowAll((p) => !p)}
            >
              {showAll ? "Thu gọn danh sách ↑" : "Xem tất cả bảng giá →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
