import { get } from "../../../api/client";

import type { NoroffPost } from "../../../types/post";

type PostsResponse = {
  data: NoroffPost[];
  meta: {
    isLastPage: boolean;
    currentPage: number;
    nextPage: number | null;
  };
};

export async function fetchUserPosts(
  username: string,
  page = 1
): Promise<PostsResponse> {
  return get<PostsResponse>(
    `/social/profiles/${username}/posts?page=${page}&_author=true&_reactions=true`
  );
}