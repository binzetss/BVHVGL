import React from "react";
import "./FloatingContact.css";

import messengerIcon from "../../assets/messenger.png";
import zaloIcon from "../../assets/zalo.png";
import phone from "../../assets/contact/phone.png";
import booking from "../../assets/contact/DKK.png";

export default function FloatingContact() {
  return (
    <>
      {/* ===== NÚT BÊN TRÁI ===== */}
      <div className="floating-left">

        <a href="tel:18008015" className="left-btn hotline">
          <img src={phone} alt="hotline" />
          <span>1800 8015</span>
        </a>

        <a href="/" className="left-btn booking">
          <img src={booking} alt="booking" />
          <span>Đăng ký khám</span>
        </a>

      </div>

      {/* ===== NÚT MESS + ZALO BÊN PHẢI ===== */}
      <div className="floating-contact">
        <a
          href="https://m.me/benhvienhungvuonggialai"
          target="_blank"
          rel="noopener noreferrer"
          className="fc-item"
        >
          <img src={messengerIcon} alt="Messenger" />
        </a>

        <a
          href="https://zalo.me/0914555115"
          target="_blank"
          rel="noopener noreferrer"
          className="fc-item"
        >
          <img src={zaloIcon} alt="Zalo" />
        </a>
      </div>
    </>
  );
}
