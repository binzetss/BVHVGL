import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import {
  Box,
  Drawer,
  Toolbar,
  AppBar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Avatar,
  Button,
} from "@mui/material";

import "../admin/AdminNewsTheme.css";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ChecklistIcon from "@mui/icons-material/ChecklistRounded";

/* ===== IMPORT PAGE ===== */
import DepartmentDetailFormPage from "./DepartmentDetailFormPage";
import DichVuDetailFormPage from "./DichVuDetailFormPage";
import AdminNewsFormPage from "./AdminNewsFormPage";
import NewsCategoryFormPage from "./NewsCategoryFormPage";
import WorkflowAdminPage from "./WorkflowAdminPage";
import TienIchAdminPage from "./TienIchAdminPage";
import AdminPricePage from "./AdminPricePage";
import HistoryTimelineForm from "./history/HistoryTimelineForm";
import CooperationAdminForm from "./hoptac/CooperationAdminForm";
import SponsorAdminForm from "./CustomerSection/SponsorAdminForm";
import MediaAlbumAdminPage from "./Album/MediaAlbumAdminPage";
import AboutHospitalAdminPage from "./gioithieu/AboutHospitalAdminPage";
import CoSoVatChatAdminPage from "./cosovatchat/CoSoVatChatAdminPage";

/* ===== BÁC SĨ ===== */
import BacSiAdminList from "./BacSiCMS/BacSiCMSList";
import BacSiAdminDetail from "./BacSiCMS/BacSiCMSDetail";

/* ===== CƠ SỞ ===== */
import BranchAdminPage from "./Branches/BranchAdminPage";

/* ===== LOGIN ===== */
import LoginDialog from "./LoginDialog";
import { getAuth, clearAuth } from "../../auth/authStorage";

const drawerWidth = 260;

