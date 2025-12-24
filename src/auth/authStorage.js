const KEY = "ADMIN_AUTH";

export const saveAuth = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const getAuth = () => {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearAuth = () => {
  localStorage.removeItem(KEY);
};
