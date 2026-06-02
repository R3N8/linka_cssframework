export function showNotification(
  message: string,
  type: 'success' | 'error' | 'info' = 'info'
): void {
  const el = document.createElement('div');

  const color =
    type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#f97316';

  el.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    z-index: 9999;
    background: ${color};
    color: white;
    padding: 12px 16px;
    border-radius: 10px;
    font-weight: 500;
  `;

  el.textContent = message;

  document.body.appendChild(el);

  setTimeout(() => el.remove(), 2500);
}
