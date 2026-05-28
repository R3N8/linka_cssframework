import { NoroffPost } from '../../../services/posts/posts';

export type FeedState = {
  posts: NoroffPost[];
  isSearchMode: boolean;
  isUserLoggedIn: boolean;
  postsResponse: any;
};