import { renderRoute } from '../../router'
import { logout } from '../../utils/auth'
import { getStoredUsername } from '../../features/profile/utils/getStoredUsername'
import { initThemeToggle } from '../../utils/theme'

export function initNavbar(): void {
  const username = getStoredUsername() || ''

  // NAV LINKS (safe fallback via anchors)
  document.getElementById('nav-logo')?.addEventListener('click', (e) => {
    e.preventDefault()
    renderRoute('/feed')
  })

  // PROFILE
  const goProfile = () => {
    if (!username) return
    renderRoute(`/profile?user=${encodeURIComponent(username)}`)
  }

  document.getElementById('nav-profile')?.addEventListener('click', goProfile)
  document.getElementById('mobile-nav-profile')?.addEventListener('click', goProfile)

  // SEARCH
  const runSearch = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement
    const q = input?.value.trim()
    if (!q) return
    renderRoute(`/search?q=${encodeURIComponent(q)}`)
  }

  document.getElementById('search-btn')?.addEventListener('click', () => runSearch('navbar-search'))
  document.getElementById('mobile-search-btn')?.addEventListener('click', () => runSearch('mobile-navbar-search'))

  // LOGOUT
  document.getElementById('nav-logout')?.addEventListener('click', handleLogout)
  document.getElementById('mobile-nav-logout')?.addEventListener('click', handleLogout)

  function handleLogout(): void {
    if (!confirm('Logout?')) return
    logout()
    renderRoute('/')
  }

  // MOBILE MENU
  document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden')
  })

  // THEME
  const themeInput = document.getElementById('theme-toggle') as HTMLButtonElement | null
  if (themeInput) {
    initThemeToggle(themeInput)
  }

  document.getElementById('nav-login')?.addEventListener('click', () => renderRoute('/login'))
  document.getElementById('mobile-nav-login')?.addEventListener('click', () => renderRoute('/login'))
}