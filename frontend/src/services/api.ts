/**
 * Base API client (axios).
 *
 * Add per-feature service files (e.g. `userService.ts`, `chatService.ts`)
 * that import this `api` instance.
 */
import axios, { AxiosInstance } from "axios";
import { config } from "@/config/env";

export const api: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — attach JWT if present
api.interceptors.request.use((cfg) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

// Response interceptor — handle 401, refresh, etc.
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    // TODO: refresh token logic
    return Promise.reject(error);
  }
);

export default api;
