import { buildHeaders } from "./headers";
import { ApiError } from "../api/errors";

type Body = object | FormData | null;

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: Body;
}

async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, ...rest } = options;

  const config: RequestInit = {
    ...rest,
    headers: buildHeaders(rest.headers),
  };

  // Handle request body
  if (body instanceof FormData) {
    config.body = body;
  } else if (body) {
    config.body = JSON.stringify(body);

    (config.headers as Record<string, string>)["Content-Type"] =
      "application/json";
  }

  const res = await fetch(url, config);

  const isJson = res.headers
    .get("content-type")
    ?.includes("application/json");

  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new ApiError(
      data?.errors?.[0]?.message || `HTTP ${res.status}`,
      res.status
    );
  }

  return data as T;
}

/* -------------------------------------------------------------------------- */
/* API KEY                                                                    */
/* -------------------------------------------------------------------------- */

export async function fetchApiKey(
  accessToken: string
): Promise<string | undefined> {
  const response = await post<{
    data: { key: string };
  }>(
    "https://v2.api.noroff.dev/auth/create-api-key",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response?.data?.key;
}

/* -------------------------------------------------------------------------- */
/* PUBLIC METHODS                                                             */
/* -------------------------------------------------------------------------- */

export const get = <T>(
  url: string,
  options?: RequestOptions
) =>
  request<T>(url, {
    method: "GET",
    ...options,
  });

export const post = <T>(
  url: string,
  body?: Body,
  options?: RequestOptions
) =>
  request<T>(url, {
    method: "POST",
    body,
    ...options,
  });

export const put = <T>(
  url: string,
  body?: Body,
  options?: RequestOptions
) =>
  request<T>(url, {
    method: "PUT",
    body,
    ...options,
  });

export const del = <T>(
  url: string,
  options?: RequestOptions
) =>
  request<T>(url, {
    method: "DELETE",
    ...options,
  });