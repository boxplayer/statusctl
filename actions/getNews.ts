"use server";

import { fetchRss, RssItem } from "../lib/rss";

export const getArchNews = async () => {
  const feed = await fetchRss("https://archlinux.org/feeds/news/");

  const items = feed.items.slice(0, 5).map((item: RssItem) => ({
    title: item.title || "Untitled",
    link: item.link || "#",
    pubDate: item.isoDate || "Unknown date",
    description: item.contentSnippet || "No description",
  }));

  return items;
};

export const getNeovimNews = async () => {
  const feed = await fetchRss("https://neovim.io/news.xml");

  const items = feed.items.slice(0, 5).map((item: RssItem) => ({
    title: item.title || "Untitled",
    link: item.link || "#",
    pubDate: item.isoDate || "Unknown date",
    description: item.contentSnippet || "No description",
  }));

  return items;
};

export const getHackerNews = async () => {
  const feed = await fetchRss("https://hnrss.github.io/#firehose-feeds");

  const items = feed.items.slice(0, 5).map((item: RssItem) => ({
    title: item.title || "Untitled",
    link: item.link || "#",
    pubDate: item.isoDate || "Unknown date",
    description: item.contentSnippet || "No description",
  }));

  return items;
};
