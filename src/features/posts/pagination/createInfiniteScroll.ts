type FetchPage<T> = (page: number) => Promise<{
  data: T[];
  meta: {
    isLastPage: boolean;
  };
}>;

export function createInfiniteScroll<T>(
  _container: HTMLElement,
  fetchPage: FetchPage<T>,
  render: (items: T[]) => void
) {
  let page = 1;
  let loading = false;
  let done = false;
  let items: T[] = [];

  const sentinel = document.getElementById("feed-sentinel");

  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      if (!entry.isIntersecting) return;

      // 🚨 CRITICAL: prevents instant loop
      setTimeout(() => load(), 200);
    },
    {
      rootMargin: "200px", // only load when close
    }
  );

  observer.observe(sentinel);

  async function load() {
    if (loading || done) return;
    loading = true;

    const res = await fetchPage(page);

    if (!res.data.length) {
      done = true;
      loading = false;
      return;
    }

    items = [...items, ...res.data];
    render(items);

    if (res.meta.isLastPage) {
      done = true;
      observer.unobserve(sentinel!);
      loading = false;
      return;
    }

    page++;
    loading = false;
  }

  load();
}