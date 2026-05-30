import type { ProfileWithFollowData } from "../../../types";
import type { NoroffPost } from "../../../types/post";

import { renderHeader } from "./header";
import { renderInfo } from "./info";
import { renderStats } from "./stats";
import { renderTabs } from "./tabs";
import { renderPostsTab } from "./posts";

export function renderProfilePage(
  profile: ProfileWithFollowData,
  posts: NoroffPost[],
  isOwnProfile: boolean
) {
  return `
    <div class="profile-page min-h-screen bg-slate-50 dark:bg-slate-900">
      <div>
        <div class="bg-white dark:bg-slate-800 overflow-hidden">
          ${renderHeader(profile, isOwnProfile)}
          ${renderInfo(profile, isOwnProfile)}
          ${renderStats(profile)}
          ${renderTabs()}

          <div id="profile-tab-content" class="p-6">
            ${renderPostsTab(posts)}
          </div>

        </div>
      </div>
    </div>
  `;
}