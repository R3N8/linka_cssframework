import { basePostCard } from "../../../components/basePostCard";
import type { NoroffPost } from "../../../types/post";
import { timeAgo } from "../utils/timeAgo";

export function profilePostCard(post: NoroffPost, index: number): string {
  return `
    <div
      class="profile-post group hover:-translate-y-0.5 transition-transform duration-200"
      style="animation-delay: ${index * 0.05}s"
      data-profile-post="${post.id}"
    >
      ${basePostCard(post, {
        layout: "grid",
        showMedia: true,
        showBody: true,
        showTags: true,
        showCounts: true,
      })}

      <div class="px-4 pb-3 text-xs text-slate-500">
        ${timeAgo(new Date(post.created))}
      </div>
    </div>
  `;
}