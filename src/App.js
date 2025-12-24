import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";

/* WEBSITE LAYOUT */
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FloatingContact from "./components/FloatingContact/FloatingContact";
import "leaflet/dist/leaflet.css";
/* Website pages */
import Home from "./pages/Home/Home";
import BookingPage from "./components/BookingSection/BookingPage";
import GioiThieuPage from "./pages/GioiThieuPage/GioiThieuPage";
import DoiNguBacSi from "./pages/GioiThieuPage/DoiNguBacSi/doingubacsi";
import DoctorDetail from "./pages/GioiThieuPage/DoiNguBacSi/DoctorDetail";
import SoDoToChucPage from "./pages/GioiThieuPage/SoDoToChuc/SoDoToChucPage";
import ThuVienMedia from "./pages/ThuVien/ThuVienMedia";
import AlbumSuKienDetail from "./pages/ThuVien/AlbumSuKienDetail";
import AlbumSuKienDetailVideo from "./pages/ThuVien/AlbumSuKienDetailVideo";
import CoSoVatChatPage from "./pages/GioiThieuPage/CoSoVatChat/CoSoVatChat";
import DepartmentListPage from "./pages/ChuyenKhoa/DepartmentListPage";
import DepartmentDetailPage from "./pages/ChuyenKhoa/DepartmentDetailPage";
import DichVuPage from "./pages/DichVu/DichVuPage";
import ServiceDetailPage from "./pages/DichVu/ServiceDetailPage";
import TinHoatDong from "./pages/TinTuc/TinHoatDong";
import NewsDetail from "./pages/TinTuc/NewsDetail";
import ContactPage from "./pages/LienHe/ContactPage";
import PriceListPage from "./pages/Banggia/PriceListPage";
import PriceDetailPage from "./pages/Banggia/PriceDetailPage";
import BranchesPage from "./pages/benhvienvetinh/BranchesPage";
import BranchDetailPage from "./pages/benhvienvetinh/BranchDetailPage";
import QuyTrinhListPage from "./pages/QuyTrinh/QuyTrinhListPage";
import QuyTrinhDetailPage from "./pages/QuyTrinh/QuyTrinhDetailPage";
import TienIchListPage from "./pages/TienIch/TienIchListPage";
import TienIchDetailPage from "./pages/TienIch/TienIchDetailPage";
import InsurancePage from "./pages/BHYT/InsurancePage";
import AppDownloadPage from "./pages/HVGL/AppDownloadPage";

/* ADMIN */
import AdminLayout from "./pages/admin/AdminLayout";

function WebsiteLayout() {

  useEffect(() => {
    if (window.innerWidth > 768) return;

    const floatings = document.querySelectorAll(".floating-wrapper");
    if (!floatings.length) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const nearBottom = scrollTop + windowHeight >= documentHeight - 180;

      floatings.forEach((el) => {
        if (nearBottom) {
          el.classList.add("hide-floating");
        } else {
          el.classList.remove("hide-floating");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />
      <FloatingContact />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dat-lich-kham" element={<BookingPage />} />
        <Route path="/gioi-thieu" element={<GioiThieuPage />} />
        <Route path="/doi-ngu-bac-si" element={<DoiNguBacSi />} />
        <Route path="/doi-ngu-bac-si/:id" element={<DoctorDetail />} />
        <Route path="/so-do-to-chuc" element={<SoDoToChucPage />} />
        <Route path="/thu-vien" element={<ThuVienMedia />} />
        <Route path="/thu-vien/anh-su-kien/:id" element={<AlbumSuKienDetail />} />
        <Route path="/thu-vien/video/:id" element={<AlbumSuKienDetailVideo />} />
        <Route path="/co-so-vat-chat" element={<CoSoVatChatPage />} />
        <Route path="/chuyen-khoa" element={<DepartmentListPage />} />
        <Route path="/chuyen-khoa/:id" element={<DepartmentDetailPage />} />
        <Route path="/dich-vu" element={<DichVuPage />} />
        <Route path="/dich-vu/:id" element={<ServiceDetailPage />} />
        <Route path="/tin-tuc" element={<TinHoatDong />} />
        <Route path="/tin-tuc/:id" element={<NewsDetail />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/bang-gia" element={<PriceListPage />} />
        <Route path="/bang-gia/:id" element={<PriceDetailPage />} />
        <Route path="/benh-vien-ve-tinh" element={<BranchesPage />} />
        <Route path="/co-so/:id" element={<BranchDetailPage />} />
        <Route path="/quy-trinh-kham-benh" element={<QuyTrinhListPage />} />
        <Route path="/quy-trinh/:id" element={<QuyTrinhDetailPage />} />
        <Route path="/tien-ich" element={<TienIchListPage />} />
        <Route path="/tien-ich/:id" element={<TienIchDetailPage />} />
        <Route path="/che-do-bhyt-bao-lanh" element={<InsurancePage />} />
        <Route path="/tai-app-hvgl-care" element={<AppDownloadPage />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path="/*" element={<WebsiteLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
