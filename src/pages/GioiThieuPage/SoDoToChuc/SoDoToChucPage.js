// src/pages/GioiThieuPage/SoDoToChuc/SoDoToChuc.js
import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SoDoToChucPage.css";
import anhDuoi from "../../../assets/sodotochuc/anhduoi.jpg";

const chuTich = {
  name: "LUẬT SƯ PHẠM VĂN HỌC",
  role: "CHỦ TỊCH HDTV - TỔNG GIÁM ĐỐC",
  img: "https://image.bvhvgl.com/images/HDTV/TGD_PhamVanHoc.png",
  hdtvId: 1,
};

const phoTongGiamDoc = [
  {
    id: 1,
    name: "THẠC SĨ TRẦN LIÊN VIỆT",
    role: "PHÓ TỔNG GIÁM ĐỐC",
    img: "https://image.bvhvgl.com/images/HDTV/PTGD_TranLienViet.png",
    hdtvId: 2,
  },
  {
    id: 2,
    name: "BS.CKII ĐẶNG THANH HẢI",
    role: "PHÓ TỔNG GIÁM ĐỐC",
    img: "https://image.bvhvgl.com/images/HDTV/PTGD_DangThanhHai.png",
    hdtvId: 3,
  },
  {
    id: 3,
    name: "THẠC SĨ NGUYỄN THI",
    role: "PHÓ TỔNG GIÁM ĐỐC",
    img: "https://image.bvhvgl.com/images/HDTV/PTGD_NguyenThi.png",
    hdtvId: 4,
  },
  {
    id: 4,
    name: "ÔNG NGUYỄN HỒNG TOÀN",
    role: "THÀNH VIÊN HDTV",
    img: "https://image.bvhvgl.com/images/HDTV/HDTV_NguyenHongToan.png",
    hdtvId: 5,
  },
  {
    id: 5,
    name: "ÔNG ĐÀO TRỌNG TÚ",
    role: "THÀNH VIÊN HDTV",
    img: "https://image.bvhvgl.com/images/HDTV/HDTV_DaoTrongTu.png",
    hdtvId: 6,
  },
];

const giamDoc = {
  name: "GS.TS.BS NGUYỄN GIA BÌNH",
  role: "GIÁM ĐỐC Y KHOA",
  img: "https://image.bvhvgl.com/images/BGD/GD_NguyenGiaBinh.png",
  maSo: "00424", // 🔥 THÊM MÃ SỐ
};

const phoGiamDoc = [
  {
    id: 1,
    name: "BS.CKII BÙI VIỆT HOÀNG",
    role: "PHÓ GIÁM ĐỐC Y KHOA",
    img: "https://image.bvhvgl.com/images/BGD/PGD_BuiVietHoang.png",
    maSo: "00243", // 🔥 THÊM MÃ SỐ
  },
  {
    id: 2,
    name: "BS.CKII BÙI TRƯỜNG GIANG",
    role: "PHÓ GIÁM ĐỐC Y KHOA",
    img: "https://image.bvhvgl.com/images/BGD/PGD_BuiTruongGiang.png",
    maSo: "00061", // 🔥 THÊM MÃ SỐ
  },
  {
    id: 3,
    name: "THS.BS NGÔ HUY BẢO",
    role: "PHÓ GIÁM ĐỐC Y KHOA",
    img: "https://image.bvhvgl.com/images/BGD/PGD_NgoHuyBao.png",
    maSo: "00340", // 🔥 THÊM MÃ SỐ
  },
];

export default function SoDoToChuc() {
  const navigate = useNavigate();

  const handleClickHDTV = (id) => {
    if (!id) return;
    navigate(`/hoi-dong-thanh-vien/${id}`);
  };

  // 🔥 THÊM HANDLER CHO BÁC SĨ
  const handleClickDoctor = (maSo) => {
    if (!maSo) return;
    navigate(`/doi-ngu-bac-si/${maSo}`);
  };

  return (
    <div className="org-page">
      <div className="org-inner">
        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <span
            className="home-link"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <FaHome className="icon-home" /> TRANG CHỦ
          </span>
          <span className="sep">/</span>
          <span className="current">sơ đồ tổ chức</span>
        </div>

        <h1 className="org-title">HỘI ĐỒNG THÀNH VIÊN</h1>

        {/* Chủ tịch */}
        <div className="org-row-center">
          <div
            className="org-node main-layout no-line"
            onClick={() => handleClickHDTV(chuTich.hdtvId)}
          >
            <div className="org-photo2">
              <img src={chuTich.img} alt={chuTich.name} />
            </div>

            <div className="org-main-text">
              <div className="org-role main-role">{chuTich.role}</div>
              <div className="org-name main-name">{chuTich.name}</div>
            </div>
          </div>
        </div>

        <div className="line-vertical big" />
        <div className="line-horizontal big" />

        {/* Thành viên HDTV */}
        <div className="org-row-five">
          {phoTongGiamDoc.map((p) => (
            <div
              key={p.id}
              className="org-node"
              onClick={() => handleClickHDTV(p.hdtvId)}
            >
              <div className="org-photo">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="org-role main-role">{p.role}</div>
              <div className="org-name main-name">{p.name}</div>
            </div>
          ))}
        </div>

        <h1 className="org-title">BAN GIÁM ĐỐC</h1>

        {/* Giám đốc - 🔥 THÊM CLICK HANDLER */}
        <div className="org-row-center">
          <div
            className="org-node main-layout no-line-top"
            onClick={() => handleClickDoctor(giamDoc.maSo)}
            style={{ cursor: "pointer" }}
          >
            <div className="org-photo2">
              <img src={giamDoc.img} alt={giamDoc.name} />
            </div>

            <div className="org-main-text">
              <div className="org-role main-role">{giamDoc.role}</div>
              <div className="org-name main-name">{giamDoc.name}</div>
            </div>
          </div>
        </div>

        <div className="line-vertical big2" />
        <div className="line-horizontal small" />

        {/* Phó giám đốc - 🔥 THÊM CLICK HANDLER */}
        <div className="org-row-three">
          {phoGiamDoc.map((p) => (
            <div
              key={p.id}
              className="org-node"
              onClick={() => handleClickDoctor(p.maSo)}
              style={{ cursor: "pointer" }}
            >
              <div className="org-photo">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="org-role main-role">{p.role}</div>
              <div className="org-name main-name">{p.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="org-footer-image">
        <img src={anhDuoi} alt="Sơ đồ tổ chức BVHGVGL" />
      </div>
    </div>
  );
}
