// src/pages/ThuVien/albumSuKienData.js
// Sau này bạn thay nội dung file này bằng dữ liệu lấy từ API

import photo01 from "../../assets/thuvien/photo01.jpg";

// Ảnh demo (12 tấm giống nhau – bạn đổi path thật sau)
const baseImages = Array.from({ length: 12 }, (_, idx) => ({
  id: idx + 1,
  src: photo01,
}));

// ===== DANH SÁCH ALBUM SỰ KIỆN =====
export const albums = [
  {
    id: 1,
    title: 'MINI TALK “PHÒNG NGỪA BỆNH MỠ MÁU TIẾN TRIỂN THÀNH ĐỘT QUỴ”',
    heroCaption:
      "Toàn cảnh chương trình mini talk tại Bệnh viện Hùng Vương Gia Lai, nơi khách hàng được lắng nghe chia sẻ chuyên sâu về rối loạn mỡ máu, phòng ngừa đột quỵ và được tư vấn cá nhân hóa.",
    summaryShort: {
      intro:
        "Chương trình mini talk được tổ chức nhằm giúp khách hàng hiểu rõ hơn về bệnh lý rối loạn mỡ máu, nguy cơ dẫn đến đột quỵ và cách phòng ngừa hiệu quả. Tại sự kiện, khách tham dự được lắng nghe chia sẻ chuyên sâu từ bác sĩ, đặt câu hỏi trực tiếp và được tư vấn cá nhân hóa.",
      bullets: [
        "Giới thiệu tổng quan về mỡ máu và các yếu tố nguy cơ.",
        "Nhận diện sớm dấu hiệu cảnh báo đột quỵ.",
        "Tư vấn chế độ dinh dưỡng, vận động và theo dõi định kỳ.",
        "Chương trình ưu đãi gói tầm soát mỡ máu – tim mạch cho người tham dự.",
      ],
    },
    detail: {
      title: "Chi tiết chương trình mini talk",
      intro:
        "Chương trình được thiết kế dành cho khách hàng có nguy cơ hoặc đang mắc rối loạn mỡ máu, mong muốn hiểu rõ hơn về bệnh và cách phòng ngừa đột quỵ. Nội dung được chia thành nhiều phần, kết hợp giữa chia sẻ kiến thức và tương tác trực tiếp để người tham dự dễ hiểu, dễ áp dụng vào thực tế.",
      sections: [
        {
          heading: "1. Đón tiếp và sàng lọc ban đầu",
          bullets: [
            "Đón tiếp khách mời, hướng dẫn đăng ký tham dự chương trình.",
            "Đo huyết áp, cân nặng, chiều cao, tính chỉ số BMI.",
            "Khai thác nhanh tiền sử bệnh lý tim mạch, tăng huyết áp, đái tháo đường, rối loạn mỡ máu.",
          ],
        },
        {
          heading: "2. Phiên chia sẻ chuyên môn của bác sĩ",
          bullets: [
            "Trình bày tổng quan về rối loạn mỡ máu, vai trò của cholesterol và triglycerid trong cơ thể.",
            "Phân tích mối liên quan giữa mỡ máu cao, xơ vữa động mạch và nguy cơ đột quỵ, nhồi máu cơ tim.",
            "Cập nhật các khuyến cáo mới về mục tiêu kiểm soát mỡ máu cho từng nhóm đối tượng nguy cơ.",
          ],
        },
        {
          heading: "3. Hỏi – đáp, tư vấn cá nhân hóa",
          bullets: [
            "Khách tham dự đặt câu hỏi trực tiếp cho bác sĩ về kết quả xét nghiệm và tình trạng sức khỏe của mình.",
            "Tư vấn cách điều chỉnh chế độ ăn, thói quen sinh hoạt và sử dụng thuốc theo chỉ định.",
            "Hướng dẫn nhận biết sớm các dấu hiệu cảnh báo đột quỵ và thời điểm cần đến bệnh viện ngay.",
          ],
        },
        {
          heading: "4. Hoạt động trải nghiệm & ưu đãi sau chương trình",
          bullets: [
            "Khu vực chụp hình lưu niệm cùng bác sĩ và ekip chương trình.",
            "Giới thiệu các gói tầm soát mỡ máu – tim mạch với chính sách ưu đãi riêng cho khách tham dự mini talk.",
            "Hướng dẫn đặt lịch khám và theo dõi định kỳ tại Bệnh viện Hùng Vương Gia Lai.",
          ],
        },
      ],
      outro:
        "Thông qua mini talk, khách hàng không chỉ được trang bị kiến thức y khoa chính thống mà còn nhận được lộ trình theo dõi lâu dài, giúp chủ động bảo vệ sức khỏe bản thân và gia đình trước nguy cơ đột quỵ.",
    },
    images: baseImages,
  },

  // ===== ALBUM MẪU 2 =====
  {
    id: 2,
    title: "NGÀY HỘI SỨC KHỎE GIA ĐÌNH – THÁNG 3/2025",
    heroCaption:
      "Không khí sôi động tại Ngày hội sức khỏe gia đình với nhiều gian hàng tư vấn, khám sàng lọc và khu vui chơi cho trẻ em.",
    summaryShort: {
      intro:
        "Ngày hội sức khỏe gia đình được tổ chức nhằm khuyến khích người dân chủ động tầm soát bệnh lý mạn tính, nâng cao ý thức chăm sóc sức khỏe cho bản thân và người thân.",
      bullets: [
        "Khám sàng lọc miễn phí một số bệnh lý thường gặp.",
        "Tư vấn dinh dưỡng, luyện tập cho từng nhóm tuổi.",
        "Khu vui chơi, hoạt náo dành cho trẻ nhỏ.",
        "Bốc thăm trúng thưởng và nhận quà sức khỏe.",
      ],
    },
    detail: {
      title: "Chi tiết Ngày hội sức khỏe gia đình",
      intro:
        "Chương trình được triển khai cả trong nhà và ngoài trời, kết hợp thăm khám, tư vấn và hoạt động trải nghiệm cho cả gia đình.",
      sections: [
        {
          heading: "1. Khu vực khám sàng lọc",
          bullets: [
            "Đo huyết áp, đo đường huyết mao mạch, kiểm tra chỉ số BMI.",
            "Khám sàng lọc tim mạch, đái tháo đường, bệnh lý xương khớp.",
            "Tư vấn kết quả và hướng dẫn theo dõi định kỳ.",
          ],
        },
        {
          heading: "2. Khu tư vấn dinh dưỡng – lối sống",
          bullets: [
            "Thiết kế thực đơn tham khảo cho từng nhóm bệnh lý.",
            "Hướng dẫn lựa chọn thực phẩm lành mạnh phù hợp gia đình.",
            "Chia sẻ bài tập vận động đơn giản, dễ áp dụng tại nhà.",
          ],
        },
        {
          heading: "3. Hoạt động cho trẻ em & gia đình",
          bullets: [
            "Khu tô màu, xếp hình, mini game nhận quà.",
            "Góc chụp ảnh check-in cùng linh vật và backdrop chương trình.",
            "Trao thưởng cho các gia đình tham gia trò chơi vận động.",
          ],
        },
      ],
      outro:
        "Ngày hội khép lại trong không khí vui tươi, giúp các gia đình hiểu hơn về sức khỏe và gắn kết với Bệnh viện Hùng Vương Gia Lai như một người bạn đồng hành.",
    },
    images: baseImages,
  },

  // ===== ALBUM MẪU 3 =====
  {
    id: 3,
    title: "KHÁM SÀNG LỌC TIM MẠCH CHO CÔNG NHÂN KHU CÔNG NGHIỆP",
    heroCaption:
      "Đội ngũ bác sĩ tim mạch đến tận nhà máy để khám sàng lọc, giúp công nhân phát hiện sớm các yếu tố nguy cơ.",
    summaryShort: {
      intro:
        "Chương trình được triển khai tại khu công nghiệp nhằm tầm soát sớm bệnh lý tim mạch, huyết áp cho công nhân – đối tượng thường xuyên làm việc với cường độ cao.",
      bullets: [
        "Khám, đo huyết áp, điện tim ngay tại nhà máy.",
        "Tư vấn chế độ làm việc và nghỉ ngơi hợp lý.",
        "Phát hiện sớm các trường hợp nguy cơ cao cần theo dõi tại bệnh viện.",
      ],
    },
    detail: {
      title: "Chi tiết chương trình sàng lọc tim mạch",
      intro:
        "Đoàn bác sĩ, điều dưỡng được bố trí thành nhiều bàn khám lưu động, bảo đảm khám nhanh nhưng vẫn đầy đủ các bước cần thiết.",
      sections: [
        {
          heading: "1. Khâu tổ chức & tiếp nhận",
          bullets: [
            "Phối hợp với ban lãnh đạo khu công nghiệp sắp xếp lịch khám theo ca.",
            "Hướng dẫn công nhân điền phiếu sàng lọc và thông tin liên hệ.",
          ],
        },
        {
          heading: "2. Khám sàng lọc tại chỗ",
          bullets: [
            "Đo huyết áp, mạch, cân nặng, chiều cao.",
            "Thực hiện điện tim và một số xét nghiệm nhanh khi cần.",
            "Ghi nhận các triệu chứng cơ năng như đau ngực, khó thở, hồi hộp.",
          ],
        },
        {
          heading: "3. Tư vấn & theo dõi sau khám",
          bullets: [
            "Giải thích kết quả ngay cho từng người lao động.",
            "Phát phiếu giới thiệu khám chuyên sâu tại bệnh viện cho các trường hợp nguy cơ.",
            "Hướng dẫn thay đổi lối sống, chế độ ăn – ngủ – nghỉ phù hợp môi trường làm việc.",
          ],
        },
      ],
      outro:
        "Chương trình góp phần nâng cao ý thức chăm sóc sức khỏe tim mạch cho người lao động, giúp doanh nghiệp xây dựng môi trường làm việc an toàn và bền vững.",
    },
    images: baseImages,
  },
];

// Helper lấy album theo id (nếu không có trả về album đầu tiên)
export const getAlbumById = (id) => {
  const albumId = Number(id);
  return albums.find((a) => a.id === albumId) || albums[0];
};

// Dữ liệu cho slider “HÌNH ẢNH KHÁC” (trong trang chi tiết)
export const otherAlbums = albums.map((a, index) => ({
  id: a.id,
  title: a.title,
  count: 80 + index * 30,
  img: photo01,
}));
