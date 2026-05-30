import { searchPosts } from '../../services/posts/posts';
import type { NoroffPost } from '../../types/post';
import { renderRoute } from '../../router';
import type { SearchResult } from './navbar.types';

export async function enhancedSearch(
  query: string
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  try {
    const postsResponse = await searchPosts(query, 50);

    const matchingPosts = postsResponse.data;

    const uniqueUsers = new Map();

    matchingPosts.forEach((post: NoroffPost) => {
      if (
        post.author.name
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        uniqueUsers.set(post.author.name, post.author);
      }
    });

    uniqueUsers.forEach((user) => {
      results.push({
        type: 'user',
        data: user,
      });
    });

    matchingPosts.forEach((post: NoroffPost) => {
      results.push({
        type: 'post',
        data: post,
      });
    });
  } catch (error) {
    console.error(error);
  }

  return results;
}

export function setSearchState(
  query: string,
  posts: NoroffPost[],
  users: any[]
) {
  window.searchQuery = query;
  window.searchResults = posts;
  window.userResults = users;
}

export function setupSearch(
  searchBtn: HTMLElement,
  searchInput: HTMLInputElement
) {
  async function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
      window.searchQuery = undefined;
      return;
    }

    const results = await enhancedSearch(query);

    const posts = results
      .filter((r) => r.type === 'post')
      .map((r) => r.data);

    const users = results
      .filter((r) => r.type === 'user')
      .map((r) => r.data);

    setSearchState(query, posts, users);

    if (window.location.pathname !== '/feed') {
      history.pushState({ path: '/feed' }, '', '/feed');
    }

    renderRoute('/feed');
  }

  searchInput.addEventListener('input', handleSearch);
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}