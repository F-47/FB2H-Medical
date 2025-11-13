import axios, { type InternalAxiosRequestConfig } from "axios";
import { getToken } from "./auth";

const baseURL = import.meta.env.VITE_BASE_URL;

export const accountsAPI = axios.create({
  baseURL: baseURL + "/accounts",
});
export const appointmentsAPI = axios.create({
  baseURL: baseURL + "/appointments",
});

const apis = [accountsAPI, appointmentsAPI];

async function interceptor(config: InternalAxiosRequestConfig) {
  const token = typeof window !== "undefined" ? getToken() : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

apis.forEach((api) => {
  api.interceptors.request.use(interceptor);
});
