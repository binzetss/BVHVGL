export function normalizeImageUrl(url) {
  if (!url) return "";

  let result = url;

  // ✅ 1. Decode an toàn (giữ logic cũ)
  try {
    for (let i = 0; i < 3; i++) {
      const decoded = decodeURIComponent(result);
      if (decoded === result) break;
      result = decoded;
    }
  } catch (e) {
    result = url;
  }

  // ✅ 2. Nếu đã là URL tuyệt đối → dùng luôn
  if (
    result.startsWith("http://") ||
    result.startsWith("https://")
  ) {
    return result;
  }

  // ✅ 3. Nếu là path → prepend API base
  const base = process.env.REACT_APP_API_URL || "";

  return `${base}${result}`;
}
