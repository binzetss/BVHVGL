import React, { useEffect, useState, useCallback } from "react";
import { API_BASE } from "../../config";
import CKEditorClassic from "../../components/CKEditorClassic";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import "../admin/AdminUnifiedTheme.css"; // THEME MỚI

export default function DepartmentDetailFormPage() {
  const [departments, setDepartments] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [sections, setSections] = useState([]);

  const emptyText = () => ({
    id: Date.now(),
    type: "text",
    title: "Tiêu đề mới",
    content: "",
  });

  const emptyImage = () => ({
    id: Date.now(),
    type: "image",
    url: "",
    caption: "",
  });

  /* LOAD LIST DEPARTMENT */
useEffect(() => {
  fetch(`${API_BASE}/api/departments`)
    .then((res) => res.json())
    .then((json) => {
      // CHỐT: luôn đảm bảo là array
      if (Array.isArray(json)) {
        setDepartments(json);
      } else if (Array.isArray(json.data)) {
        setDepartments(json.data);
      } else {
        setDepartments([]);
      }
    })
    .catch(() => setDepartments([]));
}, []);


  /* LOAD DETAIL */
  const loadDetail = useCallback((id) => {
    setSelectedId(id);

    if (!id) return;

    fetch(`${API_BASE}/api/departments/${id}/detail`)
      .then((res) => res.json())
      .then((json) => {
        try {
          setSections(json.sections || []);
        } catch {
          setSections([]);
        }
      });
  }, []);

  /* UPDATE FIELD */
  const updateSection = (id, field, value) => {
    setSections((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, [field]: value } : block
      )
    );
  };

  const addTextBlock = () => setSections((prev) => [...prev, emptyText()]);
  const addImageBlock = () => setSections((prev) => [...prev, emptyImage()]);
  const deleteBlock = (id) =>
    window.confirm("Xóa mục này?") &&
    setSections((prev) => prev.filter((b) => b.id !== id));

  /* DRAG & DROP */
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setSections(items);
  };

  /* SAVE DATA */
  const onSubmit = () => {
    if (!selectedId) return alert("Vui lòng chọn chuyên khoa!");

    const normalized = sections.map((item, index) => ({
      ...item,
      sortOrder: index + 1,
    }));

    fetch(`${API_BASE}/api/departments/${selectedId}/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ sections: normalized }),
    }).then(() => alert("Lưu thành công!"));
  };

  return (
    <div className="container-fluid">
      {/* TITLE */}
      <h2 className="admin-title-main">Quản lý nội dung chuyên khoa</h2>

      {/* CARD */}
      <div className="admin-card">
        <div className="mb-3">
          <label className="admin-title-small">Chọn chuyên khoa:</label>

          <div className="admin-select-wrapper">
            <select
              className="admin-select"
              value={selectedId}
              onChange={(e) => loadDetail(e.target.value)}
            >
              <option value="">-- Chọn --</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <span className="admin-select-icon">▼</span>
          </div>
        </div>

        {/* ADD BUTTONS */}
        {selectedId && (
          <div className="mb-3 d-flex gap-2">
            <button className="btn btn-success" onClick={addTextBlock}>
              + Thêm nội dung
            </button>
            <button className="btn btn-warning" onClick={addImageBlock}>
              + Thêm hình ảnh
            </button>
          </div>
        )}

        {/* DRAG & DROP */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {sections.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={String(item.id)}
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

                        {/* TEXT BLOCK */}
                        {item.type === "text" && (
                          <>
                            <input
                              className="admin-input mb-2"
                              placeholder="Tiêu đề"
                              value={item.title}
                              onChange={(e) =>
                                updateSection(item.id, "title", e.target.value)
                              }
                            />

                            <CKEditorClassic
                              value={item.content}
                              onChange={(value) =>
                                updateSection(item.id, "content", value)
                              }
                            />
                          </>
                        )}

                        {/* IMAGE BLOCK */}
                        {item.type === "image" && (
                          <>
                            <input
                              className="admin-input mb-2"
                              placeholder="URL hình ảnh"
                              value={item.url}
                              onChange={(e) =>
                                updateSection(item.id, "url", e.target.value)
                              }
                            />

                            {item.url && (
                              <img
                                src={item.url}
                                alt=""
                                className="admin-image-preview"
                              />
                            )}

                            <input
                              className="admin-input mt-2"
                              placeholder="Ghi chú ảnh (caption)"
                              value={item.caption || ""}
                              onChange={(e) =>
                                updateSection(item.id, "caption", e.target.value)
                              }
                            />
                          </>
                        )}

                        <button
                          className="btn btn-danger btn-sm mt-2"
                          onClick={() => deleteBlock(item.id)}
                        >
                          Xóa mục này
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {selectedId && (
          <button className="btn btn-primary mt-3" onClick={onSubmit}>
            Lưu dữ liệu
          </button>
        )}
      </div>
    </div>
  );
}
