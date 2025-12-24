import React, { useEffect, useState, useCallback } from "react";
import { API_BASE } from "../../config";
import CKEditorClassic from "../../components/CKEditorClassic";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function NewsDetailFormPage({ newsId }) {
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

  /* LOAD DETAIL */
  const loadDetail = useCallback(() => {
    if (!newsId) return;

    fetch(`${API_BASE}/api/news/${newsId}/detail`)
      .then((res) => res.json())
      .then((json) => {
        try {
          setSections(json.sections || []);
        } catch {
          setSections([]);
        }
      });
  }, [newsId]);

  useEffect(loadDetail, [loadDetail]);

  /* UPDATE FIELD */
  const update = (id, field, value) => {
    setSections((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const addText = () => setSections((p) => [...p, emptyText()]);
  const addImage = () => setSections((p) => [...p, emptyImage()]);
  const del = (id) =>
    window.confirm("Xóa mục này?") &&
    setSections((p) => p.filter((b) => b.id !== id));

  /* DRAG */
  const onDragEnd = (res) => {
    if (!res.destination) return;

    const items = Array.from(sections);
    const [moved] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, moved);
    setSections(items);
  };

  /* SAVE */
  const onSave = () => {
    const body = {
      sections: sections.map((item, i) => ({
        ...item,
        sortOrder: i + 1,
      })),
    };

    fetch(`${API_BASE}/api/news/${newsId}/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
    }).then(() => alert("Lưu nội dung thành công!"));
  };

  return (
    <div className="admin-news-card mt-4">
      <h4 className="admin-news-title">Nội dung bài viết</h4>

      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-success" onClick={addText}>
          + Thêm nội dung
        </button>
        <button className="btn btn-warning" onClick={addImage}>
          + Thêm hình ảnh
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sections.map((item, index) => (
                <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                  {(provided) => (
                    <div
                      className="admin-news-card p-3 mb-3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="admin-news-drag"
                        style={{ cursor: "grab" }}
                      >
                        ⇅ Kéo thả để sắp xếp
                      </div>

                      {/* TEXT BLOCK */}
                      {item.type === "text" && (
                        <>
                          <input
                            className="admin-news-input mb-2"
                            placeholder="Tiêu đề"
                            value={item.title}
                            onChange={(e) => update(item.id, "title", e.target.value)}
                          />

                          <CKEditorClassic
                            value={item.content}
                            onChange={(value) => update(item.id, "content", value)}
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
                            onChange={(e) => update(item.id, "url", e.target.value)}
                          />

                          {item.url && (
                            <img
                              src={item.url}
                              alt=""
                              style={{
                                width: 260,
                                borderRadius: 10,
                                marginTop: 8,
                              }}
                            />
                          )}

                          <input
                            className="admin-news-input mt-2"
                            placeholder="Ghi chú ảnh (caption)"
                            value={item.caption || ""}
                            onChange={(e) => update(item.id, "caption", e.target.value)}
                          />
                        </>
                      )}

                      <button
                        className="btn btn-danger btn-sm mt-2"
                        onClick={() => del(item.id)}
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

      <button className="btn btn-primary mt-3" onClick={onSave}>
        Lưu nội dung
      </button>
    </div>
  );
}
