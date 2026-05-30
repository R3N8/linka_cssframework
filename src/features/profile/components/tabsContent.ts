import type { NoroffPost } from "../../../types/post";

export function renderPostsTab(posts: NoroffPost[]): string {
  if (!posts.length) {
    return `
      <div class="text-center py-16">
        No posts yet
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${posts.map(renderPostCard).join("")}
    </div>
  `;
}

export function renderMediaTab(posts: NoroffPost[]): string {
  const media = posts.filter((p) => p.media?.url);

  if (!media.length) {
    return renderPlaceholderTab("media");
  }

  return `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      ${media
        .map(
          (p) => `
        <div class="aspect-square overflow-hidden rounded-lg">
          <img src="${p.media?.url}" class="w-full h-full object-cover" />
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

export function renderPlaceholderTab(type: string): string {
  const map: Record<string, string> = {
    following: "Following list coming soon",
    followers: "Followers list coming soon",
    media: "No media available",
  };

  return `
    <div class="text-center py-16 text-slate-500">
      ${map[type] || "Coming soon"}
    </div>
  `;
}

function renderPostCard(post: NoroffPost) {
  return `
    <article class="border rounded-lg p-4">
      <h3 class="font-bold">${post.title}</h3>
      <p class="text-sm text-gray-500">${post.body || ""}</p>
    </article>
  `;
}