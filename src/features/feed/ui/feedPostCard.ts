import { basePostCard } from "../../../components/basePostCard";
import type { NoroffPost } from "../../../types/post";

export function feedPostCard(post: NoroffPost, index: number): string {
  return `
    <div
      class="feed-post opacity-0 animate-fade-in cursor-pointer"
      style="animation-delay: ${index * 0.05}s; animation-fill-mode: forwards;"
      data-feed-post="${post.id}"
    >
      ${basePostCard(post, {
        layout: "grid",
        showMedia: true,
        showBody: true,
        showTags: true,
        showCounts: true,
      })}
    </div>
  `;
}