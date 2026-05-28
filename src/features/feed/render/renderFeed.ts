import { renderEmptyState } from './renderEmptyState';
import postCard from '../../../components/postCard';

export function renderFeed({
  posts,
  isSearchMode,
  isUserLoggedIn,
}: any): string {
  return `
    <div class="space-y-8 mb-12" id="posts-container">
      ${
        posts.length > 0
          ? posts.map((post: any, i: number) => postCard(post, i * 0.1)).join('')
          : isSearchMode
            ? renderEmptyState('🔍', 'No posts found', 'Try different keywords')
            : renderEmptyState(
                '🔭',
                'No posts available',
                isUserLoggedIn
                  ? 'Start following people!'
                  : 'No posts yet',
              )
      }
    </div>

    <!-- sentinel for infinite scroll -->
    <div id="feed-sentinel" class="h-10"></div>
  `;
}