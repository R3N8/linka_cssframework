export interface Comment {
  id: string;
  body: string;
  replyToId?: string | null;
  postId: string;
  owner: string;
  created: string;
  updated: string;
  author: {
    name: string;
    email: string;
    avatar?: {
      url: string;
      alt: string;
    } | null;
  };
}

export interface CommentsResponse {
  data: Comment[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
}

export interface CreateCommentResponse {
  data: Comment;
}
