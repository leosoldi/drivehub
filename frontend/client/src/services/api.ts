// client/src/services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string) ?? "http://localhost:3333/",
});

// helper para setar/remover token no header
export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}
