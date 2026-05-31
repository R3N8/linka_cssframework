import type { NavItem } from './navbar.config'

export function navButton(item: NavItem, mobile = false): string {
  return `
    <a
      id="${mobile ? 'mobile-nav-' : 'nav-'}${item.id}"
      href="${item.route}"
      class="
        text-sm font-medium
      text-black dark:text-white
      hover:text-accent
        transition-all duration-150 cursor-pointer
      "
    >
      ${item.label}
    </a>
  `
}

export function searchBar(inputId: string, buttonId: string): string {
  return `
    <div class="relative w-full">
      <input
        id="${inputId}"
        type="text"
        placeholder="Search..."
        class="
          w-full h-10 px-4 pr-12 rounded text-sm
          bg-surface-light dark:bg-surface-dark
          border border-border-light dark:border-border-dark
          focus:border-accent dark:focus:border-accent
          focus:outline-none
          text-black dark:text-white
          placeholder:text-neutral-400
          transition-colors duration-150
        "
      />
      <button
        id="${buttonId}"
        type="button"
        class="
          absolute right-3 top-1/2 -translate-y-1/2
         text-neutral-400 hover:text-accent
          transition-colors duration-150 cursor-pointer
        "
      >
        <i class="fas fa-search text-sm"></i>
      </button>
    </div>
  `
}

export function themeToggle(): string {
  return `
    <button
      id="theme-toggle"
      class="
        w-8 h-8 flex items-center justify-center
        text-black dark:text-white
        hover:text-accent cursor-pointer
        transition-all duration-150
      "
      aria-label="Toggle theme"
    >
      <i class="fas fa-moon"></i>
    </button>
  `
}

export function iconButton(id: string, label: string, extraClasses = ''): string {
  return `
    <button
      id="${id}"
      class="
        text-sm font-medium cursor-pointer
        text-black dark:text-white
        hover:text-accent
        transition-all duration-150
        ${extraClasses}
      "
    >
      ${label}
    </button>
  `
}