export function updateActiveNav() {
  const currentPath =
    window.location.pathname;

  document
    .querySelectorAll('.nav-btn')
    .forEach((btn) =>
      btn.classList.remove('active')
    );

  const navMap: Record<string, string[]> = {
    '/feed': [
      'nav-feed',
      'mobile-nav-feed',
    ],

    '/profile': [
      'nav-profile',
      'mobile-nav-profile',
    ],

    '/': [
      'nav-login',
      'mobile-nav-login',
    ],
  };

  navMap[currentPath]?.forEach((id) => {
    document
      .getElementById(id)
      ?.classList.add('active');
  });
}