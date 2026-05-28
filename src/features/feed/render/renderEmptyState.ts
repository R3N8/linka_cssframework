export function renderEmptyState(
  icon: string,
  title: string,
  message: string,
  extra: string = ''
): string {
  return `
    <div class="text-center p-8 sm:p-12 bg-slate-800/60 backdrop-blur-lg border border-slate-600/30 rounded-2xl">
      <div class="text-4xl sm:text-6xl mb-6">${icon}</div>
      <h3 class="text-lg sm:text-xl font-semibold text-white mb-4">${title}</h3>
      <p class="text-slate-400 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">${message}</p>
      ${extra}
    </div>
  `;
}