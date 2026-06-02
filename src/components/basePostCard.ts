import type { NoroffPost } from '../types/post';
import { timeAgo } from '../features/profile/utils/timeAgo';

type CardVariant = 'feed' | 'profile';

export function basePostCard(
  post: NoroffPost,
  variant: CardVariant = 'feed'
): string {
  if (variant === 'profile') return profileCard(post);
  return feedCard(post);
}

function feedCard(post: NoroffPost): string {
  const hasMedia = !!post.media?.url;
  const hasBody = !!post.body?.trim();
  const hasTags = !!post.tags?.length;
  const bodyId = `body-${post.id}`;

  const avatarUrl = post.author.avatar?.url?.trim();
  const avatarLetter = post.author.name.charAt(0).toUpperCase();

  const avatar = avatarUrl
    ? `
        <img
          src="${avatarUrl}"
          alt="${post.author.name}"
          class="w-9 h-9 rounded-full object-cover shrink-0"
          onerror="this.replaceWith(Object.assign(document.createElement('div'),{
            className:'w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-200 shrink-0',
            textContent:'${avatarLetter}'
          }))"
        />
      `
    : `
        <div
          class="w-9 h-9 rounded-full
            bg-neutral-200 dark:bg-neutral-700
            flex items-center justify-center
            text-sm font-semibold
            text-neutral-700 dark:text-neutral-200
            shrink-0"
        >
          ${avatarLetter}
        </div>
      `;

  const statsBar = `
    <div class="flex items-center gap-4 px-4 py-2.5">
      <button
        class="flex items-center gap-1.5 text-sm cursor-pointer
          text-black dark:text-white hover:text-accent transition-colors"
        data-reaction="${post.id}"
      >
        <i class="fa-regular fa-heart text-sm"></i>
        ${post._count.reactions}
      </button>

      <button
        class="flex items-center gap-1.5 text-sm cursor-pointer
          text-black dark:text-white hover:text-accent transition-colors"
      >
        <i class="fa-regular fa-comment"></i>
        ${post._count.comments}
      </button>

      <button
        class="flex items-center gap-1.5 text-sm cursor-pointer
          text-black dark:text-white hover:text-accent transition-colors ml-auto"
      >
        <i class="fa-solid fa-share text-sm"></i>
        Share
      </button>
    </div>
  `;

  const authorBar = `
    <div class="flex items-center justify-between px-4 py-3">
      <div class="flex items-center gap-2.5">
        ${avatar}

        <span class="text-sm font-medium">
          ${post.author.name}
        </span>
      </div>

      <button
        class="follow-btn"
        data-follow-user="${post.author.name}"
      >
        Follow
      </button>
    </div>
  `;

  return `
    <article
      class="post-card bg-surface-light dark:bg-surface-dark
        rounded overflow-hidden shadow"
      data-post-id="${post.id}"
    >
      ${
        hasMedia
          ? `
            <div class="relative w-full aspect-video overflow-hidden">
              <div class="absolute inset-x-0 top-0 z-10">
                <div
                  class="flex items-center justify-between px-4 py-3 bg-transparent text-white"
                >
                  <div class="flex items-center gap-2.5">
                    ${
                      post.author.avatar?.url
                        ? `
                          <img
                            src="${post.author.avatar.url}"
                            alt="${post.author.name}"
                            class="w-9 h-9 rounded-full object-cover shrink-0
                            onerror="this.outerHTML ='<div class=&quot;w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-200 shrink-0&quot;>${post.author.name.charAt(0).toUpperCase()}</div>'"
                          />
                        `
                        : `
                          <div
                            class="w-9 h-9 rounded-full
                              bg-white/20 backdrop-blur-sm
                              flex items-center justify-center
                              text-sm font-semibold text-white
                              shrink-0"
                          >
                            ${post.author.name.charAt(0).toUpperCase()}
                          </div>
                        `
                    }

                    <span class="text-sm font-medium">
                      ${post.author.name}
                    </span>
                  </div>

                  <button class="follow-btn" data-follow-user="${post.author.name}">
                    Follow
                  </button>
                </div>
              </div>

              <div class="w-full aspect-video overflow-hidden bg-surface-light dark:bg-surface-dark">
                <img
                  src="${post.media!.url}"
                  alt="${post.media!.alt || post.title}"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            ${statsBar}
          `
          : `
            ${authorBar}
          `
      }

      <div class="px-4 pt-3">
        <h3 class="text-sm font-semibold text-black dark:text-white mb-1.5">
          ${post.title}
        </h3>

        ${
          hasBody
            ? `
              <p
                id="${bodyId}"
                class="text-sm text-zinc-500 dark:text-neutral-400
                  leading-relaxed overflow-hidden line-clamp-2 transition-all"
              >
                ${post.body}
              </p>

              <button
                class="view-more-btn cursor-pointer text-xs font-bold mt-1 hover:text-accent transition-colors text-zinc-400"
                data-target="${bodyId}"
              >
                View more
              </button>
            `
            : ''
        }
      </div>

      ${
        hasTags
          ? `
            <div class="flex flex-wrap gap-1.5 px-4 pt-2.5">
              ${post.tags
                .slice(0, 4)
                .map(
                  (tag) => `
                    <span
                      class="text-xs font-bold px-2.5 py-1 rounded
                        bg-accent/20 text-accent"
                    >
                      #${tag}
                    </span>
                  `
                )
                .join('')}
            </div>
          `
          : ''
      }

      ${!hasMedia ? statsBar : ''}

      <div class="px-4 py-3 text-xs text-neutral-400">
        ${timeAgo(new Date(post.created))}
      </div>
    </article>
  `;
}

function profileCard(post: NoroffPost): string {
  const hasMedia = !!post.media?.url;

  return `
    <article
      class="post-card"
      data-post-id="${post.id}"
    >
      ${
        hasMedia
          ? `
            <div class="w-full aspect-4/3 overflow-hidden bg-surface-light dark:bg-surface-dark">
              <img
                src="${post.media!.url}"
                alt="${post.media!.alt || post.title}"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          `
          : `
            <div
              class="w-full aspect-4/3
                bg-surface-light dark:bg-surface-dark
                flex items-center justify-center"
            >
              <i class="fas fa-image text-2xl text-neutral-300 dark:text-neutral-700"></i>
            </div>
          `
      }

      <div class="px-3 py-3">
        <h3 class="text-sm font-medium text-black dark:text-white leading-snug mb-1 line-clamp-2">
          ${post.title}
        </h3>

        <p class="text-xs text-neutral-400 dark:text-neutral-500">
          ${timeAgo(new Date(post.created))}
        </p>
      </div>
    </article>
  `;
}
