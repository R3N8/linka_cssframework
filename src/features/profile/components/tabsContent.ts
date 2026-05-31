import type { NoroffPost } from "../../../types/post";
import { renderEmptyState } from "../ui/emptyState";
import { profilePostCard } from "./profilePostCard";

export function renderPostsTab(posts: NoroffPost[]): string {
  if (!posts.length) return renderEmptyState("posts");

  return `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${posts.map(profilePostCard).join("")}
    </div>
  `;
}

export function renderMediaTab(posts: NoroffPost[]): string {
  const media = posts.filter((p) => p.media?.url);

  if (!media.length) return renderEmptyState("media");

  return `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      ${media.map((p) => `
        <div class="aspect-square overflow-hidden rounded
          bg-surface-light dark:bg-surface-dark
          border border-neutral-400">
          <img
            src="${p.media?.url}"
            alt="media"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      `).join("")}
    </div>
  `;
}