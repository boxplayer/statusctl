import Parser from "rss-parser";

const parser = new Parser();

export const fetchRss = async (url: string) => {
  try {
    const feed = await parser.parseURL(url);
    console.log({ feed });
    return feed;
  } catch (error) {
    console.error(`Failed to fetch rss feed from: ${url} `, error);
    throw new Error("Failed to fetch rss feed");
  }
};
