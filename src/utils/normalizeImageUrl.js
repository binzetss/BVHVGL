export function normalizeImageUrl(url) {
  if (!url) return "";

  let result = url;

  try {
    // Giải mã tối đa 3 lần để cứu URL bị encode chồng
    for (let i = 0; i < 3; i++) {
      const decoded = decodeURIComponent(result);
      if (decoded === result) break;
      result = decoded;
    }
  } catch (e) {
    // nếu decode lỗi thì trả về nguyên bản
    return url;
  }

  return result;
}
