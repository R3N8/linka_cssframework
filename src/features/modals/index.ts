// src/features/modals/index.ts

import { renderEditPostModal } from './editPostModal';
import { renderFullPostModal } from './fullPostModal';

import {
  openEditModal,
  closeEditModal,
  getEditingPostId,
} from './editPostModal';

import { openFullPostModal, closeFullPostModal } from './fullPostModal';

/**
 * Renders all modal HTML into FeedPage
 */
export function renderModals(): string {
  return `
    ${renderEditPostModal()}
    ${renderFullPostModal()}
  `;
}

/**
 * Re-export modal controls
 */
export {
  openEditModal,
  closeEditModal,
  getEditingPostId,
  openFullPostModal,
  closeFullPostModal,
};
