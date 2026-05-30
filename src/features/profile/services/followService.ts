import { get, put } from "../../../api/client";

import type { ProfileWithFollowData } from "../../../types";

export async function followUser(username: string) {
  return put(`/social/profiles/${username}/follow`, {});
}

export async function unfollowUser(username: string) {
  return put(`/social/profiles/${username}/unfollow`, {});
}

export async function checkIfFollowing(
  currentUser: string,
  targetUser: string
): Promise<boolean> {
  const res = await get<{ data: ProfileWithFollowData }>(
    `/social/profiles/${currentUser}?_following=true`
  );

  return (
    res.data.following?.some(
      (user) => user.name === targetUser
    ) || false
  );
}