export default function AdminLayout() {
  /* ================= AUTH ================= */
  const [auth, setAuth] = useState(() => getAuth());
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= MENU STATE ================= */
  const [openMenu, setOpenMenu] = useState({
    chuyenKhoa: true,
    dichVu: true,
    news: true,
    operations: true,
    cosovatchat: true,
    history: true,
  });

  const toggleMenu = (key) =>
    setOpenMenu((prev) => ({ ...prev, [key]: !prev[key] }));

  /* ================= PAGE TITLE ================= */
  const pathname = location.pathname;

  const pageTitle =
    pathname.startsWith("/admin/bac-si/")
      ? "Nhập nội dung Bác sĩ"
      : pathname === "/admin/bac-si"
      ? "Quản lý nội dung Bác sĩ"
      : pathname.includes("/branch")
      ? "Quản lý Cơ sở"
      : pathname.includes("/department")
      ? "Quản lý Chuyên khoa"
      : pathname.includes("/dichvu")
      ? "Quản lý Dịch vụ"
      : pathname.includes("/news-category")
      ? "Quản lý Nhóm tin"
      : pathname.includes("/news")
      ? "Quản lý Tin tức"
      : pathname.includes("/workflow")
      ? "Quản lý Quy trình khám bệnh"
      : pathname.includes("/tienich")
      ? "Quản lý Tiện ích"
      : pathname.includes("/price")
      ? "Quản lý Bảng giá"
      : pathname.includes("/cosovatchat")
      ? "Quản lý Cơ sở vật chất"
      : pathname.includes("/history")
      ? "Quản lý Lịch sử hình thành"
      : pathname.includes("/about-hospital")
      ? "Giới thiệu bệnh viện"
      : pathname.includes("/cooperation")
      ? "Hợp tác & đào tạo"
      : pathname.includes("/sponsor")
      ? "Nhà tài trợ"
      : pathname.includes("/media-albums")
      ? "Media Album"
      : "";

  /* ================= AUTH CHECK ================= */
  if (!auth?.user) {
    return <LoginDialog open={true} onSuccess={setAuth} />;
  }

  const { user } = auth;

  const handleLogout = () => {
    clearAuth();
    setAuth(null);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#fff" }}>
      {/* ================= TOP BAR ================= */}
      <AppBar
        position="fixed"
        className="admin-topbar"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            {pageTitle}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: "#fff", textAlign: "right" }}>
              {user.role?.toUpperCase()}
              <br />
              <span style={{ fontSize: 12, opacity: 0.7 }}>{user.name}</span>
            </Typography>

            <Avatar />

            <Button
              size="small"
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#fff" }}
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ================= SIDEBAR ================= */}
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#fff",
            borderRight: "1px solid #d1d9e6",
          },
        }}
      >
        <Toolbar>
          <Typography sx={{ fontWeight: "bold" }}>
            BỆNH VIỆN HÙNG VƯƠNG
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {/* ===== BÁC SĨ ===== */}
          <ListItemButton onClick={() => navigate("/admin/bac-si")}>
            <ListItemIcon>
              <LocalHospitalIcon sx={{ color: "#2563eb" }} />
            </ListItemIcon>
            <ListItemText primary="Bác sĩ" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          {/* ===== CƠ SỞ ===== */}
          <ListItemButton onClick={() => navigate("/admin/branch")}>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Cơ sở" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          {/* ===== CHUYÊN KHOA ===== */}
          <ListItemButton onClick={() => toggleMenu("chuyenKhoa")}>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Chuyên khoa" />
            {openMenu.chuyenKhoa ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenu.chuyenKhoa}>
            <List sx={{ pl: 4 }}>
              <ListItemButton onClick={() => navigate("/admin/department")}>
                <ListItemText primary="Quản lý chuyên khoa" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* ===== DỊCH VỤ ===== */}
          <ListItemButton onClick={() => toggleMenu("dichVu")}>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Dịch vụ" />
            {openMenu.dichVu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenu.dichVu}>
            <List sx={{ pl: 4 }}>
              <ListItemButton onClick={() => navigate("/admin/dichvu")}>
                <ListItemText primary="Quản lý dịch vụ" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* ===== TIN TỨC ===== */}
          <ListItemButton onClick={() => toggleMenu("news")}>
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary="Tin tức" />
            {openMenu.news ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenu.news}>
            <List sx={{ pl: 4 }}>
              <ListItemButton onClick={() => navigate("/admin/news-category")}>
                <ListItemText primary="Nhóm tin" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/admin/news")}>
                <ListItemText primary="Tin tức" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* ===== VẬN HÀNH ===== */}
          <ListItemButton onClick={() => toggleMenu("operations")}>
            <ListItemIcon>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary="Danh mục vận hành" />
            {openMenu.operations ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenu.operations}>
            <List sx={{ pl: 4 }}>
              <ListItemButton onClick={() => navigate("/admin/workflow")}>
                <ListItemText primary="Quy trình khám bệnh" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/admin/tienich")}>
                <ListItemText primary="Tiện ích" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/admin/price")}>
                <ListItemText primary="Bảng giá" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* ===== CƠ SỞ VẬT CHẤT ===== */}
          <ListItemButton onClick={() => toggleMenu("cosovatchat")}>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Cơ sở vật chất" />
            {openMenu.cosovatchat ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenu.cosovatchat}>
            <List sx={{ pl: 4 }}>
              <ListItemButton onClick={() => navigate("/admin/cosovatchat")}>
                <ListItemText primary="Cơ sở vật chất" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* ===== GIỚI THIỆU ===== */}
          <ListItemButton onClick={() => toggleMenu("history")}>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Giới thiệu & Lịch sử" />
            {openMenu.history ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMenu.history}>
            <List sx={{ pl: 4 }}>
              <ListItemButton onClick={() => navigate("/admin/about-hospital")}>
                <ListItemText primary="Giới thiệu bệnh viện" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/admin/history")}>
                <ListItemText primary="Timeline lịch sử" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/admin/cooperation")}>
                <ListItemText primary="Hợp tác & đào tạo" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/admin/sponsor")}>
                <ListItemText primary="Nhà tài trợ" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => navigate("/admin/media-albums")}>
            <ListItemText primary="Media Album" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        component="main"
        className="admin-panel"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          mt: "72px",
          p: 3,
        }}
      >
        <Routes>
          <Route path="bac-si" element={<BacSiAdminList />} />
          <Route path="bac-si/:maSo" element={<BacSiAdminDetail />} />

          <Route path="branch" element={<BranchAdminPage />} />

          <Route path="department" element={<DepartmentDetailFormPage />} />
          <Route path="dichvu" element={<DichVuDetailFormPage />} />
          <Route path="news-category" element={<NewsCategoryFormPage />} />
          <Route path="news" element={<AdminNewsFormPage />} />
          <Route path="workflow" element={<WorkflowAdminPage />} />
          <Route path="tienich" element={<TienIchAdminPage />} />
          <Route path="price" element={<AdminPricePage />} />
          <Route path="cosovatchat" element={<CoSoVatChatAdminPage />} />
          <Route path="history" element={<HistoryTimelineForm />} />
          <Route path="about-hospital" element={<AboutHospitalAdminPage />} />
          <Route path="cooperation" element={<CooperationAdminForm />} />
          <Route path="sponsor" element={<SponsorAdminForm />} />
          <Route path="media-albums" element={<MediaAlbumAdminPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
