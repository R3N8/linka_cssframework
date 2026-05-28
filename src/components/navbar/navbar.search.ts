import {
  getAllPosts,
  getPublicPosts,
  type NoroffPost,
} from '../../services/posts/posts';

import { isLoggedIn } from '../../utils/auth';

import { renderRoute } from '../../router';

import type { SearchResult } from './navbar.types';

export async function enhancedSearch(
  query: string
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  try {
    const postsResponse = await getAllPosts(
      50,
      1
    );

    const matchingPosts = postsResponse.data.filter(
      (post: NoroffPost) =>
        post.title
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        post.body
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        post.author.name
          .toLowerCase()
          .includes(query.toLowerCase())
    );

    const uniqueUsers = new Map();

    matchingPosts.forEach((post) => {
      if (
        post.author.name
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        uniqueUsers.set(
          post.author.name,
          post.author
        );
      }
    });

    uniqueUsers.forEach((user) => {
      results.push({
        type: 'user',
        data: user,
      });
    });

    matchingPosts.forEach((post) => {
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
  async function loadPosts() {
    try {
      if (isLoggedIn()) {
        await getAllPosts(100, 1);
      } else {
        await getPublicPosts(100, 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  loadPosts();

  async function handleSearch() {
    const query = searchInput.value
      .toLowerCase()
      .trim();

    if (!query) {
      window.searchQuery = undefined;

      if (window.location.pathname === '/feed') {
        renderRoute('/feed');
      }

      return;
    }

    const results =
      await enhancedSearch(query);

    const posts = results
      .filter((r) => r.type === 'post')
      .map((r) => r.data);

    const users = results
      .filter((r) => r.type === 'user')
      .map((r) => r.data);

    setSearchState(query, posts, users);

    if (
      window.location.pathname !== '/feed'
    ) {
      history.pushState(
        { path: '/feed' },
        '',
        '/feed'
      );
    }

    renderRoute('/feed');
  }

  searchInput.addEventListener(
    'input',
    handleSearch
  );

  searchBtn.addEventListener(
    'click',
    handleSearch
  );

  searchInput.addEventListener(
    'keypress',
    (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    }
  );
}