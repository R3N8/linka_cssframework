import type { NoroffPost } from '../../../types/post';
import { initTabs } from './initTabs';
import { initFollowUI } from './followUI';
import { initProfileAnimations } from './animations';

export function initProfileUI(
  username: string,
  posts: NoroffPost[],
  isOwnProfile: boolean
) {
  initTabs(posts);

  if (!isOwnProfile) {
    initFollowUI(username);
  }

  initProfileAnimations();
}
