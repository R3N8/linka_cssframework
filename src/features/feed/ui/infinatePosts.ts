import { getAllPosts } from '../../../services/posts/posts';
import { feedPostCard } from './feedPostCard';
import type { NoroffPost } from '../../../types/post';

type PaginatedResponse<T> = {
  data: T[];
  meta: {
    isLastPage: boolean;
  };
};

export function initFeedInfinitePosts() {
  const container = document.getElementById('posts-container') as HTMLElement;
  const sentinel = document.getElementById('feed-sentinel') as HTMLElement;

  if (!container || !sentinel) return;

  let page = 1;
  let loading = false;
  let done = false;
  let items: NoroffPost[] = [];

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) load();
  });

  observer.observe(sentinel);

  async function load() {
    if (loading || done) return;
    loading = true;
    try {
      const res: PaginatedResponse<NoroffPost> = await getAllPosts(page, 15);
      const newItems = res.data;

      if (!newItems.length) {
        done = true;
        return;
      }

      items = [...items, ...newItems];

      container.innerHTML = items
        .map((p, i) => feedPostCard(p, i * 0.03))
        .join('');

      done = res.meta.isLastPage;
      page++;
    } finally {
      loading = false;
    }
  }

  load();
}