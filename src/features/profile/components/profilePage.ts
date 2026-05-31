import type { ProfileWithFollowData } from "../../../types";
import type { NoroffPost } from "../../../types/post";

import { renderHeader } from "./header";
import { renderInfo } from "./info";
import { renderStats } from "./stats";
import { renderTabs } from "./tabs";
import { renderPostsTab } from "./tabsContent";

export function renderProfilePage(
  profile: ProfileWithFollowData,
  posts: NoroffPost[],
  isOwnProfile: boolean
) {
  return `
    <div class="profile-page min-h-screen bg-bg-light dark:bg-bg-dark">

      <div class="bg-bg-light dark:bg-bg-dark overflow-hidden">

        ${renderHeader(profile)}

        <div class="mx-auto">
          ${renderInfo(profile, isOwnProfile)}
          ${renderStats(profile)}
          ${renderTabs()}
        </div>

        <div id="profile-tab-content" class="p-6">
          ${renderPostsTab(posts)}
        </div>

      </div>

    </div>
  `;
}