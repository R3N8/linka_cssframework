export function renderErrorState(): string {
  return `
    <div class="min-h-screen bg-slate-900 pt-4 px-4 sm:px-6 lg:px-8">
      <main class="max-w-2xl mx-auto">
        <div class="text-center p-8 sm:p-12 bg-slate-800/60 backdrop-blur-lg border border-slate-600/30 rounded-2xl mt-20">
          <div class="text-4xl sm:text-6xl mb-6">⚠️</div>
          <h2 class="text-xl sm:text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p class="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
            We couldn't load the posts right now. Please try again.
          </p>
          <button
            class="px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium"
            onclick="window.location.reload()"
          >
            Try Again
          </button>
        </div>
      </main>
    </div>
  `;
}