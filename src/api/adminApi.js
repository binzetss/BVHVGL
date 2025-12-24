import { API_BASE } from "../config";
import { clearAuth } from "../auth/authStorage";

export async function adminApi(
  path,
  { method = "GET", body, headers = {} } = {}
) {
  const isFormData = body instanceof FormData;

  const res = await fetch(`${API_BASE}${path}`, {
    method,

    credentials: "include", // 🔥 BẮT BUỘC – GỬI JSESSIONID

    headers: {
      ...(isFormData
        ? {}
        : { "Content-Type": "application/json;charset=utf-8" }),
      ...headers,
    },

    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
  });

  if (res.status === 401 || res.status === 403) {
    clearAuth();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API Error");
  }

  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
