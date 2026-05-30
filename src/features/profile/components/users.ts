import type { ProfileWithFollowData } from "../../../types";

export function renderUsers(users: ProfileWithFollowData[]): string {
  if (!users.length) {
    return `
      <div class="text-center py-12 text-slate-500">
        No users found
      </div>
    `;
  }

  return `
    <div class="grid gap-3">
      ${users.map(renderUserCard).join("")}
    </div>
  `;
}

function renderUserCard(user: ProfileWithFollowData) {
  const avatar =
    user.avatar?.url ||
    `https://ui-avatars.com/api/?name=${user.name}`;

  return `
    <div class="flex items-center gap-3 p-3 border rounded-lg">
      <img src="${avatar}" class="w-10 h-10 rounded-full" />
      <div>
        <div class="font-medium">${user.name}</div>
        <div class="text-sm text-slate-500">@${user.name}</div>
      </div>
    </div>
  `;
}