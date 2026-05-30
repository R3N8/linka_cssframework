import type { ProfileWithFollowData } from "../../../types";
import { isLoggedIn } from "../../../utils/auth";

export function renderHeader(
  profile: ProfileWithFollowData,
  isOwn: boolean
) {
  return `
    <div class="relative h-64 bg-slate-200 dark:bg-slate-800">

      ${
        profile.banner?.url
          ? `<img src="${profile.banner.url}" class="w-full h-full object-cover"/>`
          : ""
      }

      <div class="absolute top-4 left-4 right-4 flex justify-between">
        <button onclick="history.back()">Back</button>

        ${
          !isOwn && isLoggedIn()
            ? `<button id="follow-btn" data-user="${profile.name}">
                Follow
              </button>`
            : ""
        }
      </div>
    </div>
  `;
}