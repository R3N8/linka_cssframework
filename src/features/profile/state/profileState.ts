import type { ProfileWithFollowData } from "../../../types";
import type { NoroffPost } from "../../../types/post";

type State = {
  profile: ProfileWithFollowData | null;
  posts: NoroffPost[];
};

const state: State = {
  profile: null,
  posts: [],
};

export function setProfile(p: ProfileWithFollowData) {
  state.profile = p;
}

export function setPosts(p: NoroffPost[]) {
  state.posts = p;
}

export function getProfile() {
  return state.profile;
}

export function getPosts() {
  return state.posts;
}