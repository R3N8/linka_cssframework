import { fetchUserPosts } from "../services/postService";
import { renderPostsTab } from "../components/posts";

export function initializeTabs(username: string) {
  const buttons = document.querySelectorAll(".tab-btn");
  const container = document.getElementById("profile-tab-content");

  if (!container) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const tab = btn.getAttribute("data-tab");

      container.innerHTML = "Loading...";

      const res = await fetchUserPosts(username);

      if (tab === "posts") {
        container.innerHTML = renderPostsTab(res.data);
      }

      if (tab === "media") {
        container.innerHTML = `<div>Media TODO</div>`;
      }

      if (tab === "followers") {
        container.innerHTML = `<div>Followers TODO</div>`;
      }

      if (tab === "following") {
        container.innerHTML = `<div>Following TODO</div>`;
      }
    });
  });
}