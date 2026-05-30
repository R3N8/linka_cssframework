import { createInfiniteScroll } from "../../../features/posts/pagination/createInfiniteScroll";
import { fetchUserPosts } from "../services/postService";
import { profilePostCard } from "../components/profilePostCard";

export function initProfileInfinitePosts(
  username: string,
  container: HTMLElement
) {
  const grid = document.createElement("div");
  grid.id = "profile-posts-container";
  grid.className = "grid grid-cols-1 md:grid-cols-3 gap-4";

  container.appendChild(grid);

  createInfiniteScroll(
    grid,
    async (page: number) => {
      const res = await fetchUserPosts(username, page);

      return {
        data: res.data,
        meta: {
          isLastPage: res.meta.isLastPage,
        },
      };
    },
    (items) => {
      grid.innerHTML = items
        .map((p, i) => profilePostCard(p, i))
        .join("");
    }
  );
}