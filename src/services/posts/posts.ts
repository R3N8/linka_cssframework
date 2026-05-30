import { get, post, put, del } from "../../api/client";
import type { NoroffPost } from "../../types/post";
import { API } from "../api/endpoint";

type PaginatedResponse<T> = {
  data: T[];
  meta: {
    isLastPage: boolean;
    currentPage?: number;
  };
};

/* ----------------------------- READ ----------------------------- */

export async function getAllPosts(
  page: number,
  limit: number
): Promise<PaginatedResponse<NoroffPost>> {
  return get<PaginatedResponse<NoroffPost>>(
    `/social/posts?page=${page}&limit=${limit}&_author=true&_reactions=true`
  );
}

export async function getPostById(id: number) {
  const res = await get<{ data: NoroffPost }>(
    `${API.social.posts}/${id}?_author=true&_reactions=true&_comments=true`
  );

  return res.data;
}

export async function searchPosts(query: string, limit = 20) {
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
    _author: "true",
    _reactions: "true",
  });

  return get<PaginatedResponse<NoroffPost>>(
    `${API.social.posts}/search?${params.toString()}`
  );
}

export async function getAllPostsUnpaginated(limit = 50) {
  return get<NoroffPost[]>(
    `/social/posts?_author=true&_reactions=true&limit=${limit}`
  );
}

/* ----------------------------- WRITE ----------------------------- */

export async function createPost(payload: {
  title: string;
  body: string;
  tags?: string[];
  media?: { url: string; alt?: string };
}) {
  const res = await post<{ data: NoroffPost }>(
    API.social.posts,
    {
      ...payload,
      tags: payload.tags ?? [],
    }
  );

  return res.data;
}

export const updatePost = (id: number, payload: any) =>
  put(`${API.social.posts}/${id}`, payload);

export const deletePost = (id: number) =>
  del(`${API.social.posts}/${id}`);

export const reactToPost = (id: number, symbol: string) =>
  put(`${API.social.posts}/${id}/react/${symbol}`, {});

export const removeReaction = (id: number, symbol: string) =>
  del(`${API.social.posts}/${id}/react/${symbol}`);