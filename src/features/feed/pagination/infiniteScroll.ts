import { getPublicPosts, getAllPosts } from '../../../services/posts/posts';
import postCard from '../../../components/postCard';

type FeedMode = 'public' | 'auth';

let currentPage = 1;
let isLoading = false;
let isLastPage = false;
let mode: FeedMode;

export function initInfiniteScroll(params: {
  mode: FeedMode;
  initialMeta: any;
}) {
  mode = params.mode;
  currentPage = 1;
  isLastPage = params.initialMeta?.isLastPage ?? false;

  const sentinel = document.getElementById('feed-sentinel');
  if (!sentinel) return;

  const observer = new IntersectionObserver(async (entries) => {
    const entry = entries[0];

    if (!entry.isIntersecting) return;
    if (isLoading || isLastPage) return;

    await loadNextPage();
  });

  observer.observe(sentinel);
}

async function loadNextPage() {
  isLoading = true;
  currentPage += 1;

  try {
    const res =
      mode === 'auth'
        ? await getAllPosts(15, currentPage)
        : await getPublicPosts(15, currentPage);

    const posts = res.data ?? [];

    const container = document.getElementById('posts-container');
    if (!container) return;

    const html = posts
      .map((p, i) => postCard(p, i * 0.03))
      .join('');

    container.insertAdjacentHTML('beforeend', html);

    isLastPage = res.meta?.isLastPage ?? true;
  } catch (err) {
    console.error('Infinite scroll error:', err);
  } finally {
    isLoading = false;
  }
}