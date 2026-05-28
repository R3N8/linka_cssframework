import { ENV } from "../../constants/env";

export const API = {
  base: ENV.API_BASE_URL,

  social: {
    posts: `${ENV.API_BASE_URL}/social/posts`,
  },

  auth: {
    login: `${ENV.API_BASE_URL}/auth/login`,
    register: `${ENV.API_BASE_URL}/auth/register`,
    apiKey: `${ENV.API_BASE_URL}/auth/create-api-key`,
  },
};