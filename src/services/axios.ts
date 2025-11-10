// import { getCurrentUser, logout } from "@/auth";
// import { getCookieServer } from "@/lib/actions/getCookieServer";
// import axios, { type InternalAxiosRequestConfig } from "axios";
// import { toast } from "sonner";

// const baseURL = import.meta.env.NEXT_PUBLIC_SERVER_ENDPOINT;

// export const carsAPI = axios.create({
//   baseURL,
// });

// export const adminAPI = axios.create({
//   baseURL: baseURL + "/admin",
// });

// async function interceptor(config: InternalAxiosRequestConfig) {
//   const token =
//     typeof window !== "undefined"
//       ? getCurrentUser()?.access_token
//       : await getCookieServer("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }

// const apis = [carsAPI, adminAPI];

// apis.forEach((api) => {
//   api.interceptors.request.use(interceptor);
//   api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized", {
//           description: "You are not authorized to access this page",
//         });
//         logout();
//       } else if (error.response?.status === 403) {
//         toast.error("Forbidden", {
//           description: "You do not have permission to access this page",
//         });
//       }
//       return Promise.reject(error);
//     }
//   );
// });
