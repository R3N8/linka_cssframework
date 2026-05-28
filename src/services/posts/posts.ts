import { get, post, put, del } from '../../api/client';
import type { NoroffPost, PostsApiResponse } from '../../types/post';
import { API } from '../../services/api/endpoint';

//READ METHODS

export async function getAllPosts(
  limit = 50,
  page = 1
): Promise<PostsApiResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    _author: 'true',
    _reactions: 'true',
    _comments: 'true',
  });

  return get<PostsApiResponse>(
    `${API.social.posts}?${params.toString()}`
  );
}

export async function getAllPostsUnpaginated(limit = 15): Promise<NoroffPost[]> {
  let page = 1;
  let all: NoroffPost[] = [];

  while (true) {
    const res = await getAllPosts(limit, page);
    all = all.concat(res.data);

    if (res.meta.isLastPage) break;
    page++;
  }

  return all;
}

export async function getPublicPosts(limit = 50, page = 1) {
  return getAllPosts(limit, page);
}

export async function getPostById(id: number): Promise<NoroffPost> {
  const res = await get<{ data: NoroffPost }>(
    `${API.social.posts}/${id}?_author=true&_reactions=true&_comments=true`
  );

  return res.data;
}

export async function searchPosts(query: string, limit = 20) {
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
    _author: 'true',
    _reactions: 'true',
  });

  return get<PostsApiResponse>(
    `${API.social.posts}/search?${params.toString()}`
  );
}

//WRITE METHODS

export async function createPost(payload: {
  title: string;
  body: string;
  tags?: string[];
  media?: { url: string; alt?: string };
}): Promise<NoroffPost> {
  const response = await post(API.social.posts, {
    ...payload,
    tags: payload.tags?.length ? payload.tags : [],
  });

  const newPost = (response as any).data ?? response;

  return {
    ...newPost,
    tags: newPost.tags ?? [],
    _count: newPost._count ?? { comments: 0, reactions: 0 },
    reactions: newPost.reactions ?? [],
    author: {
      ...newPost.author,
      avatar: newPost.author?.avatar ?? { url: '', alt: '' },
    },
  };
}

export const updatePost = (id: number, payload: any) =>
  put(`${API.social.posts}/${id}`, payload);

export const deletePost = (id: number) =>
  del(`${API.social.posts}/${id}`);

export const addComment = (id: number, body: string) =>
  post(`${API.social.posts}/${id}/comment`, { body });

export const replyToComment = (
  id: number,
  parentCommentId: number,
  body: string
) =>
  post(`${API.social.posts}/${id}/comment`, {
    body,
    replyToId: parentCommentId,
  });

export const reactToPost = (id: number, symbol: string) =>
  put(`${API.social.posts}/${id}/react/${symbol}`, {});

export const removeReaction = (id: number, symbol: string) =>
  del(`${API.social.posts}/${id}/react/${symbol}`);