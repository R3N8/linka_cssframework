import {
  getPublicPosts,
  getAllPostsUnpaginated,
  type NoroffPost,
} from '../../services/posts/posts';

import postCard from '../../components/postCard';
import { bindFeedEvents } from '../posts/createPost';
import { initInfiniteScroll } from './pagination/infiniteScroll';
import { renderModals } from '../modals';

type FeedMode = 'public' | 'auth';

export default async function FeedPage(): Promise<string> {
  try {
    const mode = getFeedMode();

    const posts: NoroffPost[] =
      mode === 'auth'
        ? await getAllPostsUnpaginated(15)
        : (await getPublicPosts(15, 1)).data;

    // hydrate AFTER render
    setTimeout(() => {
      bindFeedEvents();
      initInfiniteScroll({
        mode,
        initialMeta: undefined, // auth mode doesn't have meta from unpaginated
      });
    }, 0);

    return `
      <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pt-4 px-4 sm:px-6 lg:px-8">
        <main class="max-w-5xl mx-auto">

          <header class="text-center mb-10 pt-20">
            <h1 class="text-4xl sm:text-5xl font-bold text-orange-500 mb-3">
              ${mode === 'auth' ? 'Your Feed' : 'Social Feed'}
            </h1>
          </header>

          <section>
            <form id="create-post-form"></form>
          </section>

          <div id="posts-container" class="space-y-8 mb-12">
            ${
              posts.length
                ? posts
                    .map((p, i) => postCard(p, i * 0.05))
                    .join('')
                : `<div class="text-center p-10 text-slate-500">No posts available</div>`
            }
          </div>

          <div id="feed-sentinel" class="h-10"></div>

        </main>

        ${renderModals ? renderModals() : ''}

      </div>
    `;
  } catch (err) {
    console.error('FeedPage error:', err);
    return `<div class="p-10 text-red-500">Failed to load feed</div>`;
  }
}

function getFeedMode(): FeedMode {
  return localStorage.getItem('token') ? 'auth' : 'public';
}