export function setMobileMenu(open: boolean) {
  const mobileMenu =
    document.querySelector('.mobile-menu');

  const navbar = document.querySelector('nav');

  const toggleIcon = document.querySelector(
    '.mobile-toggle-icon'
  );

  mobileMenu?.classList.toggle('hidden', !open);

  navbar?.classList.toggle(
    'mobile-menu-open',
    open
  );

  if (toggleIcon) {
    toggleIcon.className = open
      ? 'fas fa-times text-lg mobile-toggle-icon'
      : 'fas fa-bars text-lg mobile-toggle-icon';
  }
}

export function closeMobileMenu() {
  setMobileMenu(false);
}

export function initMobileMenu() {
  const mobileToggle =
    document.getElementById('mobile-menu-toggle');

  mobileToggle?.addEventListener('click', () => {
    const mobileMenu =
      document.querySelector('.mobile-menu');

    const isOpen = !mobileMenu?.classList.contains(
      'hidden'
    );

    setMobileMenu(!isOpen);
  });
}