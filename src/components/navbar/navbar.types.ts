import type { NoroffPost } from '../../services/posts/posts';

export type NavigationRoute =
  | '/'
  | '/feed'
  | '/profile';

export interface SearchResult {
  type: 'post' | 'user';
  data: NoroffPost | any;
}

export interface NavbarElements {
  feedBtn: HTMLElement | null;
  mobileFeedBtn: HTMLElement | null;

  profileBtn: HTMLElement | null;
  mobileProfileBtn: HTMLElement | null;

  loginBtn: HTMLElement | null;
  mobileLoginBtn: HTMLElement | null;

  logoutBtn: HTMLElement | null;
  mobileLogoutBtn: HTMLElement | null;

  searchBtn: HTMLElement | null;
  mobileSearchBtn: HTMLElement | null;

  searchInput: HTMLInputElement | null;
  mobileSearchInput: HTMLInputElement | null;

  mobileToggle: HTMLElement | null;
}