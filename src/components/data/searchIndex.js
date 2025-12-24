// ==============================
// 🇻🇳 HÀM CHUẨN HÓA TIẾNG VIỆT
// ==============================
export function normalize(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

// ==============================
// ✂ HÀM TẠO VIẾT TẮT
// ==============================
export function makeShort(str) {
  const words = normalize(str).split(" ").filter(Boolean);
  return words.map((w) => w[0]).join(""); 
}

// ==============================
// 📌 DATA MENU SEARCH
// ==============================
export const menuSearchData = [
  { title: "Giới thiệu chung", path: "/gioi-thieu" },
  { title: "Đội ngũ bác sĩ", path: "/doi-ngu-bac-si" },
  { title: "Cơ sở vật chất", path: "/co-so-vat-chat" },
  { title: "Sơ đồ tổ chức", path: "/so-do-to-chuc" },
  { title: "Thư viện", path: "/thu-vien" },
  { title: "Giới thiệu về bệnh viện", path: "/gioi-thieu" },
    { title: "Về Chúng Tôi", path: "/gioi-thieu" },

  { title: "Khoa Sản", path: "/khoa-san/" },
  { title: "Khoa Nhi", path: "/chuyen-khoa/10" },
  { title: "Khoa Nội tổng hợp", path: "/khoa-noi-tong-hop" },
  { title: "Khoa Ngoại", path: "/khoa-ngoai" },
  { title: "Khoa Y học cổ truyền", path: "/khoa-y-hoc-co-truyen" },

  { title: "Khám bệnh yêu cầu", path: "/kham-benh-yeu-cau" },
  // { title: "Gói thai sản trọn gói", path: "/goi-thai-san" },
  { title: "Xét nghiệm", path: "/xet-nghiem" },
  { title: "Chẩn đoán hình ảnh", path: "/chan-doan-hinh-anh" },
  { title: "Cấp cứu 24/7", path: "/cap-cuu" },

  { title: "Tin nổi bật", path: "/tin-noi-bat" },
  { title: "Tin hoạt động", path: "/tin-hoat-dong" },
  { title: "Hướng dẫn sức khỏe", path: "/huong-dan-suc-khoe" },
  { title: "Tuyển dụng", path: "/tuyen-dung" },

  { title: "Hướng dẫn đặt lịch", path: "/huong-dan-dat-lich" },
  { title: "Quy trình khám bệnh", path: "/quy-trinh-kham-benh" },
  { title: "Quy định nhập viện", path: "/quy-dinh-nhap-vien" },
  { title: "Bảo hiểm y tế", path: "/che-do-bhyt-bao-lanh" },
  { title: "Bảng giá dịch vụ", path: "/bang-gia" },
    { title: "Đặt lịch khám bệnh", path: "/dat-lich-kham" },

  { title: "Thông tin liên hệ", path: "/lien-he" },
  { title: "Trang Chủ", path: "/" },
  { title: "Đường đi", path: "/duong-di" },
  { title: "Gửi góp ý", path: "/gop-y" },
];
