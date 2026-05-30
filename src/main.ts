import '@fontsource/bebas-neue';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';
import '@fontsource/open-sans/300-italic.css';
import '@fontsource/open-sans/400-italic.css';
import '@fontsource/open-sans/500-italic.css';
import '@fontsource/open-sans/600-italic.css';
import '@fontsource/open-sans/700-italic.css';
import '@fontsource/open-sans/800-italic.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './style.css';
import { renderRoute } from './router';
import LoadingScreen from './pages/LoadingScreen.js';
import NavbarPage, { initNavbar } from './components/navbar/navbar.js';

const loadingScreen = new LoadingScreen();

function shouldShowNavbar(path: string): boolean {
  return !['/', '/login', '/register'].includes(path);
}

function updateNavbarVisibility(path: string) {
  const navbar = document.querySelector('#app-navbar') as HTMLElement;
  if (!navbar) return;
  navbar.style.display = shouldShowNavbar(path) ? 'block' : 'none';
}

function refreshNavbar() {
  document.querySelector('#app-navbar')?.remove();
  document.body.insertAdjacentHTML('afterbegin', NavbarPage());
  initNavbar();
  setTimeout(() => updateNavbarVisibility(window.location.pathname), 10);
}

window.renderRoute = renderRoute;
window.loadingScreen = loadingScreen;
window.refreshNavbar = refreshNavbar;
window.updateNavbarVisibility = updateNavbarVisibility;

document.addEventListener('DOMContentLoaded', () => {
  try {
    document.body.insertAdjacentHTML('afterbegin', NavbarPage());
  } catch (error) {
    console.error('Error creating navbar:', error);
  }

  initNavbar();
  updateNavbarVisibility(window.location.pathname);

  renderRoute(window.location.pathname);

  window.addEventListener('popstate', () => {
    renderRoute(window.location.href);
    setTimeout(() => {
      window.updateActiveNav?.();
      updateNavbarVisibility(window.location.pathname);
    }, 100);
  });
});

function navigateToProfile(username: string) {
  if (!username || username === 'Unknown') return;
  const url = `/profile?user=${encodeURIComponent(username)}`;
  history.pushState({}, '', url);
  window.renderRoute?.(url);
}

window.navigateToProfile = navigateToProfile;