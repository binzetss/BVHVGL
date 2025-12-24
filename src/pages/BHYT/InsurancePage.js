// src/pages/BHYT/InsurancePage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPhoneAlt, FaRegClock, FaInfoCircle } from "react-icons/fa";
import "./InsurancePage.css";

export default function InsurancePage() {
  const navigate = useNavigate();

  // Mỗi lần vào trang cuộn lên đầu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="ins-wrapper">
      <div className="ins-inner">
        {/* ===== HERO ===== */}
        <div className="ins-hero">
          <div className="ins-hero-bg" />
          <div className="ins-hero-overlay" />
          <div className="ins-hero-text">
            <h1>Chế Độ BHYT &amp; Bảo Lãnh Viện Phí</h1>
            <p>
              Hướng dẫn chi tiết, dễ hiểu dành cho khách hàng sử dụng
              <strong> bảo hiểm y tế</strong> và các chương trình{" "}
              <strong>bảo lãnh viện phí</strong> tại bệnh viện.
            </p>
          </div>
        </div>

        {/* ===== BODY ===== */}
        <div className="ins-container">
          {/* ===== LEFT CONTENT ===== */}
          <div className="ins-left">
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <span className="link" onClick={() => navigate("/")}>
                <FaHome className="icon-home" /> TRANG CHỦ
              </span>
              <span className="sep">&gt;</span>
              <span className="current">
                Chế độ BHYT &amp; Bảo lãnh viện phí
              </span>
            </div>

            {/* ===== BLOCK CHÍNH ===== */}
            <section className="ins-block">
              {/* Tiêu đề & ghi chú cập nhật */}
              <div className="ins-block-header">
                <h2 className="ins-title">Thông tin chung</h2>
                <p className="ins-updated">Cập nhật lần cuối: 01/12/2025</p>
              </div>

              {/* Thẻ thông báo ngắn */}
              <div className="ins-note">
                <FaInfoCircle className="ins-note-icon" />
                <div>
                  <div className="ins-note-title">Lưu ý quan trọng</div>
                  <p>
                    Nội dung dưới đây chỉ mang tính chất hướng dẫn. Quyền lợi cụ
                    thể phụ thuộc vào <strong>thẻ BHYT</strong> và{" "}
                    <strong>hợp đồng bảo hiểm</strong> của từng khách hàng.
                  </p>
                </div>
              </div>

              {/* 1. Quyền lợi BHYT */}
              <div className="ins-section">
                <h3 className="ins-section-title">
                  1. Quyền lợi khám chữa bệnh BHYT
                </h3>
                <p className="ins-text">
                  Khách hàng có{" "}
                  <strong>thẻ bảo hiểm y tế (BHYT) còn hiệu lực</strong> khi đến
                  khám và điều trị tại bệnh viện sẽ được hưởng quyền lợi theo
                  đúng quy định của Nhà nước và cơ quan bảo hiểm. Tỷ lệ thanh
                  toán phụ thuộc vào mức hưởng ghi trên thẻ BHYT và tuyến đăng
                  ký khám chữa bệnh ban đầu.
                </p>
                <div className="ins-grid-two">
                  <div className="ins-card">
                    <h4 className="ins-card-title">Trường hợp đúng tuyến</h4>
                    <ul className="ins-list">
                      <li>
                        Được quỹ BHYT thanh toán theo mức hưởng ghi trên thẻ.
                      </li>
                      <li>
                        Thanh toán trực tiếp giữa bệnh viện và cơ quan BHYT đối
                        với các dịch vụ được hưởng.
                      </li>
                      <li>
                        Người bệnh chỉ thanh toán phần đồng chi trả (nếu có).
                      </li>
                    </ul>
                  </div>
                  <div className="ins-card">
                    <h4 className="ins-card-title">Trường hợp trái tuyến</h4>
                    <ul className="ins-list">
                      <li>
                        Được hưởng theo tỷ lệ thanh toán BHYT theo quy định hiện
                        hành.
                      </li>
                      <li>
                        Một số dịch vụ kỹ thuật cao, chi phí lớn có thể không
                        nằm trong phạm vi chi trả.
                      </li>
                      <li>
                        Khách hàng nên liên hệ trước để được tư vấn cụ thể từng
                        trường hợp.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. Quy trình sử dụng BHYT */}
              <div className="ins-section">
                <h3 className="ins-section-title">
                  2. Quy trình sử dụng BHYT tại bệnh viện
                </h3>
                <p className="ins-text">
                  Để được hỗ trợ tốt nhất, khách hàng vui lòng thực hiện theo{" "}
                  <strong>4 bước cơ bản</strong> sau:
                </p>
                <ol className="ins-steps">
                  <li>
                    <span className="ins-step-badge">Bước 1</span>
                    <div>
                      Đến quầy tiếp nhận, xuất trình{" "}
                      <strong>thẻ BHYT bản gốc</strong> và{" "}
                      <strong>giấy tờ tùy thân có ảnh</strong> (CCCD/CMND/giấy
                      khai sinh với trẻ em).
                    </div>
                  </li>
                  <li>
                    <span className="ins-step-badge">Bước 2</span>
                    <div>
                      Đăng ký khám tại khu vực dành cho bệnh nhân BHYT và nhận
                      số thứ tự khám.
                    </div>
                  </li>
                  <li>
                    <span className="ins-step-badge">Bước 3</span>
                    <div>
                      Thực hiện khám, làm cận lâm sàng (nếu có chỉ định) theo
                      hướng dẫn của bác sĩ.
                    </div>
                  </li>
                  <li>
                    <span className="ins-step-badge">Bước 4</span>
                    <div>
                      Hoàn tất thanh toán: BHYT thanh toán trực tiếp với bệnh
                      viện trong phạm vi được hưởng, khách hàng thanh toán phần
                      chênh lệch (nếu có).
                    </div>
                  </li>
                </ol>
              </div>

              {/* 3. Bảo lãnh viện phí */}
              <div className="ins-section">
                <h3 className="ins-section-title">
                  3. Chương trình bảo lãnh viện phí
                </h3>
                <p className="ins-text">
                  Bệnh viện hợp tác với nhiều{" "}
                  <strong>công ty bảo hiểm nhân thọ</strong> và{" "}
                  <strong>phi nhân thọ</strong> để triển khai dịch vụ{" "}
                  <strong>bảo lãnh viện phí</strong>, giúp khách hàng giảm gánh
                  nặng thanh toán chi phí ngay tại thời điểm điều trị.
                </p>

                <div className="ins-grid-two">
                  <div className="ins-card">
                    <h4 className="ins-card-title">Điều kiện áp dụng</h4>
                    <ul className="ins-list">
                      <li>Khách hàng có hợp đồng bảo hiểm còn hiệu lực.</li>
                      <li>
                        Nằm trong danh sách bệnh viện/ phòng khám được liên kết
                        bảo lãnh của công ty bảo hiểm.
                      </li>
                      <li>
                        Bệnh lý điều trị thuộc phạm vi chi trả theo quy tắc và
                        điều khoản hợp đồng.
                      </li>
                    </ul>
                  </div>
                  <div className="ins-card">
                    <h4 className="ins-card-title">Hồ sơ cần chuẩn bị</h4>
                    <ul className="ins-list">
                      <li>CMND/CCCD hoặc giấy tờ tùy thân có ảnh.</li>
                      <li>Thẻ bảo hiểm / Giấy chứng nhận bảo hiểm.</li>
                      <li>Thẻ BHYT (nếu có, để được hưởng đồng thời).</li>
                      <li>
                        Các giấy tờ theo yêu cầu riêng của từng công ty bảo
                        hiểm.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Danh sách công ty bảo hiểm liên kết */}
              <div className="ins-section">
                <h3 className="ins-section-title">
                  4. Một số công ty bảo hiểm đang liên kết
                </h3>
                <p className="ins-text">
                  Danh sách dưới đây mang tính chất minh họa. Bạn có thể cập
                  nhật lại cho đúng với thực tế của bệnh viện:
                </p>
                <div className="ins-tag-list">
                  <span className="ins-tag">Bảo hiểm Bảo Việt</span>
                  <span className="ins-tag">Bảo hiểm PVI</span>
                  <span className="ins-tag">Bảo hiểm PTI</span>
                  <span className="ins-tag">Bảo hiểm VietinBank</span>
                  <span className="ins-tag">Bảo hiểm Manulife</span>
                  <span className="ins-tag">Bảo hiểm Prudential</span>
                </div>
              </div>

              {/* 5. Câu hỏi thường gặp */}
              <div className="ins-section">
                <h3 className="ins-section-title">
                  5. Câu hỏi thường gặp (FAQ)
                </h3>
                <div className="ins-faq">
                  <div className="ins-faq-item">
                    <h4 className="ins-faq-q">
                      Tôi có thể sử dụng đồng thời BHYT và bảo hiểm thương mại
                      không?
                    </h4>
                    <p className="ins-text">
                      Hoàn toàn có thể. Thông thường, BHYT sẽ thanh toán trước
                      trong phạm vi được hưởng, phần chi phí còn lại (nếu thuộc
                      quyền lợi bảo hiểm thương mại) sẽ được công ty bảo hiểm
                      thanh toán theo quy định hợp đồng.
                    </p>
                  </div>
                  <div className="ins-faq-item">
                    <h4 className="ins-faq-q">
                      Nếu không đủ giấy tờ bảo lãnh viện phí thì xử lý thế nào?
                    </h4>
                    <p className="ins-text">
                      Trong trường hợp chưa đủ điều kiện bảo lãnh tại chỗ, khách
                      hàng có thể <strong>tạm thời tự thanh toán</strong> viện
                      phí, sau đó làm hồ sơ <strong>yêu cầu bồi thường</strong>{" "}
                      trực tiếp với công ty bảo hiểm.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ===== RIGHT SIDEBAR ===== */}
          <div className="ins-right">
            {/* Hộp hỗ trợ */}
            <div className="ins-side-box">
              <h3 className="ins-side-title">Cần hỗ trợ ngay?</h3>
              <p className="ins-side-text">
                Đội ngũ tư vấn BHYT &amp; bảo lãnh viện phí luôn sẵn sàng hỗ
                trợ.
              </p>
              <div className="ins-side-row">
                <FaPhoneAlt className="ins-side-icon" />
                <div>
                  <div className="ins-side-label">Hotline tư vấn</div>
                  <div className="ins-side-value">1800.8015</div>
                </div>
              </div>
              <div className="ins-side-row">
                <FaRegClock className="ins-side-icon" />
                <div>
                  <div className="ins-side-label">Thời gian làm việc</div>
                  <div className="ins-side-value">
                    07:00 – 20:00 (Thứ 2 – Chủ nhật)
                  </div>
                </div>
              </div>
            </div>

            {/* Hộp hướng dẫn nhanh */}
            <div className="ins-side-box">
              <h3 className="ins-side-title">Hướng dẫn nhanh</h3>
              <ul className="ins-side-list">
                <li>Chuẩn bị thẻ BHYT và giấy tờ tùy thân.</li>
                <li>
                  Thông báo với quầy tiếp nhận nếu có bảo hiểm thương mại.
                </li>
                <li>Giữ lại hóa đơn, chứng từ để làm bảo lãnh/bồi thường.</li>
                <li>Liên hệ quầy tư vấn nếu còn thắc mắc.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
