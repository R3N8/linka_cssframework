function statItem(label: string, value: number, id?: string) {
  return `
    <div class="text-center p-4">
      <div ${id ? `id="${id}"` : ""} class="text-2xl font-bold">
        ${value}
      </div>
      <div class="text-xs uppercase text-neutral-400">
        ${label}
      </div>
    </div>
  `;
}

export function renderStats(profile: any) {
  return `
    <section class="grid grid-cols-3 border-y border-neutral-200 dark:border-neutral-500">

      ${statItem("Posts", profile._count.posts)}

      ${statItem("Followers", profile._count.followers, "followers-count")}

      ${statItem("Following", profile._count.following)}

    </section>
  `;
}