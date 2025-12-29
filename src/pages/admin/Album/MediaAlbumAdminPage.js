import React, { useEffect, useState } from "react";
import { adminApi } from "../../../api/adminApi";
import MediaAlbumForm from "./MediaAlbumForm";
import MediaAlbumDetailForm from "./MediaAlbumDetailForm";

function AlbumItem({ album, activeAlbum, setActiveAlbum, reload }) {
  const [editingAlbum, setEditingAlbum] = useState(null);
  return (
    <div
      className={`admin-list-item d-flex justify-content-between align-items-center ${
        activeAlbum?.id === album.id ? "active" : ""
      }`}
      style={{ cursor: "pointer" }}
      onClick={() => setActiveAlbum(album)}
    >
      <span>{album.title}</span>

      <button
        className="btn btn-sm btn-danger"
        onClick={async (e) => {
          e.stopPropagation();
          if (!window.confirm(`Xóa album "${album.title}" ?`)) return;

          try {
            await adminApi(`/api/media-albums/albums/${album.id}`, {
              method: "DELETE",
            });
            if (activeAlbum?.id === album.id) {
              setActiveAlbum(null);
            }
            reload();
          } catch (err) {
            console.error(err);
            alert("Xóa album thất bại");
          }
        }}
      >
        x
      </button>
    </div>
  );
}

export default function MediaAlbumAdminPage() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [tab, setTab] = useState("PHOTO");
  const [loading, setLoading] = useState(false);
  const load = async () => {
    try {
      setLoading(true);
      const data = await adminApi("/api/media-albums");
      setAlbums(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      if (err.message === "Unauthorized") {
        alert("Phiên đăng nhập đã hết hạn");
      }
      setAlbums([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setActiveAlbum(null);
  }, [tab]);

  const filteredAlbums = albums.filter((a) => (a.mediaType || "PHOTO") === tab);

  return (
    <div>
      <h3 className="admin-page-title">Quản lý Media Album</h3>

      <MediaAlbumForm
        album={editingAlbum}
        onSaved={() => {
          setEditingAlbum(null);
          load();
        }}
      />

      {/* TAB */}
      <div className="btn-group mt-3">
        <button
          className={`btn btn-outline-primary ${
            tab === "PHOTO" ? "active" : ""
          }`}
          onClick={() => setTab("PHOTO")}
        >
          Photo
        </button>
        <button
          className={`btn btn-outline-primary ${
            tab === "VIDEO" ? "active" : ""
          }`}
          onClick={() => setTab("VIDEO")}
        >
          Video
        </button>
      </div>

      <div className="row mt-4">
        {/* LIST */}
        <div className="col-md-4">
          <h5>{tab === "PHOTO" ? "🖼️ Album Photo" : "📹 Album Video"}</h5>

          {loading && <div className="text-muted">Đang tải...</div>}

          {!loading && filteredAlbums.length === 0 && (
            <div className="text-muted">Chưa có album</div>
          )}

          {filteredAlbums.map((album) => (
            <AlbumItem
              key={album.id}
              album={album}
              activeAlbum={activeAlbum}
              setActiveAlbum={setActiveAlbum}
              reload={load}
            />
          ))}
        </div>

        {/* DETAIL */}
        <div className="col-md-8">
          {activeAlbum ? (
            <MediaAlbumDetailForm
              album={activeAlbum}
              onEditAlbum={() => setEditingAlbum(activeAlbum)}
            />
          ) : (
            <div className="text-muted">Chọn album để quản lý nội dung</div>
          )}
        </div>
      </div>
    </div>
  );
}
