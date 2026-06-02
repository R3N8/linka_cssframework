import { basePostCard } from "../../../components/basePostCard";
import type { NoroffPost } from "../../../types/post";

export function feedPostCard(post: NoroffPost, index: number): string {
  return `
    <div
      class="feed-post post-card mb-4 break-inside-avoid opacity-0 animate-fade-in"
      style="animation-delay:${index * 0.05}s;animation-fill-mode:forwards"
      data-feed-post="${post.id}"
    >
      ${basePostCard(post, "feed")}
    </div>
  `;
}