export function renderPostSkeleton(): string {
  return Array.from({ length: 6 })
    .map(
      () => `
    <div class="border rounded-xl p-4 animate-pulse">
      <div class="h-4 bg-slate-300 dark:bg-slate-700 rounded w-2/3 mb-3"></div>
      <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
      <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
    </div>
  `
    )
    .join("");
}

export function renderUserSkeleton(): string {
  return Array.from({ length: 5 })
    .map(
      () => `
    <div class="flex items-center gap-3 p-3 animate-pulse">
      <div class="w-10 h-10 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
      <div class="flex-1">
        <div class="h-3 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mb-2"></div>
        <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
      </div>
    </div>
  `
    )
    .join("");
}