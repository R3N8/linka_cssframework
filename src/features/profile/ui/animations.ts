export function initProfileAnimations() {
  if (document.getElementById('profile-animations')) return;

  const style = document.createElement('style');
  style.id = 'profile-animations';

  style.textContent = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }
  `;

  document.head.appendChild(style);
}
