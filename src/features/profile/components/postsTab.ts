import type { NoroffPost } from "../../../types/post";
import { profilePostCard } from "./profilePostCard";

export function renderPostsTab(posts: NoroffPost[]): string {
  if (!posts.length) {
    return `
      <div class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-16 h-16 mb-4 rounded-full bg-orange-500/10 flex items-center justify-center">
          <i class="fa-solid fa-pen-to-square text-2xl text-orange-600"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
          No posts yet
        </h3>
        <p class="text-sm text-slate-500">
          When posts are shared, they'll appear here
        </p>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      ${posts.map((post, i) => profilePostCard(post, i)).join("")}
    </div>
  `;
}