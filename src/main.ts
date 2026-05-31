import '@fortawesome/fontawesome-free/css/all.css'
import './styles/index.css'

import { renderRoute } from './router'
import LoadingScreen from './pages/LoadingScreen'
import { initNavbar } from './components/navbar/navbar.events'
import { renderNavbar } from './components/navbar/navbar'


const loadingScreen = new LoadingScreen()

/* =========================
   Navbar visibility rules
========================= */
function shouldShowNavbar(path: string): boolean {
  return !['/', '/login', '/register'].includes(path)
}

function updateNavbarVisibility(path: string): void {
  const navbar = document.getElementById('app-navbar')

  if (!navbar) return

  navbar.style.display = shouldShowNavbar(path)
    ? 'block'
    : 'none'
}

/* =========================
   Safe navbar refresh
========================= */
function refreshNavbar(): void {
  const existing = document.getElementById('app-navbar')
  if (existing) existing.remove()

  document.body.insertAdjacentHTML(
    'afterbegin',
    renderNavbar()
  )

  initNavbar()

  // ensure correct visibility after re-render
  setTimeout(() => {
    updateNavbarVisibility(window.location.pathname)
  }, 0)
}

/* =========================
   GLOBALS (used elsewhere)
========================= */
window.renderRoute = renderRoute
window.loadingScreen = loadingScreen
window.refreshNavbar = refreshNavbar
window.updateNavbarVisibility = updateNavbarVisibility

/* =========================
   BOOTSTRAP
========================= */
document.addEventListener('DOMContentLoaded', () => {
  // initial navbar render
  document.body.insertAdjacentHTML(
    'afterbegin',
    renderNavbar()
  )

  initNavbar()

  updateNavbarVisibility(window.location.pathname)

  renderRoute(window.location.pathname)

  /* =========================
     POPSTATE FIX (IMPORTANT)
  ========================= */
  window.addEventListener('popstate', () => {
    const path =
      window.location.pathname +
      window.location.search

    renderRoute(path)

    setTimeout(() => {
      updateNavbarVisibility(window.location.pathname)
      window.updateActiveNav?.()
    }, 0)
  })
})