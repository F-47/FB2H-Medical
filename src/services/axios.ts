import { getToken, logout } from "./auth";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_BASE_URL;

export const accountsAPI = axios.create({
  baseURL: baseURL + "/accounts",
});

accountsAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = typeof window !== "undefined" ? getToken() : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
