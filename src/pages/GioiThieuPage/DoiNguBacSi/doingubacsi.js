import React, { useState, useEffect } from "react";
import "./doingubacsi.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import iconDegree from "../../../assets/doingubacsi/bacsi/degree.png";
import iconSpecialty from "../../../assets/doingubacsi/bacsi/specialty.png";
import iconHospital from "../../../assets/doingubacsi/bacsi/hospital.png";

import { adminApi } from "../../../api/adminApi";

/* ================= NORMALIZE ================= */
const normalize = (str = "") =>
  str
    .toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, "");

/* ================= PAGINATION ================= */
const getPagination = (current, total) => {
  if (total <= 1) return [1];

  const pages = [];
  pages.push(1);

  if (current > 4) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 3) pages.push("...");

  pages.push(total);
  return pages;
};

export default function DoiNguBacSi() {
  const [doctorData, setDoctorData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [filterKhoa, setFilterKhoa] = useState("");
  const [filterChucVu, setFilterChucVu] = useState("");
  const [filterHocHam, setFilterHocHam] = useState("");
  const [filterHocVi, setFilterHocVi] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const fetchAvatar = async (maSo) => {
    try {
      const cms = await adminApi(`/api/admin/bac-si/${maSo}/content`);
      return cms?.avatarUrl || "/images/default-doctor.png";
    } catch (e) {
      return "/images/default-doctor.png";
    }
  };

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    window.scrollTo({ top: 0 });

    const load = async () => {
      const res = await adminApi("/api/admin/bac-si/list");

      const list = Array.isArray(res) ? res : [];

      const doctorOnly = list.filter((bs) => {
        const ten = (bs.chucDanhTen || "").toLowerCase();
        const vietTat = (bs.chucDanhVietTat || "").toUpperCase();

        return ten.includes("bác sĩ") || vietTat.includes("BS");
      });
      const mapped = await Promise.all(
        doctorOnly.map(async (bs) => {
          const avatar = await fetchAvatar(bs.maSo);

          const vietTat = bs.chucDanhVietTat || "";

          let hocHam = "";
          if (vietTat.includes("GS.TS.BS")) {
            hocHam = "Giáo sư";
          } else if (vietTat.includes("PGS")) {
            hocHam = "Phó giáo sư";
          }

          return {
            maSo: bs.maSo,
            name: bs.hoVaTen,

            chucVu:
              bs.chucVuTen && bs.chucVuTen.toLowerCase().trim() !== "không"
                ? bs.chucVuTen
                : "",
            title: bs.chucDanhTen,
            degree: bs.chucDanhVietTat,
            hocHam,

            department: bs.khoaPhongTen || "Chuyên khoa",
            image: avatar,
          };
        })
      );

      setDoctorData(mapped);
    };

    load();
  }, []);

  /* ================= FILTER OPTIONS ================= */
  const khoaList = [...new Set(doctorData.map((d) => d.department))];

  const chucVuList = [
    ...new Set(doctorData.map((d) => d.chucVu).filter(Boolean)),
  ];

  const hocHamList = ["Giáo sư", "Phó giáo sư"];

  const hocViList = [
    ...new Set(doctorData.map((d) => d.degree).filter(Boolean)),
  ];

  const normalizedSearch = normalize(searchText.trim());
  const hasSearch = normalizedSearch.length > 0;

  /* ================= SORTING HELPERS ================= */
  const getHocHamPriority = (hocHam) => {
    if (hocHam === "Giáo sư") return 1;
    if (hocHam === "Phó giáo sư") return 2;
    return 999;
  };

  const getChucVuPriority = (chucVu) => {
    const cv = (chucVu || "").toLowerCase().trim();
    if (cv.includes("giám đốc") && !cv.includes("phó")) return 1;
    if (cv.includes("phó giám đốc")) return 2;
    if (cv.includes("trưởng khoa")) return 3;
    if (cv.includes("phó khoa")) return 4;
    return 999;
  };

  /* ================= FILTER LOGIC ================= */
  const filtered = doctorData.filter((d) => {
    const matchSearch = hasSearch
      ? normalize(d.name).includes(normalizedSearch)
      : true;

    const matchKhoa = filterKhoa ? d.department === filterKhoa : true;
    const matchChucVu = filterChucVu ? d.chucVu === filterChucVu : true;

    const matchHocHam = filterHocHam
      ? filterHocHam === "Giáo sư"
        ? d.hocHam === "Giáo sư"
        : d.hocHam === "Phó giáo sư"
      : true;

    const matchHocVi = filterHocVi ? d.degree === filterHocVi : true;

    return matchSearch && matchKhoa && matchChucVu && matchHocHam && matchHocVi;
  });

  /* ================= SORTING ================= */
  const sorted = [...filtered].sort((a, b) => {
    const priorityA_HocHam = getHocHamPriority(a.hocHam);
    const priorityB_HocHam = getHocHamPriority(b.hocHam);

    // Nếu có Giáo sư hoặc Phó Giáo sư → sắp xếp theo học hàm
    if (priorityA_HocHam < 999 || priorityB_HocHam < 999) {
      if (priorityA_HocHam !== priorityB_HocHam) {
        return priorityA_HocHam - priorityB_HocHam;
      }
    }

    // Không có học hàm → xét chức vụ
    const priorityA_ChucVu = getChucVuPriority(a.chucVu);
    const priorityB_ChucVu = getChucVuPriority(b.chucVu);

    if (priorityA_ChucVu !== priorityB_ChucVu) {
      return priorityA_ChucVu - priorityB_ChucVu;
    }

    // Cùng mức độ → giữ nguyên thứ tự
    return 0;
  });

  const totalPage = Math.ceil(sorted.length / perPage) || 1;
  const start = (currentPage - 1) * perPage;
  const visible = sorted.slice(start, start + perPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filterKhoa, filterChucVu, filterHocHam, filterHocVi]);

  /* ================= RENDER ================= */
  return (
    <div className="wrapper">
      <div className="doctor-wrapper">
        {/* ===== BREADCRUMB ===== */}
        <div className="breadcrumb">
          <a href="/" className="home-link">
            <FaHome /> TRANG CHỦ
          </a>
          <span className="sep">/</span>
          <span className="current">đội ngũ bác sĩ</span>
        </div>

        <h1 className="doctor-title">ĐỘI NGŨ BÁC SĨ</h1>

        {/* ===== FILTER ===== */}
        <div className="filter-row">
          <input
            className="search-box"
            placeholder="Tìm bác sĩ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => {
              setFilterKhoa("");
              setFilterChucVu("");
              setFilterHocHam("");
              setFilterHocVi("");
            }}
          />

          <select
            value={filterKhoa}
            onChange={(e) => setFilterKhoa(e.target.value)}
          >
            <option value="">Chuyên khoa</option>
            {khoaList.map((k, i) => (
              <option key={i}>{k}</option>
            ))}
          </select>

          {/* 🔹 CHỨC VỤ */}
          <select
            value={filterChucVu}
            onChange={(e) => setFilterChucVu(e.target.value)}
          >
            <option value="">Chức vụ</option>
            {chucVuList.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

          <select
            value={filterHocHam}
            onChange={(e) => setFilterHocHam(e.target.value)}
          >
            <option value="">Học hàm</option>
            {hocHamList.map((h, i) => (
              <option key={i}>{h}</option>
            ))}
          </select>

          <select
            value={filterHocVi}
            onChange={(e) => setFilterHocVi(e.target.value)}
          >
            <option value="">Học vị</option>
            {hocViList.map((h, i) => (
              <option key={i}>{h}</option>
            ))}
          </select>
        </div>

        {/* ===== LIST ===== */}
        {visible.length === 0 ? (
          <div className="doctor-empty">Không tìm thấy bác sĩ phù hợp</div>
        ) : (
          <div className="doctor-list">
            {visible.map((d) => (
              <div key={d.maSo} className="doctor-item">
                <div className="doctor-left">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="doctor-img"
                    onError={(e) => {
                      e.target.src = "/images/default-doctor.png";
                    }}
                  />
                </div>

                <div className="doctor-right">
                  <div className="doctor-right-main">
                    <h3 className="doctor-name">{d.name}</h3>

                    <div className="doctor-line">
                      <img src={iconDegree} alt="" />
                      <span>
                        {d.chucVu && <strong>{d.chucVu} – </strong>}
                        {d.title}
                      </span>
                    </div>

                    <div className="doctor-line">
                      <img src={iconSpecialty} alt="" />
                      <span>{d.department}</span>
                    </div>

                    <div className="doctor-line">
                      <img src={iconHospital} alt="" />
                      <span>Bệnh viện Hùng Vương Gia Lai</span>
                    </div>
                  </div>

                  <div className="doctor-right-footer">
                    <Link
                      to={`/doi-ngu-bac-si/${d.maSo}`}
                      className="doctor-btn"
                    >
                      Xem thêm
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== PAGINATION ===== */}
        {totalPage > 1 && (
          <div className="pagination">
            {getPagination(currentPage, totalPage).map((p, idx) =>
              p === "..." ? (
                <span key={`dot-${idx}`} className="pagination-dot">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  className={currentPage === p ? "active" : ""}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
