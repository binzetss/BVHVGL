// src/pages/ThuVien/thuVienData.js

// ẢNH DÙNG LÀM THUMBNAIL (tạm thời dùng 1 ảnh chung)
import photo01 from "../../assets/thuvien/photo01.jpg";
import bg1 from "../../assets/thuvien/VIDEO/banner2.jpg";
import bg2 from "../../assets/thuvien/VIDEO/banner3.jpg";
import bg3 from "../../assets/thuvien/VIDEO/banner4.jpg";
import bg4 from "../../assets/thuvien/VIDEO/banner5.jpg";
import bg5 from "../../assets/thuvien/VIDEO/news2.jpg";

// VIDEO MP4 THẬT
import videoSrc01 from "../../assets/thuvien/VIDEO/video1.mp4";
import videoSrc02 from "../../assets/thuvien/VIDEO/video2.mp4";
import videoSrc03 from "../../assets/thuvien/VIDEO/video3.mp4";
import videoSrc04 from "../../assets/thuvien/VIDEO/video4.mp4";

// ====== THƯ VIỆN ẢNH ======
export const photoItems = [
  {
    id: 1,
    title:
      "Khoa phụ sản liên tiếp thực hiện thành công 3 ca phẫu thuật nội soi",
    img: photo01,
  },
  {
    id: 2,
    title: "Lễ ký kết hợp tác chuyên môn với bệnh viện tuyến trên",
    img: photo01,
  },
  {
    id: 3,
    title:
      "Hội thảo khoa học về sản phụ khoa tại Bệnh viện Hùng Vương Gia Lai",
    img: photo01,
  },
  {
    id: 4,
    title: "Khám sức khỏe định kỳ cho cán bộ nhân viên",
    img: photo01,
  },
  {
    id: 5,
    title: "Trao giấy khen cho tập thể khoa có thành tích xuất sắc",
    img: photo01,
  },
  {
    id: 6,
    title: "Các bác sĩ tham quan hệ thống trang thiết bị mới",
    img: photo01,
  },
  {
    id: 7,
    title: "Hoạt động thiện nguyện tại vùng sâu vùng xa",
    img: photo01,
  },
  {
    id: 8,
    title: "Tập huấn cấp cứu sản khoa cho tuyến dưới",
    img: photo01,
  },
  {
    id: 9,
    title: "Khám tầm soát bệnh lý thai kỳ cho sản phụ",
    img: photo01,
  },
  {
    id: 10,
    title: "Hội thi tay nghề điều dưỡng – hộ sinh",
    img: photo01,
  },
  {
    id: 11,
    title: "Khai trương khu khám dịch vụ chất lượng cao",
    img: photo01,
  },
  {
    id: 12,
    title: "Các hoạt động văn nghệ – thể thao nội bộ",
    img: photo01,
  },
];

