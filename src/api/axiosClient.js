// import axios from "axios";
// import { getAuth } from "../auth/authStorage";

// const axiosClient = axios.create({
//   baseURL: "http://10.17.19.29:8084",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosClient.interceptors.request.use((config) => {
//   const auth = getAuth();
//   if (auth?.accessToken) {
//     config.headers.Authorization = `Bearer ${auth.accessToken}`;
//   }
//   return config;
// });

// export default axiosClient;

import axios from "axios";
import { getAuth } from "../auth/authStorage";

const axiosClient = axios.create({

  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});


axiosClient.interceptors.request.use((config) => {
  const auth = getAuth();
  if (auth?.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

export default axiosClient;
