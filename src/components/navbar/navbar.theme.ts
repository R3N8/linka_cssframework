export function initTheme() {
  const savedTheme =
    localStorage.getItem('theme');

  const prefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  applyTheme(
    savedTheme === 'dark' ||
      (!savedTheme && prefersDark)
  );
}

export function applyTheme(isDark: boolean) {
  const sunIcon = document.querySelector(
    '.icon-sun'
  ) as HTMLElement | null;

  const moonIcon = document.querySelector(
    '.icon-moon'
  ) as HTMLElement | null;

  const mobileThemeIcon = document.querySelector(
    '.mobile-theme-icon'
  );

  const mobileThemeText = document.querySelector(
    '.mobile-theme-text'
  );

  document.documentElement.classList.toggle(
    'dark',
    isDark
  );

  localStorage.setItem(
    'theme',
    isDark ? 'dark' : 'light'
  );

  if (sunIcon) {
    sunIcon.style.display = isDark
      ? 'inline'
      : 'none';
  }

  if (moonIcon) {
    moonIcon.style.display = isDark
      ? 'none'
      : 'inline';
  }

  if (mobileThemeIcon) {
    mobileThemeIcon.className = isDark
      ? 'fa-solid fa-sun text-sm mobile-theme-icon'
      : 'fa-solid fa-moon text-sm mobile-theme-icon';
  }

  if (mobileThemeText) {
    mobileThemeText.textContent = isDark
      ? 'Light Mode'
      : 'Dark Mode';
  }

  document
    .getElementById('theme-toggle')
    ?.setAttribute(
      'aria-pressed',
      String(isDark)
    );

  document.dispatchEvent(
    new Event('linka-theme-changed')
  );
}

export function toggleTheme() {
  const isDark =
    document.documentElement.classList.contains(
      'dark'
    );

  applyTheme(!isDark);
}