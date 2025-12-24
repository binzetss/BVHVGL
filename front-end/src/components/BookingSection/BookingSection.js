import React from "react";
import "./BookingSection.css";
import { LazyImage } from "../LazyImage/LazyImage";

import Lichicon from "../../assets/calendar2.png";

import banggia from "../../assets/Booking/banggia.png";
import cgbs from "../../assets/Booking/cgbs.png";
import khcb from "../../assets/Booking/khcb.png";
import tckq from "../../assets/Booking/tckq.png";



const serviceBoxes = [
  { id: 1, icon: cgbs, text: "CHUYÊN GIA - BÁC SĨ" },
  { id: 2, icon: banggia, text: "BẢNG GIÁ" },
  { id: 3, icon: khcb, text: "KHÁCH HÀNG CẦN BIẾT" },
  { id: 4, icon: tckq, text: "TRA CỨU KẾT QUẢ" }
];

export default function BookingSection() {
  return (
    <div className="booking-wrapper">

      <div className="booking-left">
        <h2 className="booking-title">ĐẶT LỊCH KHÁM BỆNH</h2>

        <input className="booking-input" placeholder="Họ và tên (*)" />
        <input className="booking-input" placeholder="Số điện thoại (*)" />
        <input className="booking-input" placeholder="Số CCCD/BHYT" />
        <input className="booking-input" placeholder="Dân tộc" />

        <div className="calendar">
          <input type="text" placeholder="Ngày giờ đăng ký khám" />
          <LazyImage src={Lichicon} alt="calendar" className="hv-lich-icon" />
        </div>

        <textarea className="booking-input" placeholder="Lý do đăng ký khám" />

        <button className="btn-booking">ĐẶT LỊCH KHÁM</button>
      </div>

      <div className="booking-right">
        <div className="right-header">
          <h2>DÀNH CHO KHÁCH HÀNG</h2>
          <span className="right-hotline">
            GỌI CẤP CỨU: <b>0914 555 115</b>
          </span>
        </div>

        <div className="right-grid">
          {serviceBoxes.map((box) => (
            <div key={box.id} className="right-box">
              <LazyImage src={box.icon} alt={box.text} />
              <p>{box.text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}