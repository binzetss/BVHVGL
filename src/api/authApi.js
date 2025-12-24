import axiosClient from "./axiosClient";

export const loginApi = async (payload) => {
  const res = await axiosClient.post("/api/auth/login", {
    username: payload.username,
    password: payload.password,
    userAgent: navigator.userAgent,
  });

  return res.data;
};
