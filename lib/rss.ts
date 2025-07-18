import Parser from "rss-parser";
import { unstable_cache } from "next/cache";

const parser = new Parser();

export const fetchRss = async (url: string, revalidate: number = 86_400) => {
  const cachedFetch = unstable_cache(
    async (feedUrl: string) => {
      try {
        const res = await fetch(feedUrl, { next: { revalidate } });

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const xml = await res.text();
        return parser.parseString(xml);
      } catch (error) {
        console.error(`Failed to fetch rss feed from: ${feedUrl} `, error);
        return { items: [] };
      }
    },
    ["rss-feed", url],
    { revalidate },
  );

  return cachedFetch(url);
};
