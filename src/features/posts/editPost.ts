import { updatePost } from '../../services/posts/posts';
import { showNotification } from '../../utils/ui/notifications';

export function openEditPost(postId: number): void {
  const postEl = document.getElementById(`post-${postId}`);
  if (!postEl) return;

  const title = postEl.querySelector('h3')?.textContent?.trim() || '';
  const body =
    postEl.querySelector('p.line-clamp-3')?.textContent?.trim() || '';

  const tags = Array.from(postEl.querySelectorAll('span'))
    .map((t) => t.textContent?.replace('#', '').trim())
    .filter(Boolean)
    .join(', ');

  const img = postEl.querySelector('img') as HTMLImageElement | null;

  const titleEl = document.getElementById(
    'editPostTitle'
  ) as HTMLInputElement | null;
  const bodyEl = document.getElementById(
    'editPostBody'
  ) as HTMLTextAreaElement | null;
  const tagsEl = document.getElementById(
    'editPostTags'
  ) as HTMLInputElement | null;
  const urlEl = document.getElementById(
    'editPostImageUrl'
  ) as HTMLInputElement | null;
  const altEl = document.getElementById(
    'editPostImageAlt'
  ) as HTMLInputElement | null;

  if (!titleEl || !bodyEl || !tagsEl || !urlEl || !altEl) return;

  titleEl.value = title;
  bodyEl.value = body;
  tagsEl.value = tags;
  urlEl.value = img?.src || '';
  altEl.value = img?.alt || '';

  const modal = document.getElementById('editPostModal');
  if (!modal) return;

  modal.dataset.postId = postId.toString();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

export async function handleEditPost(event: Event): Promise<void> {
  event.preventDefault();

  const modal = document.getElementById('editPostModal');
  const postId = Number(modal?.dataset.postId);

  if (!postId) return;

  const title = (
    document.getElementById('editPostTitle') as HTMLInputElement
  ).value.trim();
  const body = (
    document.getElementById('editPostBody') as HTMLTextAreaElement
  ).value.trim();
  const rawTags = (
    document.getElementById('editPostTags') as HTMLInputElement
  ).value.trim();
  const imageUrl = (
    document.getElementById('editPostImageUrl') as HTMLInputElement
  ).value.trim();
  const imageAlt = (
    document.getElementById('editPostImageAlt') as HTMLInputElement
  ).value.trim();

  const tags = rawTags
    ? rawTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const btn = modal?.querySelector(
    'button[type="submit"]'
  ) as HTMLButtonElement | null;

  try {
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Updating...';
    }

    const payload: any = { title, body, tags };

    if (imageUrl) {
      payload.media = { url: imageUrl, alt: imageAlt || 'image' };
    }

    const updated = await updatePost(postId, payload);

    updatePostInDOM(postId, updated);
    closeEditModal();

    showNotification('Post updated', 'success');
  } catch (err) {
    console.error(err);
    showNotification('Failed to update post', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Update Post';
    }
  }
}

function updatePostInDOM(postId: number, post: any): void {
  const el = document.getElementById(`post-${postId}`);
  if (!el) return;

  const titleEl = el.querySelector('h3');
  const bodyEl = el.querySelector('p.line-clamp-3');

  if (titleEl) titleEl.textContent = post.title;
  if (bodyEl) bodyEl.textContent = post.body;
}

export function closeEditModal(): void {
  const modal = document.getElementById('editPostModal');
  if (!modal) return;

  modal.classList.add('hidden');
  modal.classList.remove('flex');

  delete modal.dataset.postId;
}
