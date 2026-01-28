import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import QMSectionForm from "./QMSectionForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../../admin/AdminUnifiedTheme.css";
import "./qualityManagement.css";

export default function QualityManagementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [sections, setSections] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const isNew = id === "new";

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        const data = await adminApi(`/api/admin/quality-management/${id}/content`);

        setTitle(data?.title || "");
        setShortDesc(data?.shortDesc || "");
        setSections(data?.sections || []);
        setPdfUrl(data?.pdfUrl || "");
      } catch (err) {
        console.error("Failed to load:", err);
        alert("Không thể tải dữ liệu: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, isNew]);

  /* ================= SECTION HELPERS ================= */
  const emptyText = () => ({
    id: Date.now(),
    type: "text",
    title: "",
    content: "",
  });

  const emptyImage = () => ({
    id: Date.now() + 1,
    type: "image",
    url: "",
    caption: "",
  });

  const addTextBlock = () => setSections((prev) => [...prev, emptyText()]);
  const addImageBlock = () => setSections((prev) => [...prev, emptyImage()]);

  const updateSection = useCallback((id, updatedSection) => {
    setSections((prev) =>
      prev.map((section) => (section.id === id ? updatedSection : section))
    );
  }, []);

  const deleteSection = (id) => {
    if (window.confirm("Xóa phần này?")) {
      setSections((prev) => prev.filter((s) => s.id !== id));
    }
  };

  /* ================= DRAG & DROP ================= */
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setSections(items);
  };

  /* ================= PDF UPLOAD ================= */
  const handlePdfUpload = async (file) => {
    if (!file) return;

    if (!file.type.includes("pdf")) {
      alert("Chỉ chấp nhận file PDF");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("File quá lớn (tối đa 50MB)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await adminApi("/api/upload/quality-management/pdf", {
        method: "POST",
        body: formData,
      });

      setPdfUrl(result.fileUrl);
      alert("Upload thành công!");
    } catch (err) {
      alert("Upload thất bại: " + err.message);
    }
  };

  /* ================= SAVE ================= */
  const save = async () => {
    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề");
      return;
    }

    const normalized = sections.map((item, index) => ({
      ...item,
      sortOrder: index,
    }));

    try {
      const payload = {
        title,
        shortDesc,
        sections: normalized,
        pdfUrl,
      };

      if (isNew) {
        await adminApi("/api/admin/quality-management", {
          method: "POST",
          body: payload,
        });
        alert("Đã tạo bài viết mới");
        navigate("/admin/quality-management");
      } else {
        await adminApi(`/api/admin/quality-management/${id}/content`, {
          method: "PUT",
          body: payload,
        });
        alert("Đã lưu thay đổi");
      }
    } catch (err) {
      alert("Lưu thất bại: " + err.message);
    }
  };

  /* ================= UI ================= */
  if (loading) {
    return <div className="admin-card">Đang tải dữ liệu…</div>;
  }

  return (
    <div className="container-fluid">
      <h2 className="admin-title-main">
        {isNew ? "Tạo bài viết mới" : "Chỉnh sửa bài viết"}
      </h2>

      <div className="admin-card">
        {/* BASIC INFO */}
        <div className="mb-3">
          <label className="admin-title-small">Tiêu đề bài viết:</label>
          <input
            className="admin-news-input"
            placeholder="Nhập tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="admin-title-small">Mô tả ngắn:</label>
          <textarea
            className="admin-news-input"
            placeholder="Nhập mô tả ngắn"
            rows={3}
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />
        </div>

        {/* PDF UPLOAD */}
        <div className="mb-3">
          <label className="admin-title-small">File PDF đính kèm:</label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handlePdfUpload(e.target.files[0])}
            className="form-control mb-2"
          />

          {pdfUrl && (
            <div className="d-flex align-items-center gap-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                📄 Xem file PDF
              </a>
              <button
                className="media-btn danger sm"
                onClick={() => setPdfUrl("")}
              >
                Xóa
              </button>
            </div>
          )}
        </div>

        {/* ADD SECTION BUTTONS */}
        <div className="mb-3 d-flex gap-2">
          <button className="btn btn-success" onClick={addTextBlock}>
            + Thêm nội dung văn bản
          </button>
          <button className="btn btn-warning" onClick={addImageBlock}>
            + Thêm hình ảnh
          </button>
        </div>

        {/* DRAG & DROP SECTIONS */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {sections.map((section, index) => (
                  <Draggable
                    key={section.id}
                    draggableId={String(section.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="admin-dnd-card mb-3"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="admin-news-drag"
                        >
                          ⇅ Kéo thả để sắp xếp
                        </div>

                        <QMSectionForm
                          section={section}
                          onChange={(updated) =>
                            updateSection(section.id, updated)
                          }
                          onDelete={() => deleteSection(section.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {sections.length === 0 && (
          <p className="text-muted text-center py-4">
            Chưa có nội dung. Nhấn các nút phía trên để thêm nội dung.
          </p>
        )}

        {/* ACTIONS */}
        <div className="mt-4 d-flex gap-2">
          <button className="media-btn primary" onClick={save}>
            💾 {isNew ? "Tạo mới" : "Lưu thay đổi"}
          </button>
          <button
            className="media-btn outline"
            onClick={() => navigate("/admin/quality-management")}
          >
            ← Quay lại danh sách
          </button>
        </div>
      </div>
    </div>
  );
}
