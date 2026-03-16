import axios from "axios";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const appKey = import.meta.env.VITE_APP_KEY;
  if (appKey) {
    config.headers["x-app-key"] = appKey;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    return Promise.reject({ message, statusCode: error.response?.status });
  }
);
