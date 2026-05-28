import { isLoggedIn } from '../../utils/auth';

function navButton({
  id,
  icon,
  label,
  mobile = false,
  primary = false,
}: {
  id: string;
  icon: string;
  label: string;
  mobile?: boolean;
  primary?: boolean;
}) {
  const layoutClasses = mobile
    ? 'w-full gap-3 px-4 py-3'
    : 'gap-2 px-4 py-2';

  const colorClasses = primary
    ? `
      text-white
      bg-orange-500
      hover:bg-orange-600
      shadow-md
      hover:shadow-lg
    `
    : `
      text-slate-700
      dark:text-slate-300
      bg-slate-100
      dark:bg-slate-800
      hover:bg-orange-100
      dark:hover:bg-orange-900/20
      hover:text-orange-600
      dark:hover:text-orange-500
    `;

  return `
    <button
      id="${id}"
      class="
        flex items-center
        ${layoutClasses}
        rounded-xl
        text-sm
        font-semibold
        transition-all
        duration-300
        hover:scale-105
        nav-btn
        ${colorClasses}
      "
    >
      <i class="${icon} text-sm"></i>
      ${label}
    </button>
  `;
}

function searchBar({
  inputId,
  buttonId,
  mobile = false,
}: {
  inputId: string;
  buttonId: string;
  mobile?: boolean;
}) {
  return `
    <div class="relative ${mobile ? '' : 'w-full'}">
      <input
        type="text"
        id="${inputId}"
        placeholder="Search posts, users, or hashtags..."
        class="
          w-full
          h-10
          px-4
          pr-12
          bg-slate-100
          dark:bg-slate-800
          border-2
          border-slate-300
          dark:border-slate-700
          rounded-xl
          text-slate-900
          dark:text-slate-300
          placeholder-slate-500
          dark:placeholder-slate-400
          text-sm
          transition-all
          duration-300
          focus:outline-none
          focus:border-orange-500
          focus:ring-2
          focus:ring-orange-500/20
        "
      />

      <button
        id="${buttonId}"
        class="
          absolute
          right-2
          top-1/2
          -translate-y-1/2
          w-8
          h-8
          flex
          items-center
          justify-center
          text-slate-500
          dark:text-slate-400
          hover:text-orange-600
          dark:hover:text-orange-500
          hover:bg-orange-100
          dark:hover:bg-orange-900/20
          rounded-full
          transition-all
          duration-300
        "
      >
        <i class="fas fa-search text-sm"></i>
      </button>
    </div>
  `;
}

function themeToggle(mobile = false) {
  return `
    <button
      id="${mobile ? 'mobile-theme-toggle' : 'theme-toggle'}"
      class="
        ${
          mobile
            ? 'w-full gap-3 px-4 py-3'
            : 'gap-2 px-3 py-2'
        }

        flex items-center
        rounded-xl
        text-slate-700
        dark:text-slate-300
        text-sm
        font-semibold
        transition-all
        duration-300
        bg-slate-100
        dark:bg-slate-800
        hover:bg-orange-100
        dark:hover:bg-orange-900/20
        hover:text-orange-600
        dark:hover:text-orange-500
        hover:scale-105
      "
      title="Toggle theme"
      aria-pressed="false"
    >
      ${
        mobile
          ? `
            <i class="fas fa-moon text-sm mobile-theme-icon"></i>
            <span class="mobile-theme-text">
              Dark Mode
            </span>
          `
          : `
            <span class="sr-only">
              Toggle theme
            </span>

            <span class="inline-flex items-center justify-center w-5 h-5">
              <svg
                class="icon-sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                style="display:none"
              >
                <path d="M12 6a6 6 0 100 12 6 6 0 000-12z"/>
              </svg>

              <svg
                class="icon-moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            </span>
          `
      }
    </button>
  `;
}

export function renderNavbar() {
  const userLoggedIn = isLoggedIn();

  return `
    <nav
      id="app-navbar"
      class="
        fixed
        top-0
        left-0
        right-0
        z-50
        bg-white/95
        dark:bg-slate-900/95
        backdrop-blur-xl
        border-b-2
        border-slate-200
        dark:border-slate-800
        shadow-sm
      "
    >
      <div
        class="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          h-16
          flex
          items-center
          justify-between
        "
      >
        <!-- Brand -->
        <div class="shrink-0">
          <a
            href="/feed"
            class="
              flex
              items-center
              gap-3
              no-underline
              group
            "
          >
            <div
              class="
                w-10
                h-10
                rounded-full
                bg-orange-500
                flex
                items-center
                justify-center
                text-white
                font-bold
              "
            >
              L
            </div>

            <h1
              class="
                text-xl
                font-bold
                text-slate-900
                dark:text-white
                group-hover:text-orange-500
                transition-colors
              "
            >
              LINKA
            </h1>
          </a>
        </div>

        <!-- Desktop Search -->
        <div class="hidden md:flex flex-1 max-w-md mx-4">
          ${searchBar({
            inputId: 'navbar-search',
            buttonId: 'search-btn',
          })}
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-2">

          ${navButton({
            id: 'nav-feed',
            icon: 'fas fa-home',
            label: 'Feed',
          })}

          ${navButton({
            id: 'nav-profile',
            icon: 'fas fa-user',
            label: 'Profile',
          })}

          ${themeToggle()}

          ${
            userLoggedIn
              ? navButton({
                  id: 'nav-logout',
                  icon: 'fas fa-sign-out-alt',
                  label: 'Logout',
                })
              : navButton({
                  id: 'nav-login',
                  icon: 'fas fa-sign-in-alt',
                  label: 'Login',
                  primary: true,
                })
          }
        </div>

        <!-- Mobile Toggle -->
        <button
          id="mobile-menu-toggle"
          class="
            md:hidden
            flex
            items-center
            justify-center
            w-10
            h-10
            text-slate-700
            dark:text-slate-300
            hover:text-orange-600
            dark:hover:text-orange-500
            transition-colors
          "
        >
          <i class="fas fa-bars text-lg mobile-toggle-icon"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="md:hidden mobile-menu hidden">

        <!-- Mobile Search -->
        <div
          class="
            px-4
            py-3
            border-b-2
            border-slate-200
            dark:border-slate-800
            bg-slate-50
            dark:bg-slate-800
          "
        >
          ${searchBar({
            inputId: 'mobile-navbar-search',
            buttonId: 'mobile-search-btn',
            mobile: true,
          })}
        </div>

        <!-- Mobile Navigation -->
        <div
          class="
            px-4
            py-4
            space-y-2
            bg-white
            dark:bg-slate-900
          "
        >
          ${navButton({
            id: 'mobile-nav-feed',
            icon: 'fas fa-home',
            label: 'Feed',
            mobile: true,
          })}

          ${navButton({
            id: 'mobile-nav-profile',
            icon: 'fas fa-user',
            label: 'Profile',
            mobile: true,
          })}

          ${themeToggle(true)}

          ${
            userLoggedIn
              ? navButton({
                  id: 'mobile-nav-logout',
                  icon: 'fas fa-sign-out-alt',
                  label: 'Logout',
                  mobile: true,
                })
              : navButton({
                  id: 'mobile-nav-login',
                  icon: 'fas fa-sign-in-alt',
                  label: 'Login',
                  mobile: true,
                  primary: true,
                })
          }
        </div>
      </div>
    </nav>
  `;
}