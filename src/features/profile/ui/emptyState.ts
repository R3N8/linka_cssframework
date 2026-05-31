export function renderEmptyState(type: "posts" | "media") {
  const config = {
    posts: {
      title: "No posts yet",
      text: "When posts are posted, they'll appear here",
    },
    media: {
      title: "No images or videos yet",
      text: "When media is posted, it'll appear here",
    },
  };

  const c = config[type];

  return `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <h3 class="text-lg font-semibold text-black dark:text-white mb-1">
        ${c.title}
      </h3>

      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        ${c.text}
      </p>
    </div>
  `;
}