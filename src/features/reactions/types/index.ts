export interface Reaction {
  symbol: string;
  count: number;
  reactors?: {
    name: string;
    email: string;
  }[];
}

export interface PostWithReactions {
  id: string;
  reactions?: Reaction[];
}