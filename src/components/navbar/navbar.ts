import { isLoggedIn } from '../../utils/auth';
import { NAV_ITEMS } from './navbar.config';
import { navButton, searchBar, themeToggle, iconButton } from './navbar.utils';

export function renderNavbar(): string {
  const loggedIn = isLoggedIn();

  const desktopButtons = loggedIn
    ? NAV_ITEMS.map((i) => navButton(i)).join('')
    : '';

  const mobileButtons = loggedIn
    ? NAV_ITEMS.map((i) => navButton(i, true)).join('')
    : '';

  return `
    <nav id="app-navbar" class="fixed top-0 left-0 right-0 z-50 bg-surface-light dark:bg-surface-dark">

      <div class="h-16 max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">

        <a id="nav-logo" href="/feed"
          class="font-bold text-xl tracking-tight text-black dark:text-white hover:text-accent transition-colors shrink-0"
        >
          <i class="fa-solid fa-signal"></i> LINKA
        </a>

        ${
          loggedIn
            ? `
          <div class="hidden md:flex flex-1 max-w-md">
            ${searchBar('navbar-search', 'search-btn')}
          </div>
        `
            : ''
        }

        <div class="hidden md:flex items-center gap-4 justify-between w-full max-w-sm">
          <div class="flex items-center gap-6">
            ${desktopButtons}
          </div>
          ${themeToggle()}
          ${
            loggedIn
              ? iconButton('nav-logout', 'Logout')
              : iconButton('nav-login', 'Login')
          }
        </div>

        <button
          id="mobile-menu-toggle"
          class="
            md:hidden w-10 h-10 rounded-xl flex items-center justify-center
          text-black dark:text-white
          hover:bg-surface-light dark:hover:bg-surface-dark
            transition-all text-lg
          "
          aria-label="Open menu"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>

      <div id="mobile-menu" class="hidden md:hidden px-4 pb-4 
        border-t border-border-light dark:border-border-dark
      bg-surface-light dark:bg-surface-dark"
      >

        ${
          loggedIn
            ? `
          <div class="pt-4">
            ${searchBar('mobile-navbar-search', 'mobile-search-btn')}
          </div>

          <div class="flex flex-col gap-1 mt-3">
            ${mobileButtons}
            <div class="pt-4 flex items-center justify-between">
              ${iconButton('mobile-nav-logout', 'Logout', 'w-full text-left')}
              ${themeToggle()}
            </div>
          </div>
        `
            : `
          <div class="pt-4">
            ${iconButton('mobile-nav-login', 'Login', 'w-full')}
          </div>
        `
        }
      </div>
    </nav>
  `;
}
