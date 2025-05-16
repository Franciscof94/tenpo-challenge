import axios from "axios";

import { ROUTES } from "@/routes/routes";
import authService from "@/services/auth/auth.service";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
