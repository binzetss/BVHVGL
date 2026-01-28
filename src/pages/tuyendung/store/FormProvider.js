import React, { useState } from "react";
import FormContext from "./form-context";
import INITIAL_FORM_DATA from "../../../components/data/reloadform";

function FormProvider({ children }) {
  const [page, setPage] = useState(1);

  // 🔥 KEY để REMOUNT toàn bộ form
  const [formKey, setFormKey] = useState(Date.now());

  // 🔥 STATE FORM
  const [formData, setFormData] = useState(
    structuredClone(INITIAL_FORM_DATA)
  );

  /**
   * ✅ VALIDATE
   */
  const validate = () => {
    const requiredFields = [
      "fullName",
      "dob",
      "gender",
      "cccd",
      "cccdDate",
      "cccdPlace",
      "permanentAddress",
      "hometownProvince",
      "hometownWard",
      "phone",
      "email",
      "jobDetail",
      "workExperience",
      "professionalSkills",
      "careerExpectation",
    ];

    for (const key of requiredFields) {
      const value = formData[key];
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        console.warn("❌ Thiếu field:", key);
        return false;
      }
    }
    return true;
  };

  /**
   * 🔥 RESET TRIỆT ĐỂ
   */
  const resetDataState = () => {
    setFormData(structuredClone(INITIAL_FORM_DATA)); // clear data
    setPage(1);                                     // về trang 1
    setFormKey(Date.now());                         // remount toàn bộ form
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        page,
        numOfPages: 5,
        setCurrentPage: setPage,
        resetDataState,
        validate,
        formKey, // ⚠️ BẮT BUỘC PHẢI EXPORT
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default FormProvider;
