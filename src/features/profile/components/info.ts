import type { ProfileWithFollowData } from "../../../types";

export function renderInfo(
  profile: ProfileWithFollowData,
  isOwn: boolean
) {
  return `
    <div class="flex items justify-center gap-4 text-center py-6">
      ${
        profile.avatar?.url
          ? `<img src="${profile.avatar.url}" class="w-32 h-32 rounded-full object-cover"/>`
          : ""
      }
      <h1 class="text-4xl font-bold">${profile.name}</h1>
      <p class="text-slate-500">@${profile.name}</p>

      <p class="mt-2 text-sm">
        ${profile.bio || (isOwn ? "Add a bio" : "No bio")}
      </p>
    </div>
  `;
}