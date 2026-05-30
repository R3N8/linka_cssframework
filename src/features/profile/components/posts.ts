import type { NoroffPost } from "../../../types/post";
import { profilePostCard } from "./profilePostCard";

export function renderPostsTab(posts: NoroffPost[]) {
  if (!posts.length) {
    return `<div class="text-center py-10">No posts</div>`;
  }

  return `
    <div class="grid md:grid-cols-3 gap-4">
      ${posts.map(profilePostCard).join("")}
    </div>
  `;
}