import React from "react";
import FacilityPageInfoForm from "./FacilityPageInfoForm";
import FacilityWithCaptionForm from "./FacilityWithCaptionForm";
import FacilityWithoutCaptionForm from "./FacilityWithoutCaptionForm";

export default function CoSoVatChatAdminPage() {
  return (
    <div className="admin-news-wrapper">
      <h2 className="admin-news-title-main">
        Quản lý Cơ sở vật chất
      </h2>

      <FacilityPageInfoForm />
      <FacilityWithCaptionForm />
      <FacilityWithoutCaptionForm />
    </div>
  );
}
