import type { NavbarElements } from './navbar.types';

export function getNavbarElements(): NavbarElements {
  return {
    feedBtn: document.getElementById('nav-feed'),
    mobileFeedBtn: document.getElementById('mobile-nav-feed'),

    profileBtn: document.getElementById('nav-profile'),
    mobileProfileBtn: document.getElementById(
      'mobile-nav-profile'
    ),

    loginBtn: document.getElementById('nav-login'),
    mobileLoginBtn: document.getElementById(
      'mobile-nav-login'
    ),

    logoutBtn: document.getElementById('nav-logout'),
    mobileLogoutBtn: document.getElementById(
      'mobile-nav-logout'
    ),

    searchBtn: document.getElementById('search-btn'),
    mobileSearchBtn:
      document.getElementById('mobile-search-btn'),

    searchInput: document.getElementById(
      'navbar-search'
    ) as HTMLInputElement,

    mobileSearchInput: document.getElementById(
      'mobile-navbar-search'
    ) as HTMLInputElement,

    mobileToggle:
      document.getElementById('mobile-menu-toggle'),
  };
}

export function on(
  element: HTMLElement | null,
  event: string,
  handler: EventListener
) {
  element?.addEventListener(event, handler);
}