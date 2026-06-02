import type { ProfileWithFollowData } from '../../../types';

export function renderHeader(profile: ProfileWithFollowData) {
  return `
    <section class="relative h-72 md:h-96 overflow-hidden">
      ${banner(profile)}
    </section>
  `;
}

function banner(profile: ProfileWithFollowData) {
  if (profile.banner?.url) {
    return `
      <div class="absolute inset-0">
        
        <img
          src="${profile.banner.url}"
          alt="${profile.name} banner"
          class="w-full h-full object-cover"
        />

        <!-- gradient overlay -->
        <div class="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent dark:from-black dark:via-black/40"></div>

      </div>
    `;
  }

  return `
    <div class="absolute inset-0 bg-linear-to-r from-orange-500 via-orange-400 to-orange-600"></div>
  `;
}
