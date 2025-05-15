import axios from "axios";
import authService from "../services/auth/auth.service";
import { ROUTES } from "@/routes/routes";

const axiosInstance = axios.create({
  baseURL: "https://gutendex.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getStoredToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.data) {
      const { message } = error.response.data;

      if (error.response && error.response.status === 401) {
        window.location.href = ROUTES.public.LOGIN;
        authService.logout();
      } else {
        console.error("Error in response:", message || "Network error");
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
