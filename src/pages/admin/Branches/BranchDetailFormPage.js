import React, { useEffect, useState, useCallback } from "react";
import { API_BASE } from "../../../config";
import CKEditorClassic from "../../../components/CKEditorClassic";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function BranchDetailFormPage({ branchId }) {
  const [sections, setSections] = useState([]);

  /* ================= NEW SECTION ================= */
  const emptyText = () => ({
    id: null,                 // ✅ FIX
    type: "text",
    title: "Tiêu đề mới",
    content: "",
  });

  const emptyImage = () => ({
    id: null,                 // ✅ FIX
    type: "image",
    url: "",
    caption: "",
  });

  /* ================= LOAD ================= */
  const load = useCallback(() => {
    if (!branchId) return;

    fetch(`${API_BASE}/api/branches/${branchId}/detail`)
      .then((res) => res.json())
      .then((json) => setSections(json.sections || []));
  }, [branchId]);

  useEffect(load, [load]);

  /* ================= UPDATE ================= */
  const update = (idx, field, value) => {
    setSections((prev) =>
      prev.map((b, i) => (i === idx ? { ...b, [field]: value } : b))
    );
  };

  /* ================= ADD / DELETE ================= */
  const addText = () => setSections((p) => [...p, emptyText()]);
  const addImage = () => setSections((p) => [...p, emptyImage()]);

  const del = (idx) =>
    window.confirm("Xóa mục này?") &&
    setSections((p) => p.filter((_, i) => i !== idx));

  /* ================= DRAG ================= */
  const onDragEnd = (res) => {
    if (!res.destination) return;

    const items = Array.from(sections);
    const [moved] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, moved);
    setSections(items);
  };

  /* ================= SAVE ================= */
  const save = () => {
    const body = {
      sections: sections.map((s, i) => ({
        id: s.id,              // null → INSERT
        type: s.type,
        title: s.title,
        content: s.content,
        url: s.url,
        caption: s.caption,
        sortOrder: i + 1,
      })),
    };

    fetch(`${API_BASE}/api/branches/${branchId}/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
    }).then(async (res) => {
      if (!res.ok) {
        alert(await res.text());
        return;
      }
      alert("Lưu nội dung cơ sở thành công!");
      load(); // reload để lấy id thật
    });
  };

  return (
    <div className="admin-news-card mt-4">
      <h5 className="admin-news-title">Nội dung chi tiết cơ sở</h5>

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
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="admin-news-card p-3 mb-3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="admin-news-drag"
                      >
                        ⇅ Kéo thả để sắp xếp
                      </div>

                      {item.type === "text" && (
                        <>
                          <input
                            className="admin-news-input mb-2"
                            value={item.title}
                            onChange={(e) =>
                              update(index, "title", e.target.value)
                            }
                          />
                          <CKEditorClassic
                            value={item.content}
                            onChange={(v) =>
                              update(index, "content", v)
                            }
                          />
                        </>
                      )}

                      {item.type === "image" && (
                        <>
                          <input
                            className="admin-news-input mb-2"
                            placeholder="URL hình ảnh"
                            value={item.url}
                            onChange={(e) =>
                              update(index, "url", e.target.value)
                            }
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
                            placeholder="Caption"
                            value={item.caption || ""}
                            onChange={(e) =>
                              update(index, "caption", e.target.value)
                            }
                          />
                        </>
                      )}

                      <button
                        className="btn btn-danger btn-sm mt-2"
                        onClick={() => del(index)}
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

      <button className="btn btn-primary mt-3" onClick={save}>
        Lưu nội dung
      </button>
    </div>
  );
}
