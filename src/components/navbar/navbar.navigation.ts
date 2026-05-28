import { renderRoute } from '../../router';
import type { NavigationRoute } from './navbar.types';
import { closeMobileMenu } from './navbar.mobile';
import { updateActiveNav } from './navbar.utils';

export function navigate(path: NavigationRoute) {
  closeMobileMenu();

  history.pushState({ path }, '', path);

  renderRoute(path);

  updateActiveNav();
}

export function bindNavigation(
  element: HTMLElement | null,
  path: NavigationRoute
) {
  if (!element) return;

  element.addEventListener('click', (e) => {
    e.preventDefault();

    navigate(path);
  });
}