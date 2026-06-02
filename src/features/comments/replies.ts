import { createComment } from '../../services/interactions';
import { showNotification } from '../../utils/ui/notifications';

export function startReply(commentId: number, username: string): void {
  document
    .querySelectorAll('[id^="reply-form-"]')
    .forEach(el => el.classList.add('hidden'));

  const form = document.getElementById(`reply-form-${commentId}`);
  const input = document.getElementById(
    `reply-input-${commentId}`
  ) as HTMLInputElement;

  if (!form || !input) return;

  form.classList.remove('hidden');
  input.value = `@${username} `;
  input.focus();
}

export function cancelReply(commentId: number): void {
  const form = document.getElementById(`reply-form-${commentId}`);
  const input = document.getElementById(
    `reply-input-${commentId}`
  ) as HTMLInputElement;

  if (!form || !input) return;

  form.classList.add('hidden');
  input.value = '';
}

export async function submitReply(
  postId: number,
  commentId: number
): Promise<void> {
  const input = document.getElementById(
    `reply-input-${commentId}`
  ) as HTMLInputElement;

  const text = input?.value.trim();
  if (!text) return;

  try {
    await createComment(postId.toString(), text, commentId.toString());

    input.value = '';
    cancelReply(commentId);

    showNotification('Reply added', 'success');
  } catch (err) {
    console.error(err);
    showNotification('Failed to add reply', 'error');
  }
}