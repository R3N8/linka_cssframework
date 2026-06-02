/**
 * Interactions Service Barrel Export
 *
 * This file only re-exports feature-level services.
 * No API logic, no types, no duplication.
 */

// Comments
export {
  createComment,
  deleteComment,
} from '../../features/comments/commentService';

export type {
  Comment,
  CommentsResponse,
  CreateCommentResponse,
} from '../../features/comments/types';

// Reactions
export {
  reactToPost,
  removeReaction,
  toggleReaction,
  getPostReactions,
} from '../../features/reactions/reactionService';

export type {
  Reaction,
  PostWithReactions,
} from '../../features/reactions/types';
