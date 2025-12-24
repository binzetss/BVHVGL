// src/pages/CoSo/BranchesPage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./BranchesPage.css";
import { API_BASE } from "../../config";

export default function BranchesPage() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/branches`)
      .then((res) => res.json())
      .then((data) => setBranches(data || []))
      .catch(() => setBranches([]));
  }, []);

  return (
    <div className="branches-wrapper">
      <div className="breadcrumb">
        <Link to="/" className="home-link">
          <FaHome className="icon-home" />
          TRANG CHỦ
        </Link>
        <span className="sep">/</span>
        <span className="current">HỆ THỐNG CƠ SỞ</span>
      </div>

      <div className="branches-intro">
        <p>
          Với mong muốn mang những dịch vụ y tế chất lượng cao tới gần hơn với
          người dân khu vực Tây Nguyên và các tỉnh lân cận, hệ thống Bệnh viện
          Hùng Vương Gia Lai không ngừng mở rộng mạng lưới cơ sở khám chữa bệnh,
          đầu tư trang thiết bị hiện đại và đội ngũ bác sĩ giàu kinh nghiệm.
        </p>
        <p>
          Mỗi cơ sở đều được xây dựng theo tiêu chí đồng bộ về chất lượng dịch
          vụ, quy trình tiếp đón – khám – điều trị thân thiện, linh hoạt trong
          thanh toán bảo hiểm, giúp khách hàng dễ dàng lựa chọn điểm đến phù hợp
          nhất.
        </p>
      </div>

      <div className="branches-list">
        {branches.map((branch, index) => (
          <div key={branch.id} className="branch-card">
            <div className="branch-left-strip">
              <div className="branch-number">{index + 1}</div>
            </div>

            <div className="branch-content">
              <h2 className="branch-title">{branch.name}</h2>
              <p className="branch-short">{branch.shortDesc}</p>

              <Link
                to={index === 0 ? "/gioi-thieu" : `/co-so/${branch.id}`}
                className="branch-btn"
              >
                Chi tiết về cơ sở &gt;
              </Link>
            </div>

            <div className="branch-image">
              <img src={branch.image} alt={branch.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
