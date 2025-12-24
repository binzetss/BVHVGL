import React, { useState } from "react";
import "./BookingPage.css";
import "./BookingCalendar.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Lichicon from "../../assets/calendar2.png";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    cccd: "",
    ethnic: "",
    datetime: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Không được để trống";

    const phoneRegex = /^(0\d{9,10}|\+84\d{9,10})$/;
    if (!form.phone.trim()) newErrors.phone = "Không được để trống";
    else if (!phoneRegex.test(form.phone))
      newErrors.phone = "Số điện thoại không hợp lệ";

    if (!form.cccd.trim()) newErrors.cccd = "Không được để trống";
    else if (!/^\d{12}$/.test(form.cccd))
      newErrors.cccd = "CCCD phải gồm 12 số";

    if (!form.ethnic.trim()) newErrors.ethnic = "Không được để trống";

    if (!form.datetime.trim())
      newErrors.datetime = "Vui lòng chọn ngày giờ khám";

    if (!form.reason.trim()) newErrors.reason = "Không được để trống";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) setShowSuccess(true);
  };

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const weeks = [];
  let count = 1;
  let started = false;

  for (let i = 0; i < 6; i++) {
    const w = [];

    for (let j = 0; j < 7; j++) {
      if (!started && j === firstDayOfMonth) started = true;

      if (started && count <= daysInMonth) {
        w.push(count);
        count++;
      } else w.push(null);
    }

    weeks.push(w);
  }

  const handleSelectDay = (day) => {
    if (!day) return;
    setSelectedDay(day);
    setSelectedDate(`${day}/${currentMonth + 1}/${currentYear}`);
  };

  const selectTime = (time) => {
    updateField("datetime", `${time} - ${selectedDate}`);
    setShowCalendar(false);
  };

  return (
    <div className="bookingpage-wrapper">
      <div className="booking-breadcrumb">
        <Link to="/" className="breadcrumb-home">  <FaHome className="breadcrumb-icon" />TRANG CHỦ</Link> 
<span>&gt;</span> 
<b>ĐẶT LỊCH KHÁM</b>
      </div>

      <div className="booking-wrapper">
        <div className="booking-left">
          <h2 className="booking-title">ĐẶT LỊCH KHÁM BỆNH</h2>

          {/* INPUTS */}
          <input
            className={"booking-input " + (errors.name && "error")}
            placeholder="Họ và tên (*)"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          {errors.name && <span className="err">{errors.name}</span>}

          <input
            className={"booking-input " + (errors.phone && "error")}
            placeholder="Số điện thoại (*)"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
          {errors.phone && <span className="err">{errors.phone}</span>}

          <input
            className={"booking-input " + (errors.cccd && "error")}
            placeholder="Số CCCD/BHYT"
            value={form.cccd}
            onChange={(e) => updateField("cccd", e.target.value)}
          />
          {errors.cccd && <span className="err">{errors.cccd}</span>}

          <input
            className={"booking-input " + (errors.ethnic && "error")}
            placeholder="Dân tộc"
            value={form.ethnic}
            onChange={(e) => updateField("ethnic", e.target.value)}
          />
          {errors.ethnic && <span className="err">{errors.ethnic}</span>}

          {/* DATE FIELD */}
          <div className="calendar-wrapper">
            <input
              type="text"
              readOnly
              placeholder="Ngày giờ đăng ký khám"
              value={form.datetime}
              className={errors.datetime ? "error" : ""}
            />

            <img
              src={Lichicon}
              alt="calendar"
              className="calendar-icon"
              onClick={() => setShowCalendar(true)}
            />
          </div>
          {errors.datetime && <span className="err">{errors.datetime}</span>}

          <textarea
            className={"booking-input textarea " + (errors.reason && "error")}
            placeholder="Lý do đăng ký khám"
            value={form.reason}
            onChange={(e) => updateField("reason", e.target.value)}
          />
          {errors.reason && <span className="err">{errors.reason}</span>}

          <button className="btn-booking" onClick={handleSubmit}>
            ĐẶT LỊCH KHÁM
          </button>
        </div>

        {/* RIGHT */}
        <div className="booking-right">
          <div className="right-box1 green">
            <h3>QUÝ KHÁCH SỬ DỤNG DỊCH VỤ ĐẶT HẸN TRỰC TUYẾN</h3>
            <p>(Vui lòng đặt trước ít nhất 24 giờ)</p>
          </div>

          <div className="right-box1 orange">
            Trường hợp khẩn cấp vui lòng gọi ngay <b>0914 555 115</b>
          </div>

          <div className="right-box1 blue">
            Mọi thắc mắc vui lòng liên hệ <br />
            <b>1800 8015</b>
          </div>
        </div>
      </div>

      {/* CALENDAR POPUP */}
      {showCalendar && (
        <div className="bookingcal-overlay">
          <div className="bookingcal-box">
            <div className="calendar-title">Chọn ngày khám</div>

            <div className="calendar-header">
              <button
                onClick={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11);
                    setCurrentYear(currentYear - 1);
                  } else setCurrentMonth(currentMonth - 1);
                }}
              >
                ‹
              </button>

              <span>
                {currentMonth + 1}/{currentYear}
              </span>

              <button
                onClick={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0);
                    setCurrentYear(currentYear + 1);
                  } else setCurrentMonth(currentMonth + 1);
                }}
              >
                ›
              </button>
            </div>

            <div className="calendar-week">
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>

            <div className="calendar-grid">
              {weeks.map((week, i) =>
                week.map((day, j) => (
                  <div
                    key={i + "-" + j}
                    className={
                      "calendar-day " + (selectedDay === day ? "selected-day" : "")
                    }
                    onClick={() => handleSelectDay(day)}
                  >
                    {day}
                  </div>
                ))
              )}
            </div>

            {selectedDay && (
              <>
                <div className="time-label">Chọn giờ:</div>

                <div className="time-grid">
                  {["07:00", "07:30", "08:00", "08:30", "09:00", "09:30","10:00", "10:30",
                   "11:00", "13:00", "13:30", "14:00"].map(
                    (t) => (
                      <div
                        key={t}
                        className="time-item"
                        onClick={() => selectTime(t)}
                      >
                        {t}
                      </div>
                    )
                  )}
                </div>
              </>
            )}

            <button className="btn-close-popup" onClick={() => setShowCalendar(false)}>
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="success-modal">
            <h2>ĐĂNG KÝ THÀNH CÔNG!</h2>

            <p>
              Chúc mừng Anh/Chị <b>{form.name}</b>
            </p>

            <p>
              Lịch khám đã đăng ký:
              <br />
              <b>{form.datetime}</b>
            </p>

            <p>
              Mọi thắc mắc xin liên hệ:
              <br />
              <b className="hotline1">1800 8015</b>
            </p>

            <button className="btn-ok" onClick={() => setShowSuccess(false)}>
              Xác nhận
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
