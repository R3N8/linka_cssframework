import { ENV } from '../constants/env';
import { ApiError } from './errors';

type Body = object | FormData | null;

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: Body;
  skipAuth?: boolean;
}

export async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${ENV.API_BASE_URL}${endpoint}`;

  const { body, skipAuth, ...rest } = options;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(rest.headers as Record<string, string>),
  };

  if (!skipAuth) {
    const token = localStorage.getItem('accessToken');
    const apiKey = localStorage.getItem('apiKey');

    if (token) headers.Authorization = `Bearer ${token}`;
    if (apiKey) headers['X-Noroff-API-Key'] = apiKey;
  }

  const config: RequestInit = {
    ...rest,
    headers,
  };

  if (body instanceof FormData) {
    config.body = body;
  } else if (body) {
    config.body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, config);

  const isJson = res.headers.get('content-type')?.includes('application/json');

  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new ApiError(
      data?.errors?.[0]?.message || `HTTP ${res.status}`,
      res.status
    );
  }

  return data as T;
}

export const get = <T>(url: string, opt?: RequestOptions) =>
  request<T>(url, { method: 'GET', ...opt });

export const post = <T>(url: string, body?: Body, opt?: RequestOptions) =>
  request<T>(url, { method: 'POST', body, ...opt });

export const put = <T>(url: string, body?: Body, opt?: RequestOptions) =>
  request<T>(url, { method: 'PUT', body, ...opt });

export const del = <T>(url: string, opt?: RequestOptions) =>
  request<T>(url, { method: 'DELETE', ...opt });