// ====== THƯ VIỆN VIDEO (dùng file MP4 local) ======
export const videoItems = [
  {
    id: 1,
    title:
      "Thoát ung thư sớm trực tràng trong 24h – không mổ mở nhờ nội soi cao cấp",
    thumb: bg1,      // thumbnail (tạm dùng photo01, sau này đổi ảnh riêng)
    src: videoSrc01,     // đường dẫn file mp4
    category: "Câu chuyện khách hàng",
    duration: "12:34",
    date: "03/2025",
    description:
      "Khách hàng phát hiện ung thư sớm trực tràng trong giai đoạn còn khu trú, được chỉ định phẫu thuật nội soi cắt đoạn trực tràng với hệ thống nội soi hiện đại, giúp bảo tồn tối đa chức năng và rút ngắn thời gian hồi phục.",
  },
  {
    id: 2,
    title: "Hành trình vượt qua ung thư vú của người mẹ trẻ",
    thumb: bg2,
    src: videoSrc02,
    category: "Câu chuyện khách hàng",
    duration: "15:20",
    date: "02/2025",
    description:
      "Người mẹ trẻ phát hiện ung thư vú trong giai đoạn sớm thông qua tầm soát định kỳ, từ đó có phác đồ điều trị kịp thời và hiệu quả.",
  },
  {
    id: 3,
    title: "Nội soi tiêu hóa phát hiện sớm polyp tiền ung thư",
    thumb: bg3,
    src: videoSrc03,
    category: "Chuyên môn tiêu hóa",
    duration: "09:48",
    date: "01/2025",
    description:
      "Bác sĩ chia sẻ về vai trò của nội soi tiêu hóa trong phát hiện sớm polyp và các tổn thương tiền ung thư đường tiêu hóa.",
  },
  {
    id: 4,
    title: "Câu chuyện sinh con an toàn của sản phụ nguy cơ cao",
    thumb: bg4,
    src: videoSrc04,
    category: "Sản phụ khoa",
    duration: "11:05",
    date: "12/2024",
    description:
      "Trường hợp sản phụ có nhiều yếu tố nguy cơ nhưng vẫn sinh con an toàn nhờ phối hợp chặt chẽ giữa các chuyên khoa.",
  },
   {
    id: 5,
    title: "Trường hợp sản phụ có nhiều yếu tố nguy cơ nhưng vẫn sinh con an toàn nhờ phối hợp chặt chẽ giữa các chuyên khoa.",
    thumb: bg5,
    src: videoSrc04,
    category: "Sản phụ khoa",
    duration: "11:05",
    date: "12/2024",
    description:
      "Trường hợp sản phụ có nhiều yếu tố nguy cơ nhưng vẫn sinh con an toàn nhờ phối hợp chặt chẽ giữa các chuyên khoa.",
  },
   {
    id: 1,
    title:
      "Thoát ung thư sớm trực tràng trong 24h – không mổ mở nhờ nội soi cao cấp",
    thumb: bg1,      // thumbnail (tạm dùng photo01, sau này đổi ảnh riêng)
    src: videoSrc01,     // đường dẫn file mp4
    category: "Câu chuyện khách hàng",
    duration: "12:34",
    date: "03/2025",
    description:
      "Khách hàng phát hiện ung thư sớm trực tràng trong giai đoạn còn khu trú, được chỉ định phẫu thuật nội soi cắt đoạn trực tràng với hệ thống nội soi hiện đại, giúp bảo tồn tối đa chức năng và rút ngắn thời gian hồi phục.",
  },
  {
    id: 2,
    title: "Hành trình vượt qua ung thư vú của người mẹ trẻ",
    thumb: bg2,
    src: videoSrc02,
    category: "Câu chuyện khách hàng",
    duration: "15:20",
    date: "02/2025",
    description:
      "Người mẹ trẻ phát hiện ung thư vú trong giai đoạn sớm thông qua tầm soát định kỳ, từ đó có phác đồ điều trị kịp thời và hiệu quả.",
  },
  {
    id: 3,
    title: "Nội soi tiêu hóa phát hiện sớm polyp tiền ung thư",
    thumb: bg3,
    src: videoSrc03,
    category: "Chuyên môn tiêu hóa",
    duration: "09:48",
    date: "01/2025",
    description:
      "Bác sĩ chia sẻ về vai trò của nội soi tiêu hóa trong phát hiện sớm polyp và các tổn thương tiền ung thư đường tiêu hóa.",
  },
  {
    id: 4,
    title: "Câu chuyện sinh con an toàn của sản phụ nguy cơ cao",
    thumb: bg4,
    src: videoSrc04,
    category: "Sản phụ khoa",
    duration: "11:05",
    date: "12/2024",
    description:
      "Trường hợp sản phụ có nhiều yếu tố nguy cơ nhưng vẫn sinh con an toàn nhờ phối hợp chặt chẽ giữa các chuyên khoa.",
  },
   {
    id: 5,
    title: "Trường hợp sản phụ có nhiều yếu tố nguy cơ nhưng vẫn sinh con an toàn nhờ phối hợp chặt chẽ giữa các chuyên khoa.",
    thumb: bg5,
    src: videoSrc04,
    category: "Sản phụ khoa",
    duration: "11:05",
    date: "12/2024",
    description:
      "Trường hợp sản phụ có nhiều yếu tố nguy cơ nhưng vẫn sinh con an toàn nhờ phối hợp chặt chẽ giữa các chuyên khoa.",
  },
   {
    id: 1,
    title:
      "Thoát ung thư sớm trực tràng trong 24h – không mổ mở nhờ nội soi cao cấp",
    thumb: bg1,      // thumbnail (tạm dùng photo01, sau này đổi ảnh riêng)
    src: videoSrc01,     // đường dẫn file mp4
    category: "Câu chuyện khách hàng",
    duration: "12:34",
    date: "03/2025",
    description:
      "Khách hàng phát hiện ung thư sớm trực tràng trong giai đoạn còn khu trú, được chỉ định phẫu thuật nội soi cắt đoạn trực tràng với hệ thống nội soi hiện đại, giúp bảo tồn tối đa chức năng và rút ngắn thời gian hồi phục.",
  },
  {
    id: 2,
    title: "Hành trình vượt qua ung thư vú của người mẹ trẻ",
    thumb: bg2,
    src: videoSrc02,
    category: "Câu chuyện khách hàng",
    duration: "15:20",
    date: "02/2025",
    description:
      "Người mẹ trẻ phát hiện ung thư vú trong giai đoạn sớm thông qua tầm soát định kỳ, từ đó có phác đồ điều trị kịp thời và hiệu quả.",
  },
];
