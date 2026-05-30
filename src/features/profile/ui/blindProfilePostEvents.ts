export function bindProfilePostEvents(container: HTMLElement) {
  container.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement).closest("[data-profile-post]") as HTMLElement;
    if (!el) return;
  });
}