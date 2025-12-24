import { API_BASE } from "../config";

/**
 * Public API fetch wrapper
 * - KHÔNG gắn Authorization
 * - Safe JSON parse
 * - Dùng cho FE public (Thư viện, trang người dùng)
 */
export async function publicApi(
  path,
  {
    method = "GET",
    body,
    headers = {},
  } = {}
) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  /* ===== ERROR ===== */
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API Error");
  }

  /* ===== SAFE JSON PARSE ===== */
  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
