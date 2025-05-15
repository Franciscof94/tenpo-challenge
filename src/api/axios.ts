import axios from "axios";
import authService from "../services/auth/auth.service";

const axiosInstance = axios.create({
  baseURL: "https://gutendex.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getStoredToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Interceptor: Token added to header");
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

      if (message === "Unauthenticated.") {
        window.location.href = "/login";
        sessionStorage.removeItem("authToken");
      } else {
        console.error("Error in response:", message || "Network error");
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
