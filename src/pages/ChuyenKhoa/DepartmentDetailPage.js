import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";
import "./DepartmentDetail.css";
import iconCalendar2 from "../../assets/ICONCHUYENKHOA/calendar2.png";
import { FaHome } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

export default function DepartmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
const HIDDEN_DEPT_IDS = [1, 9, 13];
  const [data, setData] = useState(null);
  const [departments, setDepartments] = useState([]);
useEffect(() => {
  if (HIDDEN_DEPT_IDS.includes(Number(id))) {
    navigate("/chuyen-khoa");
  }
}, [id, navigate])
  useEffect(() => {
    fetch(`${API_BASE}/api/departments/${id}/detail`)
      .then((res) => res.json())
      .then((json) =>
        setData({
          name: json.name,
          date: json.date,
          sections: json.sections || [],
        })
      );
  }, [id]);

  useEffect(() => {
    fetch(`${API_BASE}/api/departments`)
      .then((res) => res.json())
      .then(setDepartments);
  }, []);

  if (!data) return <p>Đang tải...</p>;

  return (
    <div className="dpd-wrapper">
      <div className="dpd-container">
        <div className="dpd-left">
          {/* BREADCRUMB */}
          <div className="breadcrumb">
            <span onClick={() => navigate("/")} className="link">
              <FaHome /> Trang chủ
            </span>
            <span className="sep">/</span>
            <span onClick={() => navigate("/chuyen-khoa")} className="link">
              Chuyên khoa
            </span>
            <span className="sep">/</span>
            <span className="current">{data.name}</span>
          </div>

          <h1 className="dpd-title">{data.name}</h1>

          <p className="dpd-date">
            <img src={iconCalendar2} className="dpd-date-icon" alt="" />

            {data.date}
          </p>
          <div className="svd-main-menu">
            <MdMenu className="svd-main-icon" />
            Nội dung chính
          </div>

          {/* RENDER TEXT + IMAGE SECTIONS */}
          {data.sections.map((sec, i) => (
            <div key={i} className="dpd-section">
              {sec.type === "text" && (
                <>
                  <h2 className="dpd-subtitle">{sec.title}</h2>
                  <div
                    className="dpd-text"
                    dangerouslySetInnerHTML={{ __html: sec.content }}
                  />
                </>
              )}

              {sec.type === "image" && (
                <div className="dpd-img-box">
                  <img src={sec.url} className="dpd-img" alt="" />

                  {sec.caption && (
                    <div className="dpd-caption">{sec.caption}</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SIDEBAR */}
        <div className="dpd-right">
          <h3 className="dpd-right-title">Danh sách chuyên khoa</h3>

          <div className="dpd-right-list">
            {departments
              .filter((d) => !HIDDEN_DEPT_IDS.includes(d.id))
              .map((d) => (
                <div
                  key={d.id}
                  className={`dpd-right-item ${d.id == id ? "active" : ""}`}
                  onClick={() => navigate(`/chuyen-khoa/${d.id}`)}
                >
                  {d.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
