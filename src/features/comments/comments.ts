import { createComment, deleteComment } from '../../services/interactions/interactions';
import { getLocalItem } from '../../utils/storage';
import { showNotification } from '../../utils/ui/notifications';

/**
 * Toggle comments visibility + lazy load
 */
export async function toggleComments(postId: number): Promise<void> {
  const section = document.getElementById(`comments-${postId}`);
  if (!section) return;

  const isVisible = !section.classList.contains('hidden');

  if (isVisible) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  await loadComments(postId);
}

/**
 * Load comments from API
 */
export async function loadComments(postId: number): Promise<void> {
  const container = document.getElementById(`comments-list-${postId}`);
  if (!container) return;

  container.innerHTML = `<p class="text-slate-500 text-sm text-center py-4">Loading comments...</p>`;

  try {
    const token =
      localStorage.getItem('accessToken') ||
      localStorage.getItem('token');

    const apiKey = localStorage.getItem('apiKey') || '';

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) headers.Authorization = `Bearer ${token}`;
    if (apiKey) headers['X-Noroff-API-Key'] = apiKey;

    const res = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}?_comments=true&_author=true`,
      { headers }
    );

    const json = await res.json();
    const comments = json?.data?.comments ?? [];

    container.innerHTML = '';

    if (!comments.length) {
      container.innerHTML = `
        <p class="text-slate-500 text-sm text-center py-4">
          No comments yet. Be the first!
        </p>`;
      return;
    }

    const currentUser = getLocalItem('user');

    comments.forEach((comment: any) => {
      renderComment(container, postId, comment, currentUser);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <p class="text-red-400 text-sm text-center py-4">
        Failed to load comments.
      </p>`;
  }
}

/**
 * Submit a new comment
 */
export async function submitComment(postId: number): Promise<void> {
  const input = document.getElementById(
    `comment-input-${postId}`
  ) as HTMLInputElement;

  const text = input?.value.trim();
  if (!text) return;

  try {
    const res = await createComment(postId.toString(), text);

    input.value = '';

    const currentUser = getLocalItem('user');

    const container = document.getElementById(`comments-list-${postId}`);
    if (container) {
      renderComment(container, postId, {
        id: res.data.id,
        body: text,
        created: new Date().toISOString(),
        author: { name: currentUser || 'You', avatar: null },
      }, currentUser);
    }

    showNotification('Comment added', 'success');
  } catch (err) {
    console.error(err);
    showNotification('Failed to add comment', 'error');
  }
}

/**
 * Delete comment
 */
export async function deleteCommentHandler(
  postId: number,
  commentId: number
): Promise<void> {
  try {
    await deleteComment(postId.toString(), commentId.toString());

    const el = document.querySelector(
      `[data-comment-id="${commentId}"]`
    ) as HTMLElement;

    if (el) el.remove();

    showNotification('Comment deleted', 'success');
  } catch (err) {
    console.error(err);
    showNotification('Failed to delete comment', 'error');
  }
}

/**
 * Render comment UI
 */
function renderComment(
  container: HTMLElement,
  postId: number,
  comment: any,
  currentUser?: string | null
): void {
  const isOwner = currentUser && comment.author?.name === currentUser;
  const avatar = comment.author?.avatar?.url;

  const el = document.createElement('div');
  el.dataset.commentId = comment.id;

  el.className =
    'flex gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700';

  el.innerHTML = `
    <div class="shrink-0">
      ${
        avatar
          ? `<img src="${avatar}" class="w-8 h-8 rounded-full">`
          : `<div class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
              ${comment.author.name?.[0]?.toUpperCase() || '?'}
             </div>`
      }
    </div>

    <div class="flex-1">
      <div class="flex items-center gap-2">
        <span class="font-semibold text-sm">${comment.author.name}</span>
        <span class="text-xs text-slate-500">
          ${new Date(comment.created).toLocaleDateString()}
        </span>
      </div>

      <p class="text-sm text-slate-700 dark:text-slate-300 mt-1">
        ${comment.body}
      </p>

      <div class="flex gap-3 mt-2 text-xs">
        <button onclick="startReply(${comment.id}, '${comment.author.name}')">
          Reply
        </button>

        ${
          isOwner
            ? `<button class="text-red-500"
                 onclick="deleteCommentHandler(${postId}, ${comment.id})">
                 Delete
               </button>`
            : ''
        }
      </div>
    </div>
  `;

  container.appendChild(el);
}