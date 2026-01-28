import React, { useState } from "react";
import { API_BASE } from "../../config";
import classes from "./TraCuuTuyenDung.module.css";

function TraCuuTuyenDung() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!token.trim()) {
      setError("Vui lòng nhập mã ứng tuyển");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/hvoffice/tuyen-dung/token/${token.trim()}`);

      if (!res.ok) {
        if (res.status === 404) {
          setError("Không tìm thấy thông tin ứng tuyển với mã này");
        } else {
          setError("Có lỗi xảy ra, vui lòng thử lại");
        }
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const getTrangThaiText = (idTrangThai) => {
    switch (idTrangThai) {
      case 1:
        return { text: "Chờ xử lý", color: "#f59e0b", bg: "#fef3c7" };
      case 2:
        return { text: "Đang xem xét", color: "#0e73ba", bg: "#e3f0ff" };
      case 3:
        return { text: "Đã duyệt", color: "#10b981", bg: "#d1fae5" };
      case 4:
        return { text: "Từ chối", color: "#ef4444", bg: "#fee2e2" };
      default:
        return { text: "Không xác định", color: "#6b7280", bg: "#f3f4f6" };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.iconWrapper}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M42 42L33.42 33.42M38 22C38 30.8366 30.8366 38 22 38C13.1634 38 6 30.8366 6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className={classes.title}>Tra Cứu Hồ Sơ Ứng Tuyển</h1>
          <p className={classes.subtitle}>
            Nhập mã ứng tuyển đã được gửi qua email để tra cứu trạng thái hồ sơ của bạn
          </p>
        </div>

        <form onSubmit={handleSearch} className={classes.searchForm}>
          <div className={classes.inputGroup}>
            <input
              type="text"
              placeholder="Nhập mã ứng tuyển (VD: A3K9M2L5P8Q1R7T4)"
              value={token}
              onChange={(e) => setToken(e.target.value.toUpperCase())}
              className={classes.searchInput}
              maxLength={50}
            />
            <button
              type="submit"
              disabled={loading}
              className={classes.searchButton}
            >
              {loading ? (
                <div className={classes.spinner}></div>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Tra cứu
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className={classes.errorBox}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#ef4444" strokeWidth="1.5"/>
              <path d="M10 6V10M10 14H10.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className={classes.resultContainer}>
            <div className={classes.statusCard}>
              <div className={classes.statusHeader}>
                <span className={classes.statusLabel}>Trạng thái hồ sơ</span>
                <span
                  className={classes.statusBadge}
                  style={{
                    backgroundColor: getTrangThaiText(result.idTrangThaiTuyenDung).bg,
                    color: getTrangThaiText(result.idTrangThaiTuyenDung).color,
                  }}
                >
                  {getTrangThaiText(result.idTrangThaiTuyenDung).text}
                </span>
              </div>
            </div>

            <div className={classes.infoCard}>
              <h3 className={classes.cardTitle}>Thông tin ứng viên</h3>
              <div className={classes.infoGrid}>
                <div className={classes.infoItem}>
                  <span className={classes.infoLabel}>Họ và tên</span>
                  <span className={classes.infoValue}>{result.hoVaTen}</span>
                </div>
                <div className={classes.infoItem}>
                  <span className={classes.infoLabel}>Ngày sinh</span>
                  <span className={classes.infoValue}>{formatDate(result.namSinh)}</span>
                </div>
                <div className={classes.infoItem}>
                  <span className={classes.infoLabel}>Email</span>
                  <span className={classes.infoValue}>{result.email}</span>
                </div>
                <div className={classes.infoItem}>
                  <span className={classes.infoLabel}>Số điện thoại</span>
                  <span className={classes.infoValue}>{result.soDienThoai}</span>
                </div>
                <div className={classes.infoItem}>
                  <span className={classes.infoLabel}>Ngày ứng tuyển</span>
                  <span className={classes.infoValue}>
                    {result.ngayUngDung
                      ? new Date(result.ngayUngDung).toLocaleString("vi-VN")
                      : "N/A"}
                  </span>
                </div>
                <div className={classes.infoItem}>
                  <span className={classes.infoLabel}>Mã ứng tuyển</span>
                  <span className={classes.infoValue}>{result.token}</span>
                </div>
              </div>
            </div>

            <div className={classes.noteCard}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#0e73ba" strokeWidth="1.5"/>
                <path d="M10 6V10M10 14H10.01" stroke="#0e73ba" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p>
                Chúng tôi sẽ liên hệ với bạn qua email hoặc số điện thoại đã đăng ký khi có
                kết quả xét duyệt. Vui lòng kiểm tra thường xuyên.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TraCuuTuyenDung;
