import React, { useContext, useRef } from "react";
import FormContext from "../store/form-context";
import classes from "../css/Form.module.css";

/* =========================
   MỚI THÊM: danh sách field bắt buộc (*)
========================= */
export const REQUIRED_FIELDS = [
  { key: "fullName", label: "Họ và tên" },
  { key: "dob", label: "Ngày sinh" },
  { key: "gender", label: "Giới tính" },
  { key: "cccd", label: "Số CCCD" },
  { key: "cccdDate", label: "Ngày cấp CCCD" },
  { key: "cccdPlace", label: "Nơi cấp CCCD" },
  { key: "permanentAddress", label: "Địa chỉ thường trú" },
  { key: "hometownWard", label: "Quê Quán" },
];



export const isUserPersonalInfoValid = (formData) => {
  for (const field of REQUIRED_FIELDS) {
    const value = formData[field.key];

    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    ) {
      return {
        valid: false,
        field: field.key,
        label: field.label,
        message: `Bạn thiếu thông tin tại: ${field.label}`,
      };
    }
  }

  return { valid: true };
};


function UserPersonalInfoForm() {
  const { formData, setFormData } = useContext(FormContext);
  const fileRef = useRef(null);

  const changeHandler = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      avatar: file,
      avatarPreview: imageUrl,
    }));
  };

  return (
    <>
      <div className={`${classes.container} ${classes.headings}`}>
        <h1>Thông tin cá nhân</h1>
        <p>Vui lòng điền đầy đủ và chính xác các thông tin bên dưới</p>
      </div>

      <div className={classes.grid2}>
        <div className={classes.avatarBox}>
          <div
            className={classes.avatarPreview}
            onClick={() => fileRef.current.click()}
          >
            {formData.avatarPreview ? (
              <img src={formData.avatarPreview} alt="Avatar preview" />
            ) : (
              <span>Chọn ảnh đại diện</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileRef}
            onChange={imageHandler}
          />
          <small className={classes.hint}>JPG, PNG • Tối đa 5MB</small>
        </div>

        <div className={classes.field}>
          <label>
            Họ và tên <span className={classes.star}>*</span>
          </label>
          <input
            type="text"
            placeholder="Nguyễn Văn A"
            value={formData.fullName || ""}
            onChange={changeHandler("fullName")}
            required
          />
        </div>

        <div className={classes.field}>
          <label>
            Ngày sinh <span className={classes.star}>*</span>
          </label>
          <input
            type="date"
            value={formData.dob || ""}
            onChange={changeHandler("dob")}
            required
          />
        </div>

        <div className={classes.field}>
          <label>
            Giới tính <span className={classes.star}>*</span>
          </label>
          <select
            value={formData.gender ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                gender: e.target.value === "" ? "" : Number(e.target.value),
              }))
            }
            required
          >
            <option value="">-- Chọn --</option>
            <option value={0}>Nam</option>
            <option value={1}>Nữ</option>
          </select>
        </div>

        <div className={classes.field}>
          <label>
            Số CCCD <span className={classes.star}>*</span>
          </label>
          <input
            type="text"
            placeholder="Gồm 12 chữ số"
            value={formData.cccd || ""}
            onChange={changeHandler("cccd")}
            required
          />
        </div>

        <div className={classes.field}>
          <label>
            Ngày cấp CCCD <span className={classes.star}>*</span>
          </label>
          <input
            type="date"
            value={formData.cccdDate || ""}
            onChange={changeHandler("cccdDate")}
            required
          />
        </div>

        <div className={classes.field}>
          <label>
            Nơi cấp CCCD <span className={classes.star}>*</span>
          </label>
          <select
            value={formData.cccdPlace || ""}
            onChange={changeHandler("cccdPlace")}
            required
          >
            <option value="">-- Chọn --</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
          </select>
        </div>

        <div className={classes.field}>
          <label>
            Địa chỉ thường trú <span className={classes.star}>*</span>
          </label>
          <input
            type="text"
            placeholder="Số nhà, đường, phường/xã, quận/huyện"
            value={formData.permanentAddress || ""}
            onChange={changeHandler("permanentAddress")}
            required
          />
        </div>

        <div className={classes.field}>
          <label>Chỗ ở hiện tại</label>
          <input
            type="text"
            placeholder="Nếu khác địa chỉ thường trú"
            value={formData.currentAddress || ""}
            onChange={changeHandler("currentAddress")}
          />
        </div>

        <div className={`${classes.field} ${classes.span2}`}>
          <label>
            Quê Quán <span className={classes.star}>*</span>
          </label>
          <input
            type="text"
            placeholder="Ví dụ: Hà Nội"
            value={formData.hometownWard || ""}
            onChange={changeHandler("hometownWard")}
            required
          />
        </div>
      </div>
    </>
  );
}

export default UserPersonalInfoForm;
