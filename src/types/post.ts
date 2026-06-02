export interface NoroffPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  media?: {
    url: string;
    alt: string;
  };
  created: string;
  updated: string;
  author: {
    name: string;
    email: string;
    bio?: string;
    avatar?: {
      url: string;
      alt: string;
    };
  };
  _count: {
    comments: number;
    reactions: number;
  };
  reactions?: Array<{
    symbol: string;
    count: number;
  }>;
}

export interface PostsApiResponse {
  data: NoroffPost[];
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
