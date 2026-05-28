import IntroAuthPage from '../pages/IntroAuthPage.js';
import FeedPage from '../features/feed/FeedPage.js';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';

import { APP_CONTAINER_CLASSNAME } from '../constants/app.js';
import { isLoggedIn } from '../utils/auth';

type RouteDef = {
  url: string;
  component: () => string | Promise<string>;
  protected?: boolean;
};

const ROUTES: Record<string, RouteDef> = {
  root: { url: '/', component: IntroAuthPage },
  login: { url: '/login', component: IntroAuthPage },
  register: { url: '/register', component: IntroAuthPage },

  feed: { url: '/feed', component: FeedPage, protected: true },
  profile: { url: '/profile', component: ProfilePage, protected: true },
};

function matchRoute(path: string): RouteDef | null {
  return Object.values(ROUTES).find(r => r.url === path) ?? null;
}

export default async function router(path: string): Promise<string> {
  const currentPath = path || window.location.pathname;
  const route = matchRoute(currentPath);

  // 404 fallback
  if (!route) return await NotFoundPage();

  // 🔐 protected route guard
  if (route.protected && !isLoggedIn()) {
    history.pushState({}, '', '/');
    return await ROUTES.root.component();
  }

  // 🔁 auth redirect (if logged in)
  if (
    isLoggedIn() &&
    (currentPath === '/' || currentPath === '/login' || currentPath === '/register')
  ) {
    history.pushState({}, '', '/feed');
    return await ROUTES.feed.component();
  }

  return await route.component();
}

export async function renderRoute(path?: string) {
  const targetPath = path ?? window.location.pathname;
  const container = document.getElementById(APP_CONTAINER_CLASSNAME);

  if (!container) return;

  const html = await router(targetPath);
  container.innerHTML = html;

  // Optional navbar hook (safe)
  try {
    (window as any).updateNavbarVisibility?.(targetPath);
  } catch {}

  // Optional loading screen hook (safe)
  const loading = (window as any).loadingScreen;
  if (loading) {
    setTimeout(() => loading.hideLoadingScreen(), 300);
  }
}