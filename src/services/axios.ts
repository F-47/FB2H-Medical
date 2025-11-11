import axios, { type InternalAxiosRequestConfig } from "axios";
import { getToken } from "./auth";

const baseURL = import.meta.env.VITE_BASE_URL;

export const accountsAPI = axios.create({
  baseURL: baseURL + "/accounts",
});
export const appointmentsAPI = axios.create({
  baseURL: baseURL + "/appointments",
});

accountsAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = typeof window !== "undefined" ? getToken() : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

accountsAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);
