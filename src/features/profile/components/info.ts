import type { ProfileWithFollowData } from "../../../types";
import { isLoggedIn } from "../../../utils/auth";
import { formatDisplayName } from "../../../utils/formatUsername";

export function renderInfo(
  profile: ProfileWithFollowData,
  isOwn: boolean
) {
  const displayName = formatDisplayName(profile.name);

  return `
    <section class="relative px-2 md:px-6 pb-8">

      <div class="-mt-20 mb-5 relative z-20 flex justify-center md:justify-start">
        <div class="relative w-40 h-40">

          ${
            profile.avatar?.url
              ? `
                <img
                  src="${profile.avatar.url}"
                  alt="${profile.name}"
                  class="
                    w-40
                    h-40
                    rounded-full
                    object-cover
                    border-4
                    border-surface-light
                    shadow-xl
                  "
                />
              `
              : `
                <div
                  class="
                    w-40
                    h-40
                    rounded-full
                    border-4
                    border-white
                    dark:border-black
                    bg-neutral-200
                    dark:bg-neutral-800
                  "
                ></div>
              `
          }

          ${editProfileButton(profile, isOwn)}

        </div>
      </div>

      <h1
        class="
          text-2xl
          md:text-4xl
          font-bold
          tracking-tight
          text-center
          md:text-start
        "
      >
        ${displayName}
      </h1>

      <p
        class="
          mt-2
          text-neutral-400
          text-center
          md:text-start
        "
      >
        @${profile.name}
      </p>

      <p
        class="
          mt-5
          max-w-2xl
          text-base
          md:text-lg
          leading-relaxed
          text-center
          md:text-start
        "
      >
        ${profile.bio || (isOwn ? "Add a bio" : "No bio yet")}
      </p>

      <div class="mt-6 flex items-center justify-between md:justify-start gap-3">
        ${messageButton(profile, isOwn)}
        ${followButton(profile, isOwn)}
      </div>

    </section>
  `;
}

function editProfileButton(profile: ProfileWithFollowData, isOwn: boolean) {
  if (!isOwn || !isLoggedIn()) return "";

  return `
    <button
      id="editProfile-btn"
      data-user="${profile.name}"
      class="
        absolute
        bottom-1
        right-1
        w-9
        h-9
        rounded-full
        bg-surface-dark
        text-surface-light
        dark:bg-surface-light
        dark:text-surface-dark
        cursor-pointer
        flex
        items-center
        justify-center
        shadow-lg
        hover:scale-105
        transition
      "
      aria-label="Edit profile"
    >
      <i class="fa-solid fa-pen text-xs"></i>
    </button>
  `;
}


function followButton(
  profile: ProfileWithFollowData,
  isOwn: boolean
) {
  if (isOwn || !isLoggedIn()) return "";

  return `
    <button
      id="follow-btn"
      data-user="${profile.name}"
      class="btn-primary w-full"
    >
      Follow
    </button>
  `;
}


function messageButton(
  profile: ProfileWithFollowData,
  isOwn: boolean
) {
  if (isOwn || !isLoggedIn()) return "";

  return `
    <button
      id="message-btn"
      data-user="${profile.name}"
      class="btn-secondary w-full"
    >
      Message
    </button>
  `;
}