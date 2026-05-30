import type { NoroffPost } from "../types/post";

type BasePostCardOptions = {
  showMedia?: boolean;
  showBody?: boolean;
  showTags?: boolean;
  showCounts?: boolean;
  layout?: "grid" | "list";
};

export function basePostCard(
  post: NoroffPost,
  options: BasePostCardOptions = {}
): string {
  const {
    showMedia = true,
    showBody = true,
    showTags = true,
    showCounts = true,
    layout = "grid",
  } = options;

  const hasMedia = !!post.media?.url;

  return `
    <article
      class="
        post-card
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        rounded-xl overflow-hidden
        ${layout === "grid" ? "h-full" : "flex gap-4"}
      "
      data-post-id="${post.id}"
    >

      ${
        showMedia && hasMedia
          ? `
        <div class="aspect-video bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <img
            src="${post.media?.url}"
            alt="${post.media?.alt || post.title}"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      `
          : ""
      }

      <div class="p-4 flex-1">

        <h3 class="font-bold text-slate-900 dark:text-white mb-2">
          ${post.title}
        </h3>

        ${
          showBody && post.body
            ? `
          <p class="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-3">
            ${post.body}
          </p>
        `
            : ""
        }

        ${
          showTags && post.tags?.length
            ? `
          <div class="flex flex-wrap gap-2 mb-3">
            ${post.tags
              .slice(0, 4)
              .map(
                (tag) => `
              <span class="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-600">
                #${tag}
              </span>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }

        ${
          showCounts
            ? `
          <div class="flex items-center gap-4 text-xs text-slate-500">
            <span>❤️ ${post._count.reactions}</span>
            <span>💬 ${post._count.comments}</span>
          </div>
        `
            : ""
        }

      </div>
    </article>
  `;
}