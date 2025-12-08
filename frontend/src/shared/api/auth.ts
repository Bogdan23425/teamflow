import { apiFetch } from "./client";

export type AuthUser = {
  id: string;
  email: string;
  provider: string;
  name: string | null;
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export function login(data: { email: string; password: string }) {
  return apiFetch<AuthResponse>("/auth/login", { method: "POST", body: data });
}

export function register(data: { email: string; password: string; name?: string }) {
  return apiFetch<AuthResponse>("/auth/register", { method: "POST", body: data });
}

export function refresh() {
  return apiFetch<AuthResponse>("/auth/refresh", { method: "POST" });
}

export function logout() {
  return apiFetch<{ success: boolean }>("/auth/logout", { method: "POST" });
}
