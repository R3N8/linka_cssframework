import { basePostCard } from '../../../components/basePostCard';
import type { NoroffPost } from '../../../types/post';

export function insertPostIntoFeed(post: NoroffPost): void {
  const container = document.getElementById('posts-container');

  if (!container) return;

  const wrapper = document.createElement('div');

  wrapper.innerHTML = basePostCard(post);

  const element = wrapper.firstElementChild;

  if (!element) return;

  container.prepend(element);
}

export function renderPaginationControls(meta: any): string {
  if (!meta) return '';

  return `
    <div class="flex justify-center gap-4 py-6">
      <button
        class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700"
      >
        Prev
      </button>

      <button
        class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700"
      >
        Next
      </button>
    </div>
  `;
}
