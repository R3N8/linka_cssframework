import { deletePost } from '../../services/posts/posts';
import { showNotification } from '../../utils/ui/notifications';

export async function handleDeletePost(postId: number): Promise<void> {
  if (!confirm('Delete this post?')) return;

  try {
    await deletePost(postId);
    removePostFromDOM(postId);
    showNotification('Post deleted', 'success');

  } catch (err) {
    console.error(err);
    showNotification('Failed to delete post', 'error');
  }
}

function removePostFromDOM(postId: number): void {
  const el = document.getElementById(`post-${postId}`);
  if (!el) return;

  el.style.opacity = '0';
  el.style.transform = 'translateY(-10px)';

  setTimeout(() => el.remove(), 250);
}