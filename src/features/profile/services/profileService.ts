import { get } from '../../../api/client';

import type { ProfileWithFollowData } from '../../../types';

export async function fetchUserProfile(
  username: string
): Promise<ProfileWithFollowData> {
  const res = await get<{ data: ProfileWithFollowData }>(
    `/social/profiles/${username}?_followers=true&_following=true`
  );

  return res.data;
}
