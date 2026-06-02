export function renderTabs() {
  return `
    <div class="tab-wrapper flex gap-6 px-2 md:px-4 pt-4">

      <button
        class="tab-btn"
        data-tab="posts"
      >
        Posts
      </button>

      <button
        class="tab-btn"
        data-tab="media"
      >
        Media
      </button>

    </div>
  `;
}
