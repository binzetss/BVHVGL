// src/pages/GioiThieuPage/DoiNguBacSi/DoctorDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./doctorDetail.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { adminApi } from "../../../api/adminApi";

export default function DoctorDetail() {
  const { id } = useParams(); // maSo
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [sameDept, setSameDept] = useState([]);
  const fetchAvatar = async (maSo) => {
    try {
      const cms = await adminApi(`/api/admin/bac-si/${maSo}/content`);
      return cms?.avatarUrl || "/images/default-doctor.png";
    } catch {
      return "/images/default-doctor.png";
    }
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);

    const load = async () => {
      const info = await adminApi(`/api/bac-si/${id}`);
      const cms = await adminApi(`/api/admin/bac-si/${id}/content`);

      const sections = (cms?.sections || []).sort(
        (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      );

      setDoctor({
        maSo: id,
        name: info.hoVaTen,

        // 🔹 CHỨC VỤ (từ BE)
        chucVu: info.chucVuTen || "",

        // 🔹 CHỨC DANH
        title: info.chucDanhTen,
        degree: info.chucDanhVietTat,

        department: info.khoaPhongTen || "Chuyên khoa",
        hospital: "Bệnh viện Hùng Vương Gia Lai",
        image: cms?.avatarUrl || "/images/default-doctor.png",
        sections,
        activities: (cms?.images || []).map((img) => ({
          src: img.imageUrl,
          caption: img.caption,
        })),
      });

      const list = await adminApi("/api/admin/bac-si/list");

      const related = list.filter(
        (x) => x.khoaPhongTen === info.khoaPhongTen && x.maSo !== info.maSo
      );

      const relatedWithAvatar = await Promise.all(
        related.map(async (d) => ({
          ...d,
          avatarUrl: await fetchAvatar(d.maSo), // 🔥 GẮN ẢNH
        }))
      );

      setSameDept(relatedWithAvatar);
    };

    load();
  }, [id]);

  if (!doctor) {
    return (
      <div className="wrapper">
        <div className="doctor-wrapper">
          <p>Không tìm thấy thông tin bác sĩ.</p>
          <Link to="/doi-ngu-bac-si" className="dd-back">
            ← Quay lại đội ngũ bác sĩ
          </Link>
        </div>
      </div>
    );
  }

  const line1 = doctor.chucVu
    ? `${doctor.chucVu} – ${doctor.title}`
    : doctor.title || "";
  return (
    <div className="wrapper">
      <div className="doctor-wrapper doctor-detail-wrapper">
        <div className="breadcrumb">
          <span onClick={() => navigate("/")} className="link">
            <FaHome /> Trang chủ
          </span>
          <span className="sep">/</span>
          <span onClick={() => navigate("/doi-ngu-bac-si")} className="link">
            ĐỘI NGŨ BÁC SĨ
          </span>
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
                {doctor.degree && (
                  <span className="dd-left-degree">{doctor.degree}</span>
                )}
                <span className="dd-left-name">{doctor.name}</span>
              </div>

              {line1 && <div className="dd-line-main1">{line1}</div>}
              <div className="dd-line-main">{doctor.department}</div>
              <div className="dd-line-main">{doctor.hospital}</div>
            </div>
          </div>

          <div className="dd-right">
            <h1 className="dd-name-main">{doctor.name}</h1>

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

        {sameDept.length > 0 && (
          <section className="dd-block dd-full-block related-wrapper">
            <div className="dd-full-inner">
              <h2 className="related-title">BÁC SĨ CÙNG CHUYÊN KHOA</h2>

              {/* ===== MOBILE: LIST DỌC ===== */}
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
                        <div className="related-list-hospital">
                          Bệnh viện Hùng Vương Gia Lai
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                /* ===== DESKTOP: GIỮ SLIDER ===== */
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
                          <div className="related-card-top">
                            <img
                              src={d.avatarUrl || "/images/default-doctor.png"}
                              alt={d.hoVaTen}
                              className="related-img"
                            />
                          </div>
                          <div className="related-card-bottom">
                            <div className="related-name">{d.hoVaTen}</div>
                            <div className="related-role">{d.chucDanhTen}</div>
                            <div className="related-hospital">
                              Bệnh viện Hùng Vương Gia Lai
                            </div>
                          </div>
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
