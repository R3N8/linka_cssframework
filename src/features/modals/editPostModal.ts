// src/features/modals/editPostModal.ts

export function renderEditPostModal(): string {
  return `
    <div id="editPostModal" class="fixed inset-0 hidden items-center justify-center bg-black/60 z-50">
      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl w-full max-w-2xl">

        <form id="editPostForm">
          <h2 class="text-xl font-bold mb-4 text-slate-900 dark:text-white">
            Edit Post
          </h2>

          <input
            id="editPostTitle"
            class="w-full p-2 mb-3 border rounded"
            placeholder="Title"
          />

          <textarea
            id="editPostBody"
            class="w-full p-2 mb-3 border rounded"
            placeholder="Body"
          ></textarea>

          <input
            id="editPostTags"
            class="w-full p-2 mb-3 border rounded"
            placeholder="Tags"
          />

          <input
            id="editPostImageUrl"
            class="w-full p-2 mb-3 border rounded"
            placeholder="Image URL"
          />

          <input
            id="editPostImageAlt"
            class="w-full p-2 mb-3 border rounded"
            placeholder="Image Alt"
          />

          <div class="flex justify-end gap-2">
            <button type="button" onclick="closeEditModal()" class="px-4 py-2">
              Cancel
            </button>

            <button type="submit" class="px-4 py-2 bg-orange-500 text-white rounded">
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
}

/* ---------------- modal control ---------------- */

export function openEditModal(postId: number): void {
  const modal = document.getElementById('editPostModal');
  if (!modal) return;

  modal.dataset.postId = String(postId);

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

export function closeEditModal(): void {
  const modal = document.getElementById('editPostModal');
  if (!modal) return;

  modal.classList.add('hidden');
  modal.classList.remove('flex');

  delete modal.dataset.postId;
}

export function getEditingPostId(): number | null {
  const modal = document.getElementById('editPostModal');
  const id = modal?.dataset.postId;

  return id ? Number(id) : null;
}
