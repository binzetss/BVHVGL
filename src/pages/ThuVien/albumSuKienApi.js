import { publicApi } from "../../api/publicApi";

/* ===== ALBUM LIST ===== */
export async function fetchAlbums() {
  return publicApi("/api/media-albums");
}

/* ===== ALBUM DETAIL ===== */
export async function fetchAlbumDetail(albumId) {
  return publicApi(`/api/media-albums/albums/${albumId}/detail`);
}
