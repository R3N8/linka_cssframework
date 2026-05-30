import { createPost } from '../../services/posts/posts';
import { showNotification } from '../../utils/ui/notifications';
import type { NoroffPost } from '../../types/post';
import { insertPostIntoFeed } from '../feed/ui/postDom';

export async function handleCreatePost(event: Event): Promise<void> {
  event.preventDefault();

  const form = event.target as HTMLFormElement;

  const titleEl = document.getElementById('post-title') as HTMLInputElement | null;
  const bodyEl = document.getElementById('post-body') as HTMLTextAreaElement | null;
  const tagsEl = document.getElementById('post-tags') as HTMLInputElement | null;
  const imageUrlEl = document.getElementById('post-image-url') as HTMLInputElement | null;
  const imageAltEl = document.getElementById('post-image-alt') as HTMLInputElement | null;

  if (!titleEl || !bodyEl) return;

  const title = titleEl.value.trim();
  const body = bodyEl.value.trim();
  const rawTags = tagsEl?.value.trim() || '';

  if (!title || !body) {
    showNotification('Title and body required', 'error');
    return;
  }

  const tags = rawTags.split(',').map(t => t.trim()).filter(Boolean);

  const btn = form.querySelector("button[type='submit']") as HTMLButtonElement | null;

  try {
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Posting...';
    }

    const payload: any = {
      title,
      body,
      tags
    };

    if (imageUrlEl?.value) {
      payload.media = {
        url: imageUrlEl.value,
        alt: imageAltEl?.value || 'image'
      };
    }

    const res = await createPost(payload);

    const post: NoroffPost = {
      ...res,
      tags: res.tags || [],
      _count: res._count || { comments: 0, reactions: 0 },
      reactions: res.reactions || []
    };

    insertPostIntoFeed(post);

    form.reset();
    showNotification('Post created', 'success');

  } catch (err) {
    console.error(err);
    showNotification('Failed to create post', 'error');

  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Post';
    }
  }
}

/**
 * EVENT BINDING (no window pollution anymore)
 */
export function bindFeedEvents(): void {
  document
    .getElementById('create-post-form')
    ?.addEventListener('submit', handleCreatePost);
}