import React, { useEffect, useState } from "react";
import "./FloatingContact.css";

import messengerIcon from "../../assets/messenger.png";
import zaloIcon from "../../assets/zalo.png";
import phone from "../../assets/contact/phone.png";
import booking from "../../assets/contact/DKK.png";
import arrowUp from "../../assets/arrow-up.png";
import arrowUp2 from "../../assets/arrow-up2.png";

export default function FloatingContact() {
  const [isNearFooter, setIsNearFooter] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const nearFooter = scrollTop + windowHeight >= documentHeight - 180;

      setIsNearFooter(nearFooter);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // chạy ngay lần đầu để sync state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="floating-left floating-wrapper">
        <a href="tel:18008015" className="left-btn hotline">
          <img src={phone} alt="hotline" />
          <span>1800 8015</span>
        </a>

        <a href="https://zalo.me/bvhvgl" className="left-btn booking">
          <img src={booking} alt="booking" />
          <span>Đặt lịch khám bệnh</span>
        </a>
      </div>

      <div className="floating-contact floating-wrapper">
        <a
          href="https://m.me/157566379728871"
          target="_blank"
          rel="noopener noreferrer"
          className="fc-item"
        >
          <img src={messengerIcon} alt="Messenger" />
        </a>

        <a
          href="https://zalo.me/bvhvgl"
          target="_blank"
          rel="noopener noreferrer"
          className="fc-item"
        >
          <img src={zaloIcon} alt="Zalo" />
        </a>

        <button
          className="fc-item scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Lên đầu trang"
        >
          <img
            src={isNearFooter ? arrowUp2 : arrowUp}
            alt="Lên đầu trang"
          />
        </button>
      </div>
    </>
  );
}
