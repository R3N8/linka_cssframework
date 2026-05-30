import type { ProfileWithFollowData } from "../../../types";

export function renderStats(profile: ProfileWithFollowData) {
  return `
    <div class="grid grid-cols-3 text-center border-y p-4">
      <div>${profile._count.posts} Posts</div>
      <div id="followers-count">${profile._count.followers} Followers</div>
      <div>${profile._count.following} Following</div>
    </div>
  `;
}