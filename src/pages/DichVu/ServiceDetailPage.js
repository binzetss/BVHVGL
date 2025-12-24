import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ServiceDetailPage.css";
import { MdMenu } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import iconCalendar2 from "../../assets/ICONCHUYENKHOA/calendar2.png";
import { API_BASE } from "../../config";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/dichvu/${id}/detail`)
      .then((res) => res.json())
      .then((data) => setService(data));

    fetch(`${API_BASE}/api/dichvu`)
      .then((res) => res.json())
      .then(setServicesList);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!service) return <p>Đang tải...</p>;

  return (
    <div className="svd-wrapper">
      <div className="svd-container">
        <div className="svd-left">
          {/* breadcrumb */}
          <div className="breadcrumb">
            <span onClick={() => navigate("/")} className="link">
              <FaHome className="icon-home" /> Trang chủ
            </span>
            <span className="sep">/</span>
            <span onClick={() => navigate("/dich-vu")} className="link">
              Dịch vụ
            </span>
            <span className="sep">/</span>
            <span className="current">{service.name}</span>
          </div>

          <h1 className="svd-title">{service.name}</h1>

          <p className="svd-date">
            <img src={iconCalendar2} className="svd-date-icon" alt="" />
            {service.date}
          </p>
          <div className="svd-main-menu">
           <MdMenu className="svd-main-icon" />
            Nội dung chính
          </div>

          {/* MAIN CONTENT */}
          <div className="svd-section">
            {service.mainTitle && (
              <h2 className="svd-subtitle">{service.mainTitle}</h2>
            )}

            {service.mainText && (
              <div
                className="svd-text"
                dangerouslySetInnerHTML={{ __html: service.mainText }}
              />
            )}

            {service.heroImageUrl && (
              <div className="svd-img-box">
                <img src={service.heroImageUrl} className="svd-img" alt="" />
              </div>
            )}
          </div>

          {/* DYNAMIC SECTIONS */}
          {service.sections?.map((sec, i) => (
            <div key={i} className="svd-section">
              {sec.type === "text" && (
                <>
                  <h2 className="svd-subtitle">{sec.title}</h2>
                  <div
                    className="svd-text"
                    dangerouslySetInnerHTML={{ __html: sec.content }}
                  />
                </>
              )}

              {sec.type === "image" && (
                <div className="svd-img-box">
                  <img src={sec.url} className="svd-img" alt="" />

                  {sec.caption && <p className="svd-caption">{sec.caption}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SIDEBAR */}
        <div className="svd-right">
          <h3 className="svd-right-title">DANH SÁCH DỊCH VỤ</h3>

          <div className="svd-right-list">
            {servicesList.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/dich-vu/${item.id}`)}
                className={
                  "svd-right-item" +
                  (Number(id) === item.id ? " svd-right-item-active" : "")
                }
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
