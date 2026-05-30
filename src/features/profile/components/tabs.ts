export function renderTabs() {
  return `
    <div class="flex gap-2 p-4 border-b">
      <button class="tab-btn" data-tab="posts">Posts</button>
      <button class="tab-btn" data-tab="media">Media</button>
      <button class="tab-btn" data-tab="followers">Followers</button>
      <button class="tab-btn" data-tab="following">Following</button>
    </div>
  `;
}