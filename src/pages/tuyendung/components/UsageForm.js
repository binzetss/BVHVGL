import React, { useContext, useState, useEffect } from "react";
import FormContext from "../store/form-context";
import classes from "../css/Form.module.css";
import { validateAndResizeImage } from "../../../utils/imageUtils";

function UsageForm() {
  const { formData, setFormData } = useContext(FormContext);

  /* ================= SAFE FALLBACK ================= */
  const degrees = Array.isArray(formData.degrees) ? formData.degrees : [];
  const cmes = Array.isArray(formData.cmes) ? formData.cmes : [];
  const otherCertFiles = Array.isArray(formData.otherCertFiles)
    ? formData.otherCertFiles
    : [];

  const [studyTypes, setStudyTypes] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);

  const changeHandler = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };


  const updateDegree = (index, field, value) => {
    const list = [...degrees];
    list[index] = { ...list[index], [field]: value };
    setFormData((prev) => ({ ...prev, degrees: list }));
  };

  const addDegree = () => {
    setFormData((prev) => ({
      ...prev,
      degrees: [
        ...(Array.isArray(prev.degrees) ? prev.degrees : []),
        {
          degreeMajor: "",
          degreeLevelId: null,
          degreeInstitution: "",
          degreeStudyTypeId: null,
          graduationYear: "",
          idXepLoaiDaoTao: null,
          files: [],
        },
      ],
    }));
  };

  const removeDegree = () => {
    if (degrees.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      degrees: degrees.slice(0, -1),
    }));
  };

  const handleDegreeFileUpload = (index) => async (e) => {
    const rawFiles = Array.from(e.target.files || []);
    const processed = [];

    for (const f of rawFiles) {
      processed.push(await validateAndResizeImage(f, 20));
    }

    const list = [...degrees];
    list[index] = { ...list[index], files: processed };
    setFormData((prev) => ({ ...prev, degrees: list }));
  };


  const updateCME = (index, field, value) => {
    const list = [...cmes];
    list[index] = { ...list[index], [field]: value };
    setFormData((prev) => ({ ...prev, cmes: list }));
  };

  const addCME = () => {
    setFormData((prev) => ({
      ...prev,
      cmes: [
        ...(Array.isArray(prev.cmes) ? prev.cmes : []),
        {
          cmeName: "",
          cmeInstitution: "",
          cmeStudyTypeId: null,
          cmeStartDate: "",
          cmeEndDate: "",
          cmeHours: "",
          cmeIssueDate: "",
          files: [],
        },
      ],
    }));
  };
  const degreeRanks = [
    { id: 1, name: "Xuất sắc" },
    { id: 2, name: "Giỏi" },
    { id: 3, name: "Khá" },
    { id: 4, name: "Trung bình" },
    { id: 5, name: "Đạt" },
  ];
  const removeCME = () => {
    if (cmes.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      cmes: cmes.slice(0, -1),
    }));
  };
  const updateOtherCert = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      otherCertificate: {
        ...(prev.otherCertificate || {}),
        [field]: value,
      },
    }));
  };
  const handleCMEFileUpload = (index) => async (e) => {
    const rawFiles = Array.from(e.target.files || []);
    const processed = [];

    for (const f of rawFiles) {
      processed.push(await validateAndResizeImage(f, 20));
    }

    const list = [...cmes];
    list[index] = { ...list[index], files: processed };
    setFormData((prev) => ({ ...prev, cmes: list }));
  };

  const handleOtherCertFiles = async (e) => {
    const rawFiles = Array.from(e.target.files || []);
    const processed = [];

    for (const f of rawFiles) {
      processed.push(await validateAndResizeImage(f, 20));
    }

    setFormData((prev) => ({
      ...prev,
      otherCertFiles: processed,
    }));
  };

  const renderSelectedFiles = (files = []) =>
    files.length === 0 ? null : (
      <ul style={{ marginTop: 6, paddingLeft: 16 }}>
        {files.map((f, i) => (
          <li key={i} style={{ fontSize: 13 }}>
            {f.name}
          </li>
        ))}
      </ul>
    );

  return (
    <>

      <div className={`${classes.container} ${classes.headings}`}>
        <h1>Thông tin sức khỏe & chuyên môn</h1>
        <p>Vui lòng điền đầy đủ và chính xác các thông tin bên dưới</p>
      </div>

      <div className={classes.grid2}>
        <div className={`${classes.span2}`}>
          <label className={classes.sectionTitle}>
            II. Trình độ chuyên môn – Bằng cấp
          </label>
        </div>

        {formData.degrees?.map((d, i) => (
          <React.Fragment key={i}>
            <div className={`${classes.span2} ${classes.degreeRowHeader}`}>
              <span className={classes.degreeTitle}>Bằng cấp {i + 1}</span>
            </div>

            <div className={classes.field}>
              <label>Chuyên ngành</label>
              <input
                value={d.degreeMajor}
                onChange={(e) => updateDegree(i, "degreeMajor", e.target.value)}
              />
            </div>
            <div className={classes.field}>
              <label>Trình độ</label>
              <select
                value={d.degreeLevelId ?? ""}
                onChange={(e) =>
                  updateDegree(
                    i,
                    "degreeLevelId",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              >
                <option value="">-- Chọn --</option>
                <option value={1}>Trung cấp</option>
                <option value={2}>Cao đẳng</option>
                <option value={3}>Đại học</option>
                <option value={4}>Sau đại học</option>
                <option value={5}>Chuyên khoa I</option>
                <option value={6}>Chuyên khoa II</option>
              </select>
            </div>

            <div className={classes.field}>
              <label>Đơn vị đào tạo</label>
              <input
                value={d.degreeInstitution}
                onChange={(e) =>
                  updateDegree(i, "degreeInstitution", e.target.value)
                }
              />
            </div>
            <div className={classes.field}>
              <label>Hình thức đào tạo</label>
              <select
                value={d.degreeStudyTypeId ?? ""}
                onChange={(e) =>
                  updateDegree(
                    i,
                    "degreeStudyTypeId",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              >
                <option value="">-- Chọn --</option>
                <option value={1}>Chính quy</option>
                <option value={2}>Vừa học vừa làm</option>
                <option value={3}>Tại chức</option>
                <option value={4}>Liên thông</option>
                <option value={5}>Đào tạo ngắn hạn</option>
              </select>
            </div>

            <div className={classes.field}>
              <label>Năm tốt nghiệp</label>
              <input
                type="number"
                value={d.graduationYear}
                onChange={(e) =>
                  updateDegree(i, "graduationYear", e.target.value)
                }
              />
            </div>
            <div className={classes.field}>
              <label>Xếp loại</label>
              <select
                value={d.idXepLoaiDaoTao ?? ""}
                onChange={(e) =>
                  updateDegree(
                    i,
                    "idXepLoaiDaoTao",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              >
                <option value="">-- Chọn --</option>
                {degreeRanks.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${classes.field} ${classes.span2}`}>
              <label>Ảnh chứng chỉ / bằng cấp</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleDegreeFileUpload(i)}
              />

              {renderSelectedFiles(d.files)}
            </div>
          </React.Fragment>
        ))}

        <div className={`${classes.span2} ${classes.degreeActions}`}>
          <button className={classes.btnAdd} onClick={addDegree}>
            + Thêm bằng cấp
          </button>
          {degrees.length > 1 && (
            <button className={classes.btnRemove} onClick={removeDegree}>
              Xóa bằng cấp
            </button>
          )}
        </div>

        {/* ================= III. CME ================= */}
        <div className={`${classes.span2}`}>
          <label className={classes.sectionTitle}>
            III. Chứng chỉ đào tạo (CME)
          </label>
        </div>

        {cmes.map((c, i) => (
          <React.Fragment key={i}>
            <div className={`${classes.span2} ${classes.degreeRowHeader}`}>
              <span className={classes.degreeTitle}>CME {i + 1}</span>
            </div>

            <div className={classes.field}>
              <label>Tên CME</label>
              <input
                value={c.cmeName}
                onChange={(e) => updateCME(i, "cmeName", e.target.value)}
              />
            </div>
            <div className={classes.field}>
              <label>Đơn vị đào tạo</label>
              <input
                value={c.cmeInstitution}
                onChange={(e) => updateCME(i, "cmeInstitution", e.target.value)}
              />
            </div>
            <div className={classes.field}>
              <label>Hình thức</label>
              <select
                value={c.cmeStudyTypeId ?? ""}
                onChange={(e) =>
                  updateCME(
                    i,
                    "cmeStudyTypeId",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              >
                <option value="">-- Chọn --</option>
                <option value={1}>Chính quy</option>
                <option value={2}>Vừa học vừa làm</option>
                <option value={3}>Tại chức</option>
                <option value={4}>Liên thông</option>
                <option value={5}>Đào tạo ngắn hạn</option>
              </select>
            </div>

            <div className={classes.field}>
              <label>Ngày bắt đầu</label>
              <input
                type="date"
                value={c.cmeStartDate}
                onChange={(e) => updateCME(i, "cmeStartDate", e.target.value)}
              />
            </div>
            <div className={classes.field}>
              <label>Ngày kết thúc</label>
              <input
                type="date"
                value={c.cmeEndDate}
                onChange={(e) => updateCME(i, "cmeEndDate", e.target.value)}
              />
            </div>
            <div className={classes.field}>
              <label>Số tiết</label>
              <input
                type="number"
                value={c.cmeHours}
                onChange={(e) => updateCME(i, "cmeHours", e.target.value)}
              />
            </div>
            <div className={classes.field}>
              <label>Ngày cấp</label>
              <input
                type="date"
                value={c.cmeIssueDate}
                onChange={(e) => updateCME(i, "cmeIssueDate", e.target.value)}
              />
            </div>

            <div className={classes.field}>
              <label>Ảnh chứng chỉ CME</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleCMEFileUpload(i)}
              />

              {renderSelectedFiles(c.files)}
            </div>
          </React.Fragment>
        ))}

        <div className={`${classes.span2} ${classes.degreeActions}`}>
          <button className={classes.btnAdd} onClick={addCME}>
            + Thêm CME
          </button>
          {cmes.length > 1 && (
            <button className={classes.btnRemove} onClick={removeCME}>
              Xóa CME
            </button>
          )}
        </div>

        {/* ---------- 3. CHỨNG CHỈ KHÁC ---------- */}
        <div className={`${classes.field} ${classes.span2}`}>
          <label className={classes.sectionTitle}>3. Chứng chỉ khác</label>
        </div>

        {/* Tên chứng chỉ */}
        <div className={classes.field}>
          <label>Tên chứng chỉ</label>
          <input
            type="text"
            value={formData.otherCertificate?.name || ""}
            onChange={(e) => updateOtherCert("name", e.target.value)}
          />
        </div>

        {/* Đơn vị đào tạo */}
        <div className={classes.field}>
          <label>Đơn vị đào tạo</label>
          <input
            type="text"
            value={formData.otherCertificate?.institution || ""}
            onChange={(e) => updateOtherCert("institution", e.target.value)}
          />
        </div>

        {/* Hình thức đào tạo */}
        <div className={classes.field}>
          <label>Hình thức đào tạo</label>
          <select
            value={formData.otherCertificate?.studyTypeId ?? ""}
            onChange={(e) =>
              updateOtherCert(
                "studyTypeId",
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
          >
            <option value="">-- Chọn --</option>
            <option value={1}>Chính quy</option>
            <option value={2}>Vừa học vừa làm</option>
            <option value={3}>Tại chức</option>
            <option value={4}>Liên thông</option>
            <option value={5}>Đào tạo ngắn hạn</option>
          </select>
        </div>

        {/* Ngày bắt đầu */}
        <div className={classes.field}>
          <label>Ngày bắt đầu</label>
          <input
            type="date"
            value={formData.otherCertificate?.startDate || ""}
            onChange={(e) => updateOtherCert("startDate", e.target.value)}
          />
        </div>

        {/* Ngày kết thúc */}
        <div className={classes.field}>
          <label>Ngày kết thúc</label>
          <input
            type="date"
            value={formData.otherCertificate?.endDate || ""}
            onChange={(e) => updateOtherCert("endDate", e.target.value)}
          />
        </div>

        {/* Số tiết */}
        <div className={classes.field}>
          <label>Số tiết</label>
          <input
            type="number"
            value={formData.otherCertificate?.hours || ""}
            onChange={(e) => updateOtherCert("hours", e.target.value)}
          />
        </div>

        {/* Ngày cấp */}
        <div className={classes.field}>
          <label>Ngày cấp</label>
          <input
            type="date"
            value={formData.otherCertificate?.issueDate || ""}
            onChange={(e) => updateOtherCert("issueDate", e.target.value)}
          />
        </div>

        {/* Upload ảnh – NẰM KẾ BÊN NGÀY CẤP */}
        <div className={classes.field}>
          <label>Ảnh chứng chỉ khác</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleOtherCertFiles}
          />

          {renderSelectedFiles(formData.otherCertFiles)}
        </div>

        {/* ---------- 4. CCHN / GPHN ---------- */}
        <div className={`${classes.field} ${classes.span2}`}>
          <label className={classes.sectionTitle}>4. CCHN / GPHN</label>
        </div>

        {[
          ["Số", "licenseNumber"],
          ["Ngày cấp", "licenseIssueDate", "date"],
          ["Nơi cấp", "licensePlace"],
          ["Văn bằng chuyên môn", "licenseDegree"],
        ].map(([label, key, type = "text"]) => (
          <div className={classes.field} key={key}>
            <label>{label}</label>
            <input
              type={type}
              value={formData[key] || ""}
              onChange={changeHandler(key)}
            />
          </div>
        ))}

        <div className={`${classes.field} ${classes.span2}`}>
          <label>Phạm vi hoạt động</label>
          <input
            type="text"
            value={formData.licenseScope || ""}
            onChange={changeHandler("licenseScope")}
          />
        </div>
      </div>
    </>
  );
}

export default UsageForm;
