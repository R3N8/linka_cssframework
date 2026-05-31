import { get, put } from "../../api/client";
import type { PostsApiResponse } from "../../types/post";
import type { ProfileWithFollowData } from "../../types";

/* ----------------------------- PROFILE ----------------------------- */

export async function fetchUserProfile(username: string) {
  const res = await get<{ data: ProfileWithFollowData }>(
    `/social/profiles/${username}?_followers=true&_following=true`
  );

  return res.data;
}

/* ----------------------------- POSTS ----------------------------- */

export async function fetchUserPosts(username: string, page = 1, limit = 15) {
  return get<PostsApiResponse>(
    `/social/profiles/${username}/posts?page=${page}&limit=${limit}&_author=true&_reactions=true`
  );
}

/* ----------------------------- FOLLOW ----------------------------- */

export async function followUser(username: string) {
  return put(`/social/profiles/${username}/follow`, {});
}

export async function unfollowUser(username: string) {
  return put(`/social/profiles/${username}/unfollow`, {});
}

export async function checkIfFollowing(
  currentUser: string,
  target: string
): Promise<boolean> {
  const res = await get<{ data: ProfileWithFollowData }>(
    `/social/profiles/${currentUser}?_following=true`
  );

  return (
    res.data.following?.some((u) => u.name === target) ?? false
  );
}

/* ----------------------------- PAGE DATA ----------------------------- */
export async function fetchProfilePageData(username: string) {
  const [profile, posts] = await Promise.all([
    fetchUserProfile(username),
    fetchUserPosts(username, 1),
  ]);

  return [profile, posts] as const;
}