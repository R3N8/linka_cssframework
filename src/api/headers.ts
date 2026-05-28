import { getLocalItem } from "../utils/storage";
import { getAccessToken } from "./auth";

const API_KEY_HEADER = "X-Noroff-API-Key";

export function buildHeaders(custom?: HeadersInit): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(custom as Record<string, string>),
  };

  const apiKey = getLocalItem("apiKey");
  const token = getAccessToken();

  if (apiKey) headers[API_KEY_HEADER] = apiKey;
  if (token) headers.Authorization = `Bearer ${token}`;

  return headers;
}