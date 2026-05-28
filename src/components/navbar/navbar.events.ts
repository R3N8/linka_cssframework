import { logout } from '../../utils/auth';

import { renderRoute } from '../../router';

import { bindNavigation } from './navbar.navigation';

import { setupSearch } from './navbar.search';

import { initTheme, toggleTheme } from './navbar.theme';

import { initMobileMenu } from './navbar.mobile';

import { getNavbarElements } from './navbar.dom';

export function initNavbarEvents() {
  const elements = getNavbarElements();

  bindNavigation(
    elements.feedBtn,
    '/feed'
  );

  bindNavigation(
    elements.mobileFeedBtn,
    '/feed'
  );

  bindNavigation(
    elements.profileBtn,
    '/profile'
  );

  bindNavigation(
    elements.mobileProfileBtn,
    '/profile'
  );

  bindNavigation(
    elements.loginBtn,
    '/'
  );

  bindNavigation(
    elements.mobileLoginBtn,
    '/'
  );

  elements.logoutBtn?.addEventListener(
    'click',
    handleLogout
  );

  elements.mobileLogoutBtn?.addEventListener(
    'click',
    handleLogout
  );

  if (
    elements.searchBtn &&
    elements.searchInput
  ) {
    setupSearch(
      elements.searchBtn,
      elements.searchInput
    );
  }

  if (
    elements.mobileSearchBtn &&
    elements.mobileSearchInput
  ) {
    setupSearch(
      elements.mobileSearchBtn,
      elements.mobileSearchInput
    );
  }

  initMobileMenu();

  initTheme();

  document
    .getElementById('theme-toggle')
    ?.addEventListener(
      'click',
      toggleTheme
    );

  document
    .getElementById(
      'mobile-theme-toggle'
    )
    ?.addEventListener(
      'click',
      toggleTheme
    );
}

function handleLogout(e: Event) {
  e.preventDefault();

  if (
    !confirm(
      'Are you sure you want to logout?'
    )
  ) {
    return;
  }

  logout();

  history.pushState(
    { path: '/' },
    '',
    '/'
  );

  renderRoute('/');
}