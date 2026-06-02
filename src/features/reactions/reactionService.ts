import { get, put, del } from '../../api/client';

import type { Reaction, PostWithReactions } from './types';

interface ApiResponse<T> {
  data: T;
}

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export async function reactToPost(
  postId: string,
  symbol: string
): Promise<void> {
  try {
    await put(
      `/social/posts/${postId}/react/${encodeURIComponent(symbol)}`,
      {}
    );
  } catch (error) {
    console.error('Error reacting:', error);

    const message = getErrorMessage(error, 'Failed to react').toLowerCase();

    if (message.includes('unauthorized')) {
      throw new Error('You must be logged in to react.');
    }

    throw new Error(getErrorMessage(error, 'Failed to react.'));
  }
}

export async function removeReaction(
  postId: string,
  symbol: string
): Promise<void> {
  try {
    await del(`/social/posts/${postId}/react/${encodeURIComponent(symbol)}`);
  } catch (error) {
    console.error('Error removing reaction:', error);

    throw new Error(getErrorMessage(error, 'Failed to remove reaction.'));
  }
}

export async function toggleReaction(
  postId: string,
  symbol: string
): Promise<boolean> {
  try {
    await reactToPost(postId, symbol);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : '';

    const status =
      typeof error === 'object' && error !== null && 'status' in error
        ? Number((error as { status?: number }).status)
        : undefined;

    if (
      message.includes('already') ||
      message.includes('exist') ||
      status === 400 ||
      status === 409
    ) {
      await removeReaction(postId, symbol);
      return false;
    }

    throw error;
  }
}

export async function getPostReactions(postId: string): Promise<Reaction[]> {
  try {
    const response = await get<
      ApiResponse<PostWithReactions> | PostWithReactions
    >(`/social/posts/${postId}?_reactions=true`);

    const post =
      response && typeof response === 'object' && 'data' in response
        ? response.data
        : response;

    return post?.reactions ?? [];
  } catch (error) {
    console.error('Error fetching reactions:', error);

    return [];
  }
}
