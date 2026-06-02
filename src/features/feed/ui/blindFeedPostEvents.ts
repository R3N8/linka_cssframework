export function bindFeedPostEvents(container: HTMLElement) {
  container.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest(
      '[data-feed-post]'
    ) as HTMLElement;
    if (!el) return;
  });
}
