// src/pages/GioiThieuPage/DoiNguBacSi/DoctorDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./doctorDetail.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { adminApi } from "../../../api/adminApi";

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isHDTV = location.pathname.startsWith("/doi-ngu-hdtv");

  const [doctor, setDoctor] = useState(null);
  const [sameDept, setSameDept] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const fetchAvatar = async (maSo) => {
    try {
      const cms = await adminApi(`/api/admin/bac-si/${maSo}/content`);
      return cms?.avatarUrl || "/images/default-doctor.png";
    } catch {
      return "/images/default-doctor.png";
    }
  };

  /* ================= RESIZE ================= */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

 useEffect(() => {
  window.scrollTo(0, 0);

  const load = async () => {
    try {
      // ===== 1. LOAD INFO =====
      const info = isHDTV
        ? await adminApi(`/api/HDTV/chuc-vu-chuc-danh?maSo=${id}`).then(
            (res) => (Array.isArray(res) ? res[0] : null)
          )
        : await adminApi(`/api/bac-si/${id}`);

      if (!info) return;

      // ===== 2. LOAD CMS =====
      const cms = await adminApi(`/api/admin/bac-si/${id}/content`);

      const sections = Array.isArray(cms?.sections)
        ? [...cms.sections].sort(
            (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
          )
        : [];

      const activities = Array.isArray(cms?.images)
        ? cms.images.map((img) => ({
            src: img.imageUrl,
            caption: img.caption,
          }))
        : [];

      setDoctor({
        maSo: id,
        name: info.hoVaTen,
        chucVu: info.chucVuTen || "",
        title: info.chucDanhTen,
        degree: info.chucDanhVietTat,
        department: info.khoaPhongTen || "Chuyên khoa",
        hospital: "Bệnh viện Hùng Vương Gia Lai",
        image: cms?.avatarUrl || "/images/default-doctor.png",
        sections,
        activities,
      });

      // ===== 3. RELATED DOCTORS =====
      if (!isHDTV) {
        const res = await adminApi("/api/admin/bac-si/list");
        const list = Array.isArray(res) ? res : [];

        const related = list.filter(
          (x) => x.khoaPhongTen === info.khoaPhongTen && x.maSo !== info.maSo
        );

        const relatedWithAvatar = await Promise.all(
          related.map(async (d) => ({
            ...d,
            avatarUrl: await fetchAvatar(d.maSo),
          }))
        );

        setSameDept(relatedWithAvatar);
      }
    } catch (err) {
      console.error("DoctorDetail load error:", err);
      setDoctor(null);
    }
  };

  load();
}, [id, isHDTV]);


  if (!doctor) {
    return (
      <div className="wrapper">
        <div className="doctor-wrapper">
          <p>Không tìm thấy thông tin.</p>
        </div>
      </div>
    );
  }

  /* ================= HDTV CHỨC DANH ================= */
  const getHDTVChucDanh = (chucDanh) => {
    if (!chucDanh) return "";

    const cd = chucDanh.toLowerCase();

    if (cd.includes("chưa xác định")) return "";
    if (cd.includes("thạc sĩ")) return "Thạc sĩ";
    if (cd.includes("bác sĩ ckii")) return "Bác sĩ CKII";

    return "";
  };
  let finalTitle = isHDTV ? getHDTVChucDanh(doctor.title) : doctor.title;

  let finalChucVu = doctor.chucVu;

  // Chuẩn hóa giá trị chức vụ
  const rawChucVu = (doctor.chucVu || "").trim().toLowerCase();

  // 🎯 HDTV không có chức vụ hợp lệ
  if (
    isHDTV &&
    (!rawChucVu ||
      rawChucVu === "không" ||
      rawChucVu === "khong" ||
      rawChucVu.includes("chưa xác định"))
  ) {
    finalChucVu = "Thành Viên HDTV";
  }
  // 🎯 CASE ĐẶC BIỆT: HDTV + mã 00001
  if (isHDTV && id === "00001") {
    finalTitle = "Luật Sư";
  }

  return (
    <div className="wrapper">
      <div className="doctor-wrapper doctor-detail-wrapper">
        {/* ===== BREADCRUMB ===== */}
        <div className="breadcrumb">
          <span onClick={() => navigate("/")} className="link">
            <FaHome /> Trang chủ
          </span>

          <span className="sep">/</span>

          {isHDTV ? (
            <span onClick={() => navigate("/so-do-to-chuc")} className="link">
              Sơ Đồ Tổ Chức
            </span>
          ) : (
            <span onClick={() => navigate("/doi-ngu-bac-si")} className="link">
              ĐỘI NGŨ BÁC SĨ
            </span>
          )}

          <span className="sep">/</span>
          <span className="current">{doctor.name}</span>
        </div>

        <div className="dd-layout">
          <div className="dd-left">
            <div className="dd-photo-box">
              <img src={doctor.image} alt={doctor.name} />
            </div>

            <div className="dd-left-name-box">
              <div className="dd-left-name-row">
                {finalTitle && (
                  <span className="dd-left-degree">{finalTitle}&nbsp;</span>
                )}
                <span className="dd-left-name">{doctor.name}</span>
              </div>

              {/* ===== CHỨC VỤ: CẢ HDTV & BÁC SĨ ===== */}
              {finalChucVu && (
                <div className="dd-line-main1">{finalChucVu}</div>
              )}

              {/* ===== CHỈ BÁC SĨ MỚI CÓ CHUYÊN KHOA + BỆNH VIỆN ===== */}
              {!isHDTV && (
                <>
                  <div className="dd-line-main">{doctor.department}</div>
                  <div className="dd-line-main">{doctor.hospital}</div>
                </>
              )}
            </div>
          </div>

          <div className="dd-right">
            

            {doctor.sections.map((s) => (
              <section className="dd-block" key={s.id}>
                {s.title && <h2 className="dd-block-title">{s.title}</h2>}
                <div
                  className="dd-desc"
                  dangerouslySetInnerHTML={{ __html: s.content }}
                />
              </section>
            ))}
          </div>
        </div>

        {/* ===== IMAGES ===== */}
        {doctor.activities.length > 0 && (
          <section className="dd-block dd-full-block dd-activity-block">
            <div className="dd-full-inner">
              <h2 className="dd-block-title dd-block-title-center">
                HÌNH ẢNH HOẠT ĐỘNG CỦA {doctor.name}
              </h2>

              {doctor.activities.map((img, idx) => (
                <figure className="dd-activity-figure" key={idx}>
                  <img src={img.src} alt={img.caption || doctor.name} />
                  {img.caption && (
                    <figcaption className="dd-activity-caption">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ===== RELATED (BÁC SĨ ONLY) ===== */}
        {!isHDTV && sameDept.length > 0 && (
          <section className="dd-block dd-full-block related-wrapper">
            <div className="dd-full-inner">
              <h2 className="related-title">BÁC SĨ CÙNG CHUYÊN KHOA</h2>

              {isMobile ? (
                <div className="related-list">
                  {sameDept.map((d) => (
                    <Link
                      key={d.maSo}
                      to={`/doi-ngu-bac-si/${d.maSo}`}
                      className="related-list-item"
                    >
                      <img
                        src={d.avatarUrl || "/images/default-doctor.png"}
                        alt={d.hoVaTen}
                        className="related-list-img"
                      />
                      <div className="related-list-info">
                        <div className="related-list-name">{d.hoVaTen}</div>
                        <div className="related-list-role">{d.chucDanhTen}</div>
                        <div className="related-list-hospital">{d.khoaPhongTen}</div>

                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Swiper
                  modules={[Navigation, Autoplay]}
                  slidesPerView={3}
                  navigation
                  autoplay={{ delay: 3000 }}
                  spaceBetween={20}
                  className="related-swiper"
                >
                  {sameDept.map((d) => (
                    <SwiperSlide key={d.maSo}>
                      <Link
                        to={`/doi-ngu-bac-si/${d.maSo}`}
                        className="related-link"
                      >
                        <div className="related-card">
                          <img
                            src={d.avatarUrl || "/images/default-doctor.png"}
                            alt={d.hoVaTen}
                            className="related-img"
                          />
                          <div className="related-name">{d.hoVaTen}</div>
                          <div className="related-role">{d.chucDanhTen}</div>
                          <div className="related-hospital">{d.khoaPhongTen}</div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
