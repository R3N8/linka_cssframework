import { post, del } from '../../api/client';
import type { Comment, CreateCommentResponse } from './types';

interface ApiResponse<T> {
  data: T;
}

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export async function createComment(
  postId: string,
  body: string,
  replyToId?: string
): Promise<CreateCommentResponse> {
  const payload: Record<string, unknown> = {
    body,
  };

  if (replyToId) {
    payload.replyToId = replyToId;
  }

  try {
    const response = await post<ApiResponse<Comment> | Comment>(
      `/social/posts/${postId}/comment`,
      payload
    );

    if (response && typeof response === 'object' && 'data' in response) {
      return {
        data: response.data,
      };
    }

    return {
      data: response as Comment,
    };
  } catch (error) {
    console.error('Error creating comment:', error);

    throw new Error(getErrorMessage(error, 'Failed to create comment.'));
  }
}

export async function deleteComment(
  postId: string,
  commentId: string
): Promise<void> {
  try {
    await del(`/social/posts/${postId}/comment/${commentId}`);
  } catch (error) {
    console.error('Error deleting comment:', error);

    throw new Error(getErrorMessage(error, 'Failed to delete comment.'));
  }
}
