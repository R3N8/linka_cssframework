export function initThemeToggle(button: HTMLButtonElement) {
  const saved = (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'

  applyTheme(saved)
  updateIcon(button, saved)

  button.addEventListener('click', () => {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    const next = current === 'dark' ? 'light' : 'dark'

    localStorage.setItem('theme', next)
    applyTheme(next)
    updateIcon(button, next)
  })
}

function applyTheme(mode: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', mode === 'dark')
}

function updateIcon(button: HTMLButtonElement, mode: 'light' | 'dark') {
  const icon = button.querySelector('i')
  if (!icon) return
  icon.className = mode === 'dark' ? 'fas fa-moon' : 'fas fa-sun'
}