import React, { useState } from "react";
import BranchFormPage from "./BranchFormPage";
import BranchDetailFormPage from "./BranchDetailFormPage";

export default function BranchAdminPage() {
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  return (
    <div className="row">
      {/* LEFT: danh sách + form cơ sở */}
      <div className="col-md-5">
        <BranchFormPage onSelect={setSelectedBranchId} />
      </div>

      {/* RIGHT: form nhập nội dung chi tiết */}
      <div className="col-md-7">
        {selectedBranchId ? (
          <BranchDetailFormPage branchId={selectedBranchId} />
        ) : (
          <div className="admin-news-card text-muted">
            Chọn một cơ sở để nhập nội dung
          </div>
        )}
      </div>
    </div>
  );
}
