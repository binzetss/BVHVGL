import React, { useEffect, useState, useCallback } from "react";
import { API_BASE } from "../../config";
import CKEditorClassic from "../../components/CKEditorClassic";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function DichVuDetailFormPage() {
  const [services, setServices] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [sections, setSections] = useState([]);

  /* TEMPLATE */
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

  /* LOAD LIST */
  useEffect(() => {
    fetch(`${API_BASE}/api/dichvu`)
      .then((res) => res.json())
      .then(setServices);
  }, []);

  /* LOAD DETAIL */
  const loadDetail = useCallback((id) => {
    setSelectedId(id);
    if (!id) return setSections([]);

    fetch(`${API_BASE}/api/dichvu/${id}/detail`)
      .then((res) => res.json())
      .then((json) => {
        let parsed = Array.isArray(json.sections) ? json.sections : [];
        setSections(parsed);
      });
  }, []);

  /* UPDATE FIELD */
  const updateSection = (id, field, value) =>
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );

  const addTextBlock = () => setSections((p) => [...p, emptyText()]);
  const addImageBlock = () => setSections((p) => [...p, emptyImage()]);
  const deleteBlock = (id) =>
    window.confirm("Xóa mục này?") &&
    setSections((p) => p.filter((b) => b.id !== id));

  /* DRAG */
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setSections(items);
  };

  /* SAVE */
  const onSubmit = () => {
    if (!selectedId) return alert("Chọn dịch vụ!");

    const normalized = sections.map((item, index) => ({
      ...item,
      sortOrder: index + 1,
    }));

    fetch(`${API_BASE}/api/dichvu/${selectedId}/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ sections: normalized }),
    }).then(() => alert("Lưu thành công!"));
  };

  return (
    <div className="admin-news-wrapper">
      
      {/* TITLE */}
      <h2 className="admin-section-title">Quản lý nội dung dịch vụ</h2>

      {/* SELECT SERVICE */}
      <div className="admin-news-card">
        <label className="admin-news-label">Chọn dịch vụ:</label>

        <div className="admin-select-wrapper">
          <select
            className="admin-select"
            value={selectedId}
            onChange={(e) => loadDetail(e.target.value)}
          >
            <option value="">-- Chọn --</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <span className="admin-select-icon">▼</span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      {selectedId && (
        <div className="admin-news-card">
          <button className="btn btn-success me-2" onClick={addTextBlock}>
            + Thêm nội dung
          </button>

          <button className="btn btn-warning" onClick={addImageBlock}>
            + Thêm hình ảnh
          </button>
        </div>
      )}

      {/* DRAG & DROP */}
      {selectedId && (
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
                        className="admin-news-card p-3 mb-3"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          className="admin-news-drag"
                          {...provided.dragHandleProps}
                        >
                          ⇅ Kéo thả để sắp xếp
                        </div>

                        {/* TEXT BLOCK */}
                        {item.type === "text" && (
                          <>
                            <input
                              className="admin-news-input mb-2"
                              value={item.title}
                              placeholder="Tiêu đề"
                              onChange={(e) =>
                                updateSection(item.id, "title", e.target.value)
                              }
                            />

                            <CKEditorClassic
                              value={item.content}
                              onChange={(v) =>
                                updateSection(item.id, "content", v)
                              }
                            />
                          </>
                        )}

                        {/* IMAGE BLOCK */}
                        {item.type === "image" && (
                          <>
                            <input
                              className="admin-news-input mb-2"
                              placeholder="URL hình ảnh"
                              value={item.url}
                              onChange={(e) =>
                                updateSection(item.id, "url", e.target.value)
                              }
                            />

                            <input
                              className="admin-news-input mb-2"
                              placeholder="Ghi chú ảnh (caption)"
                              value={item.caption || ""}
                              onChange={(e) =>
                                updateSection(
                                  item.id,
                                  "caption",
                                  e.target.value
                                )
                              }
                            />

                            {item.url && (
                              <img
                                src={item.url}
                                alt=""
                                className="admin-news-image-preview"
                              />
                            )}
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
      )}

      {/* SAVE BUTTON */}
      {selectedId && (
        <button className="btn btn-primary mt-3" onClick={onSubmit}>
          Lưu dữ liệu
        </button>
      )}
    </div>
  );
}
