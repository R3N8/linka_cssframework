import { toggleReaction } from '../../services/interactions/interactions';
import { showNotification } from '../../utils/ui/notifications';

export async function handleToggleReaction(
  postId: number,
  emoji: string
): Promise<void> {
  try {
    const added = await toggleReaction(postId.toString(), emoji);

    const span = document.querySelector(
      `article[data-post-id="${postId}"] button[onclick*="toggleReaction"] span`
    );

    if (span) {
      const count = parseInt(span.textContent || '0');

      span.textContent = added
        ? (count + 1).toString()
        : Math.max(0, count - 1).toString();
    }
  } catch (err) {
    console.error(err);
    showNotification('Reaction failed', 'error');
  }
}

export function selectReaction(postId: number, emoji: string): void {
  handleToggleReaction(postId, emoji);

  const modal = document.getElementById(`reactions-${postId}`);
  if (modal) modal.classList.add('hidden');
}