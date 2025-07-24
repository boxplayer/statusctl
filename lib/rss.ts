import Parser from "rss-parser";
import { unstable_cache } from "next/cache";
import { z } from "zod";

const rssItemSchema = z
  .object({
    title: z.string(),
    link: z.url(),
    isoDate: z.iso.datetime().optional(),
  })
  .loose(); // Allow other properties not defined in the schema

const rssFeedSchema = z
  .object({
    items: z.array(rssItemSchema),
  })
  .loose(); // Allow other top-level properties

export type RssItem = z.infer<typeof rssItemSchema>;
export type RssFeed = z.infer<typeof rssFeedSchema>;

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
        const parsedXml = await parser.parseString(xml);

        const validationResult = rssFeedSchema.safeParse(parsedXml);

        if (!validationResult.success) {
          console.error(
            `RSS feed validation error for ${feedUrl}:`,
            validationResult.error.flatten(),
          );
          return { items: [] };
        }

        return validationResult.data;
      } catch (error) {
        console.error(
          `Failed to fetch or parse rss feed from: ${feedUrl} `,
          error,
        );
        return { items: [] };
      }
    },
    ["rss-feed", url],
    { revalidate },
  );

  return cachedFetch(url);
};
