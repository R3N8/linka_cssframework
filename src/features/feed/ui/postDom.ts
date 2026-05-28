import postCard from '../../../components/postCard';
import type { NoroffPost } from '../../../services/posts/posts';

export function insertPostIntoFeed(post: NoroffPost): void {
  const container = document.getElementById('posts-container');
  if (!container) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = postCard(post, 0);

  const el = wrapper.firstElementChild;
  if (!el) return;

  container.insertBefore(el, container.firstChild);
}

/**
 * Placeholder for pagination rendering
 */
export function renderPaginationControls(meta: any): string {
  if (!meta) return '';

  return `
    <div class="flex justify-center gap-4 py-6">
      <button class="px-4 py-2 bg-gray-200 rounded">Prev</button>
      <button class="px-4 py-2 bg-gray-200 rounded">Next</button>
    </div>
  `;
}