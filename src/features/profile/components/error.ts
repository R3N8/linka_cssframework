export function renderProfileError(message: string): string {
  return `
    <div class="profile-page flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-900 px-4">
      <div class="text-center max-w-md">

        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-500/10 flex items-center justify-center">
          <i class="fa-solid fa-triangle-exclamation text-4xl text-orange-600"></i>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Unable to load profile
        </h2>

        <p class="text-slate-600 dark:text-slate-400 mb-6">
          ${message}
        </p>

        <button
          class="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
          onclick="history.back()"
        >
          Go Back
        </button>
      </div>
    </div>
  `;
}