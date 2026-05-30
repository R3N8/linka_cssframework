import type { NoroffPost } from "../../../types/post";

export function renderMedia(posts: NoroffPost[]): string {
  const media = posts.filter((p) => p.media?.url);

  if (!media.length) {
    return `
      <div class="text-center py-16 text-slate-500">
        No media available
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      ${media
        .map(
          (p) => `
          <div class="aspect-square overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700">
            <img
              src="${p.media?.url}"
              class="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
        `
        )
        .join("")}
    </div>
  `;
}