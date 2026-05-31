import type { NoroffPost } from "../../../types/post";
import { renderMediaTab, renderPostsTab } from "../components/tabsContent";

type Tab = "posts" | "media";

let tabsAbortController: AbortController | null = null;

export function initTabs(posts: NoroffPost[]) {
  // Re-query every time to avoid stale reference
  const getContainer = () => document.querySelector<HTMLElement>("#profile-tab-content");

  if (!getContainer()) {
    console.warn("initTabs: #profile-tab-content not found");
    return;
  }

  tabsAbortController?.abort();
  tabsAbortController = new AbortController();

  const render = (tab: Tab) => {
    const container = getContainer();
    if (!container) return;
    container.innerHTML = tab === "posts"
      ? renderPostsTab(posts)
      : renderMediaTab(posts);
  };

  const setActive = (tab: Tab) => {
    document.querySelectorAll<HTMLButtonElement>(".tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tab);
    });
    render(tab);
  };

  document.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(".tab-btn");
    if (!btn) return;
    const tab = btn.dataset.tab as Tab;
    if (!tab) return;
    setActive(tab);
  }, { signal: tabsAbortController.signal });

  setActive("posts");
}