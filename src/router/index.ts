import IntroAuthPage from '../pages/IntroAuthPage.js';
import FeedPage from '../features/feed/feedPage.js';
import ProfilePage from '../features/profile/profilePage.js';
import NotFoundPage from '../pages/NotFoundPage';

import { APP_CONTAINER_CLASSNAME } from '../constants/app.js';
import { isLoggedIn } from '../utils/auth';

type RouteDef = {
  url: string;
  component: () => string | Promise<string>;
  protected?: boolean;
};

const ROUTES: Record<string, RouteDef> = {
  root:     { url: '/',         component: IntroAuthPage },
  login:    { url: '/login',    component: IntroAuthPage },
  register: { url: '/register', component: IntroAuthPage },
  feed:     { url: '/feed',     component: FeedPage,    protected: true },
  profile:  { url: '/profile',  component: ProfilePage, protected: true },
};

function matchRoute(path: string): RouteDef | null {
  return Object.values(ROUTES).find(r => r.url === path) ?? null;
}

export default async function router(path: string): Promise<string> {
  const currentPath = path || window.location.pathname;
  const route = matchRoute(currentPath);

  if (!route) return await NotFoundPage();

  const loggedIn = isLoggedIn();

  if (route.protected && !loggedIn) {
    history.pushState({}, '', '/login');
    return await ROUTES.login.component();
  }

  if (loggedIn && ['/', '/login', '/register'].includes(currentPath)) {
    history.pushState({}, '', '/feed');
    return await ROUTES.feed.component();
  }

  return await route.component();
}

export async function renderRoute(path?: string) {
  const url = new URL(
    path ?? window.location.href,
    window.location.origin
  );

  const container = document.getElementById(APP_CONTAINER_CLASSNAME);
  if (!container) return;

  const query = Object.fromEntries(url.searchParams.entries());

  window.__route = {
    path: url.pathname,
    query,
  };

  const html = await router(url.pathname);
  container.innerHTML = html;

  window.__routeDidMount?.();
  window.__routeDidMount = undefined;

  try {
    window.updateNavbarVisibility?.(url.pathname);
  } catch {}

  const loading = window.loadingScreen;
  if (loading) {
    setTimeout(() => loading.hideLoadingScreen(), 300);
  }
}