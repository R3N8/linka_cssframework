import { initFeedInfinitePosts } from './ui/infinatePosts';
import { bindFeedEvents } from '../posts/createPost';
import { renderModals } from '../modals';

type FeedMode = 'public' | 'auth';

function getFeedMode(): FeedMode {
  return localStorage.getItem('token')
    ? 'auth'
    : 'public';
}

export default async function FeedPage(): Promise<string> {
  const mode = getFeedMode();

  window.__routeDidMount = () => {
    initFeedInfinitePosts();
    bindFeedEvents();
  };

  return `
    <div class="min-h-screen bg-bg-light dark:bg-bg-dark pt-4 md:px-4">
      <main class="mx-auto">

        <header class="text-center mb-8 pt-20">
          <h1 class="text-3xl font-bold text-accent">
            ${mode === 'auth' ? 'Your Feed' : 'Social Feed'}
          </h1>
        </header>

        <section>
          <form id="create-post-form"></form>
        </section>

        <div id="posts-container" class="columns-1 md:columns-2 xl:columns-3 gap-4"></div>

        <div id="feed-sentinel" class="h-10"></div>

      </main>

      ${renderModals?.() ?? ''}
    </div>
  `;
}