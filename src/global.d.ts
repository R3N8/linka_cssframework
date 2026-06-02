import type { NoroffPost } from './types/post';

declare global {
  interface Window {
    searchQuery: string | undefined;
    searchResults: NoroffPost[];
    userResults: any[];
    __route?: {
      path: string;
      query: Record<string, string>;
    };
    __routeDidMount?: () => void;
    renderRoute?: (path: string) => void;
    loadingScreen?: any;
    refreshNavbar?: () => void;
    updateNavbarVisibility?: (path: string) => void;
    updateActiveNav?: () => void;
    navigateToProfile?: (username: string) => void;
    __profilePosts: NoroffPost[] | undefined;
  }
}
