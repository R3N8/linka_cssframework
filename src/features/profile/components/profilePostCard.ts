import { basePostCard } from '../../../components/basePostCard';
import type { NoroffPost } from '../../../types/post';

export function profilePostCard(post: NoroffPost, index: number): string {
  return `
    <div
      style="animation-delay:${index * 0.05}s"
      data-profile-post="${post.id}"
    >
      ${basePostCard(post, 'profile')}
    </div>
  `;
}
