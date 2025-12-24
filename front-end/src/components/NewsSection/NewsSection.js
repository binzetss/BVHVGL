import React from "react";
import "./NewsSection.css";
import { LazyImage } from "../LazyImage/LazyImage";
import Lichicon from "../../assets/calendar2.png";

// ===== Demo images =====
import big from "../../assets/news-big.jpg";
import n1 from "../../assets/news1.jpg";
import n2 from "../../assets/news2.jpg";
import n3 from "../../assets/news3.jpg";
import n4 from "../../assets/news4.jpg";

export default function NewsSection() {
  const bigNews = {
    title: "THỜI ĐIỂM VÀNG TẦM SOÁT UNG THƯ VÚ",
    desc: "Những ưu điểm vượt trội của hệ thống máy MRI 1.5 Tesla Ingenia MR 5300 của Philips (Hà Lan)...",
    date: "01/12/2024",
    image: big,
  };

  const list = [
    { id: 1, title: bigNews.title, desc: bigNews.desc, image: n1 },
    { id: 2, title: bigNews.title, desc: bigNews.desc, image: n2 },
    { id: 3, title: bigNews.title, desc: bigNews.desc, image: n3 },
    { id: 4, title: bigNews.title, desc: bigNews.desc, image: n4 },
  ];

  return (
    <div className="news-wrapper">

      <h2 className="news-title">TIN TỨC VÀ SỰ KIỆN</h2>

      <div className="news-grid">

        {/* LEFT BIG NEWS */}
        <div className="news-big">

          <LazyImage 
            src={bigNews.image}
            alt={bigNews.title}
            className="news-big-img"
          />

          <div className="news-big-text">
            <h3>{bigNews.title}</h3>
            <p>{bigNews.desc}</p>
          </div>

          <div className="news-big-footer">
  <div className="news-big-line"></div>
 <div className="news-big-date">
  <span className="news-date-icon">
    <LazyImage src={Lichicon} alt="calendar" />
  </span>
  {bigNews.date}
</div>
</div>
        </div>

        {/* RIGHT LIST */}
        <div className="news-list">
          {list.map((item) => (
            <div className="news-item" key={item.id}>

              <LazyImage 
                src={item.image}
                alt={item.title}
                className="news-item-img"
              />

              <div className="news-item-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>

                <div className="news-item-link">
                  <span>XEM CHI TIẾT</span>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </div>
              </div>

            </div>
          ))}
         <div className="news-btn-right">
    <button className="news-btn">XEM THÊM TẤT CẢ TIN TỨC</button>
  </div>
        </div>

      </div>

     

    </div>
  );
}
