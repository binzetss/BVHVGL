import React from "react";
import GioiThieuSlider from "../../components/Slider/GioiThieuSlider";
import "./GioiThieuPage.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import GioiThieuSection from "./sections/GioiThieuSection";
import SumenhSection from "./sections/SumenhSection";
import NhanSuTrangThietBiSection from "./NhanSuTrangThietBi/NhanSuTrangThietBiSection";
import CustomerSection from "../../components/CustomerSection/CustomerSection";
import LichSuHinhThanh from "./LichSuHinhThanh/LichSuHinhThanh";
import HopTacSection from "./HopTacSection/HopTacSection";

export default function GioiThieuPage() {
  return (
    <div className="gt-wrapper">
      <GioiThieuSlider />

      <div className="breadcrumb">
        <a href="/" className="home-link">
          <FaHome className="icon-home" /> TRANG CHỦ
        </a>
        <span className="sep">/</span>
        <span className="current">Về chúng tôi</span>
      </div>

      <GioiThieuSection />
      <SumenhSection />
      <NhanSuTrangThietBiSection />
      <LichSuHinhThanh />
      <HopTacSection />
      <CustomerSection />
    </div>
  );
}
