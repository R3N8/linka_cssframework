import { setLocalItem } from "../utils/storage";
import { fetchApiKey } from "./client";

import { post } from "./client";
import type {
  LoginCredentials,
  RegisterData,
  ApiResponse,
  LoginResponse,
  RegisterResponse,
} from "../types";

const AUTH_URL = "https://v2.api.noroff.dev/auth";

export async function loginUser(
  data: LoginCredentials
): Promise<ApiResponse<LoginResponse>> {
  return post(`${AUTH_URL}/login`, data);
}

export async function registerUser(
  data: RegisterData
): Promise<ApiResponse<RegisterResponse>> {
  return post(`${AUTH_URL}/register`, data);
}

export function getAccessToken(): string | null {
  return (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token")
  );
}

export async function ensureApiKey(): Promise<void> {
  const token = getAccessToken();

  if (!token || localStorage.getItem("apiKey")) {
    return;
  }

  try {
    const key = await fetchApiKey(token);

    if (key) {
      setLocalItem("apiKey", key);
    }
  } catch (error) {
    console.warn("Failed to fetch API key", error);
  }
}