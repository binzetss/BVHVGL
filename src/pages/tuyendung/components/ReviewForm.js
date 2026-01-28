import React, { useContext } from "react";
import FormContext from "../store/form-context";
import classes from "../css/Form.module.css";

const GENDER_MAP = {
  0: "Nam",
  1: "Nữ",
};

const MARITAL_MAP = {
  1: "Độc thân",
  2: "Đã kết hôn",
  3: "Ly hôn",
  4: "Góa",
};

const STUDY_TYPE_MAP = {
  1: "Chính quy",
  2: "Tại chức",
  3: "Liên thông",
  4: "Trực tiếp",
  5: "Trực tuyến",
};

const DEGREE_LEVEL_MAP = {
  1: "Trung cấp",
  2: "Cao đẳng",
  3: "Đại học",
  4: "Sau đại học",
};

const DEGREE_RANK_MAP = {
  1: "Xuất sắc",
  2: "Giỏi",
  3: "Khá",
  4: "Trung bình",
  5: "Đạt",
};

function ReviewForm() {
  const { formData } = useContext(FormContext);

  const renderItem = (label, value) => (
    <div className={classes.reviewItem}>
      <span className={classes.reviewLabel}>{label}</span>
      <span className={classes.reviewValue}>
        {value !== null && value !== undefined && value !== "" ? value : "-"}
      </span>
    </div>
  );
  const [previewImage, setPreviewImage] = React.useState(null);

  const openPreview = (file) => {
    setPreviewImage(URL.createObjectURL(file));
  };

  const closePreview = () => {
    setPreviewImage(null);
  };
  const renderFileLinks = (files) => {
    if (!files || files.length === 0) return "-";

    return (
      <div>
        {files.map((file, index) => (
          <div
            key={index}
            style={{
              color: "#0e73ba",
              cursor: "pointer",
              textDecoration: "underline",
              marginBottom: 4,
            }}
            onClick={() => openPreview(file)}
          >
            Ảnh chứng chỉ {index + 1}
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      <div className={`${classes.container} ${classes.headings}`}>
        <h1>Xem lại thông tin ứng viên</h1>
        <p>Vui lòng kiểm tra kỹ trước khi gửi hồ sơ</p>
      </div>

      <div className={classes.reviewBox}>
        <h3>I. Thông tin cá nhân</h3>

        {formData.avatarPreview && (
          <div className={classes.avatarReview}>
            <img src={formData.avatarPreview} alt="Avatar" />
          </div>
        )}

        {renderItem("Họ và tên", formData.fullName)}
        {renderItem("Ngày sinh", formData.dob)}
        {renderItem("Giới tính", GENDER_MAP[formData.gender])}
        {renderItem("Số CCCD", formData.cccd)}
        {renderItem("Ngày cấp CCCD", formData.cccdDate)}
        {renderItem("Nơi cấp CCCD", formData.cccdPlace)}
        {renderItem("Địa chỉ thường trú", formData.permanentAddress)}
        {renderItem("Chỗ ở hiện tại", formData.currentAddress)}
        {renderItem(
          "Quê quán",
          `${formData.hometownWard || ""}${
            formData.hometownProvince ? ", " + formData.hometownProvince : ""
          }`
        )}
        {renderItem("Nơi sinh", formData.birthPlace)}
        {renderItem("Dân tộc", formData.ethnicity)}
        {renderItem("Tôn giáo (ID)", formData.religionId)}
        {renderItem(
          "Tình trạng hôn nhân",
          MARITAL_MAP[formData.maritalStatusId]
        )}
        {renderItem("Số con", formData.childrenCount)}
        {renderItem("Tuổi con nhỏ nhất", formData.youngestChildAge)}
        {renderItem("Số điện thoại", formData.phone)}
        {renderItem("Email", formData.email)}

        <h4>Người liên hệ khi cần thiết</h4>
        {renderItem("Họ và tên", formData.emergencyName)}
        {renderItem("Số điện thoại", formData.emergencyPhone)}
        {renderItem("Mối quan hệ", formData.emergencyRelation)}

        {/* ================= II. SỨC KHỎE ================= */}
        <h3>II. Thông tin sức khỏe</h3>
        {renderItem("Tình trạng sức khỏe", formData.healthStatus)}
        {renderItem("Chiều cao (cm)", formData.height)}
        {renderItem("Cân nặng (kg)", formData.weight)}
        {renderItem("Tiền sử bệnh", formData.medicalHistory)}

        {/* ================= III. TRÌNH ĐỘ CHUYÊN MÔN ================= */}
        <h3>III. Trình độ chuyên môn</h3>

        {/* ----- 1. BẰNG CẤP ----- */}
        <h4>1. Bằng cấp</h4>
        {formData.degrees?.length > 0 ? (
          formData.degrees.map((d, i) => (
            <div key={i}>
              <strong>Bằng cấp {i + 1}</strong>
              {renderItem("Chuyên ngành", d.degreeMajor)}
              {renderItem("Trình độ", DEGREE_LEVEL_MAP[d.degreeLevelId])}
              {renderItem("Đơn vị đào tạo", d.degreeInstitution)}
              {renderItem(
                "Hình thức đào tạo",
                STUDY_TYPE_MAP[d.degreeStudyTypeId]
              )}
              {renderItem("Năm tốt nghiệp", d.graduationYear)}
              {renderItem("Xếp loại", DEGREE_RANK_MAP[d.idXepLoaiDaoTao])}
              {renderItem("Ảnh chứng chỉ", renderFileLinks(d.files))}
            </div>
          ))
        ) : (
          <p>-</p>
        )}

        {/* ----- 2. CME ----- */}
        <h4>2. Chứng chỉ đào tạo (CME)</h4>
        {formData.cmes?.length > 0 ? (
          formData.cmes.map((c, i) => (
            <div key={i}>
              <strong>CME {i + 1}</strong>
              {renderItem("Tên CME", c.cmeName)}
              {renderItem("Đơn vị đào tạo", c.cmeInstitution)}
              {renderItem("Hình thức", STUDY_TYPE_MAP[c.cmeStudyTypeId])}
              {renderItem(
                "Thời gian",
                `${c.cmeStartDate || "-"} → ${c.cmeEndDate || "-"}`
              )}
              {renderItem("Số tiết", c.cmeHours)}
              {renderItem("Ngày cấp", c.cmeIssueDate)}
              {renderItem("Ảnh chứng chỉ CME", renderFileLinks(c.files))}
            </div>
          ))
        ) : (
          <p>-</p>
        )}

        {/* ----- 3. CHỨNG CHỈ KHÁC (✅ ĐÃ FIX) ----- */}
        <h4>3. Chứng chỉ khác</h4>
        {formData.otherCertificate || formData.otherCertFiles?.length > 0 ? (
          <div>
            {renderItem("Tên chứng chỉ", formData.otherCertificate?.name)}
            {renderItem(
              "Đơn vị đào tạo",
              formData.otherCertificate?.institution
            )}
            {renderItem(
              "Hình thức đào tạo",
              STUDY_TYPE_MAP[formData.otherCertificate?.studyTypeId]
            )}
            {renderItem(
              "Thời gian",
              `${formData.otherCertificate?.startDate || "-"} → ${
                formData.otherCertificate?.endDate || "-"
              }`
            )}
            {renderItem("Số tiết", formData.otherCertificate?.hours)}
            {renderItem("Ngày cấp", formData.otherCertificate?.issueDate)}
            {renderItem(
              "Ảnh chứng chỉ khác",
              renderFileLinks(formData.otherCertFiles)
            )}
          </div>
        ) : (
          <p>-</p>
        )}

   
        <h3>IV. Thông tin ứng tuyển</h3>
        {renderItem("Vị trí ứng tuyển", formData.applyPosition)}
        {renderItem("Vị trí chi tiết", formData.jobDetail)}
        {renderItem("Kinh nghiệm", formData.workExperience)}
        {renderItem("Kỹ năng chuyên môn", formData.professionalSkills)}
        {renderItem("Kỹ năng mềm", formData.softSkills)}
        {renderItem("Nguyện vọng", formData.careerExpectation)}
      </div>
      {previewImage && (
        <div
          onClick={closePreview}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: 8,
              background: "#fff",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default ReviewForm;
