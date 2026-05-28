// src/features/modals/fullPostModal.ts

export function renderFullPostModal(): string {
  return `
    <div id="fullPostModal" class="fixed inset-0 hidden items-center justify-center bg-black/60 z-50">
      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl w-full max-w-4xl">

        <div id="fullPostContent"></div>

        <div class="flex justify-end mt-4">
          <button onclick="closeFullPostModal()" class="px-4 py-2">
            Close
          </button>
        </div>

      </div>
    </div>
  `;
}

/* ---------------- modal control ---------------- */

export function openFullPostModal(): void {
  const modal = document.getElementById('fullPostModal');
  if (!modal) return;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

export function closeFullPostModal(): void {
  const modal = document.getElementById('fullPostModal');
  if (!modal) return;

  modal.classList.add('hidden');
  modal.classList.remove('flex');
}