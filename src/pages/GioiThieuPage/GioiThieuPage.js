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
      <GioiThieuSection />
      <SumenhSection />
      <NhanSuTrangThietBiSection />
      <LichSuHinhThanh />
      <HopTacSection />
      <CustomerSection />
    </div>
  );
}
