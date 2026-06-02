import type { NoroffPost } from '../../../types/post';

export type FeedState = {
  posts: NoroffPost[];
  isSearchMode: boolean;
  isUserLoggedIn: boolean;
  postsResponse: any;
};
