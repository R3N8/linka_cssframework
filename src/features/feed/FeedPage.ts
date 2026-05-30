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
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pt-4 px-4">
      <main class="max-w-5xl mx-auto">

        <header class="text-center mb-10 pt-20">
          <h1 class="text-4xl font-bold text-orange-500">
            ${mode === 'auth' ? 'Your Feed' : 'Social Feed'}
          </h1>
        </header>

        <section>
          <form id="create-post-form"></form>
        </section>

        <div id="posts-container" class="space-y-8 mb-12"></div>

        <div id="feed-sentinel" class="h-10"></div>

      </main>

      ${renderModals?.() ?? ''}
    </div>
  `;
}