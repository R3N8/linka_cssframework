type TabCache = {
  posts?: string;
  media?: string;
  followers?: string;
  following?: string;
};

const cache: TabCache = {};

export function getTabCache(tab: keyof TabCache): string | undefined {
  return cache[tab];
}

export function setTabCache(tab: keyof TabCache, html: string) {
  cache[tab] = html;
}

export function clearTabCache() {
  Object.keys(cache).forEach((k) => {
    delete cache[k as keyof TabCache];
  });
}