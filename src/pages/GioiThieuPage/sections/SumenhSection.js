import React, { useState } from "react";
import "./SumenhSection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

import loithe1 from "../../../assets/vechungtoi/loithediali.jpg";
import iconUser from "../../../assets/vechungtoi/voinguoibenh.png";
import iconStaff from "../../../assets/vechungtoi/voinhanvien.png";
import iconHome from "../../../assets/vechungtoi/voixahoi.png";
import searchIcon from "../../../assets/vechungtoi/seacrh.png";

import { LazyImage } from "../../../components/LazyImage/LazyImage";
import { geoData } from "./geoData";

export default function SumenhSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="sumenh-wrapper">
      {/* ===================== */}
      {/* 1) SỨ MỆNH */}
      {/* ===================== */}
      <div className="sm-container">
        <h2 className="sm-title">SỨ MỆNH CỦA CHÚNG TÔI</h2>

        <div className="sm-row">
          <div className="sm-box">
            <LazyImage src={iconUser} className="sm-icon" />
            <h4 className="sm-box-title">VỚI NGƯỜI BỆNH</h4>
            <p>
              Chúng tôi luôn nỗ lực hết mình để cứu chữa, mang lại sự sống cho
              người bệnh bằng kỹ thuật hiện đại, dịch vụ chăm sóc tận tình.
            </p>
          </div>

          <div className="sm-box">
            <LazyImage src={iconStaff} className="sm-icon" />
            <h4 className="sm-box-title">VỚI NHÂN VIÊN</h4>
            <p>
              Chúng tôi tạo môi trường làm việc chuyên nghiệp, giúp mọi nhân
              viên có cơ hội sáng tạo và cống hiến.
            </p>
          </div>

          <div className="sm-box">
            <LazyImage src={iconHome} className="sm-icon" />
            <h4 className="sm-box-title">VỚI XÃ HỘI</h4>
            <p>
              Chúng tôi luôn đồng hành với cộng đồng thông qua hoạt động thiện
              nguyện, giúp đỡ người bệnh khó khăn.
            </p>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* 2) TẦM NHÌN */}
      {/* ===================== */}
      <div className="vision-container">
        <h2 className="vision-title">TẦM NHÌN CỦA CHÚNG TÔI</h2>

        <div className="vision-main">
          <div className="vision-left">
            <img src={searchIcon} alt="Vision" className="vision-circle-icon" />
          </div>

          <div className="vision-right">
            <p>Trở thành bệnh viện tư nhân hàng đầu Việt Nam.</p>
            <p>Xây dựng thương hiệu dựa trên chất lượng và dịch vụ.</p>
            <p>
              Hợp tác với các tổ chức y tế trong và ngoài nước nhằm nâng cao
              chất lượng chuyên môn và công nghệ.
            </p>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* 3) LỢI THẾ – ẢNH TRÁI */}
      {/* ===================== */}
      <div className="lt-row">
        <div className="lt-left">
          <LazyImage src={loithe1} className="lt-img" alt="Lợi thế 1" />
        </div>

        <div className="lt-right">
          <h2 className="lt-title-left">LỢI THẾ ĐỊA LÝ CỦA HÙNG VƯƠNG</h2>

          <p>
            Gia Lai là một tỉnh miền núi, nằm ở phía Bắc Tây Nguyên, Phía Bắc
            giáp tỉnh Kon Tum, phía Nam giáp tỉnh Đắk Lắk, phía Tây giáp Vương
            quốc Campuchia, và phía Đông giáp tỉnh Quảng Ngãi và Biển Đông (qua
            địa phận tỉnh Bình Định, nay thuộc Gia Lai).
          </p>
        </div>
      </div>

      {/* ===================== */}
      {/* 4) LỢI THẾ – SWIPER SYNC */}
      {/* ===================== */}
      <div className="lt-geo-row">
        <div className="lt-geo-left">
          <h2 className="lt-title">{geoData[currentIndex].title}</h2>

          {geoData[currentIndex].desc.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="lt-geo-right">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            loop={true}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          >
            {geoData.map((item, idx) => (
              <SwiperSlide key={idx}>
                <img src={item.img} className="lt-geo-img" alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
