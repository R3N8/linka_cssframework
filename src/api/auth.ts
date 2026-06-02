import { post } from './client';

const AUTH_URL = 'https://v2.api.noroff.dev/auth';

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken') || localStorage.getItem('token');
}

export async function loginUser(data: any) {
  return post(`${AUTH_URL}/login`, data, { skipAuth: true });
}

export async function registerUser(data: any) {
  return post(`${AUTH_URL}/register`, data, { skipAuth: true });
}

export async function fetchApiKey(accessToken: string) {
  const res = await post<{ data: { key: string } }>(
    `${AUTH_URL}/create-api-key`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      skipAuth: true,
    }
  );

  return res.data.key;
}
