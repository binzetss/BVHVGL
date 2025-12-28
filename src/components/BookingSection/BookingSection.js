// src/components/BookingSection/BookingSection.js
import React from "react";
import "./BookingSection.css";
import { LazyImage } from "../LazyImage/LazyImage";
import { Link } from "react-router-dom"; 
// Icon
import banggia from "../../assets/Booking/banggia.png";
import lkb from "../../assets/Booking/lkb.png";
import qtkb from "../../assets/Booking/qtkb.png";
import cgbs from "../../assets/Booking/cgbs.png";
import ktvks from "../../assets/Booking/ktvks.png";
import taiapp from "../../assets/Booking/taiapp.png";

// 6 ô dịch vụ
const serviceBoxes = [
  { id: 1, icon: cgbs, text: "CHUYÊN GIA - BÁC SĨ", link: "/doi-ngu-bac-si" },

  {
    id: 2,
    icon: lkb,
    text: "LỊCH KHÁM BỆNH",
    link: "http://lichphongkham.bvhvgl.com/lich-phong-kham-7-ngay",
  },
  {
    id: 3,
    icon: qtkb,
    text: "QUY TRÌNH KHÁM BỆNH",
    link: "/quy-trinh-kham-benh",
  },
  { id: 4, icon: banggia, text: "BẢNG GIÁ", link: "/bang-gia" },
  { id: 5, icon: ktvks, text: "KHÁM VÀ TẦM SOÁT SỨC KHỎE", link: "/dich-vu/2" },
  { id: 6, icon: taiapp, text: "TẢI APP HVGLCARE", link: "/tai-app-hvgl-care" },
];

export default function BookingSection() {
  return (
    <div className="booking-wrapper">
      <div className="booking-right">
        <div className="right-header">
          <h2>DÀNH CHO KHÁCH HÀNG</h2>
          <span
            className="right-hotline"
            onClick={() => (window.location.href = "tel:0914555115")}
            style={{ cursor: "pointer" }}
          >
            GỌI CẤP CỨU: <b>0914 555 115</b>
          </span>
          
        </div>

        <div className="right-grid">
          {serviceBoxes.map((box) => {
            const content = (
              <>
                <LazyImage src={box.icon} alt={box.text} />
                <p>{box.text}</p>
              </>
            );

            // External link
            if (box.link && box.link.startsWith("http")) {
              return (
                <a
                  key={box.id}
                  href={box.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="right-box right-box-link"
                >
                  {content}
                </a>
              );
            }

            // Internal link
            if (box.link) {
              return (
                <Link
                  key={box.id}
                  to={box.link}
                  className="right-box right-box-link"
                >
                  {content}
                </Link>
              );
            }

            // Không có link
            return (
              <div key={box.id} className="right-box">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
