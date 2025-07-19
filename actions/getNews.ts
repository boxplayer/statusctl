"use server";

import { fetchRss } from "../lib/rss";
import { Item } from "rss-parser";

export const getArchNews = async () => {
  const feed = await fetchRss("https://archlinux.org/feeds/news/");

  const items = feed.items.slice(0, 5).map((item: Item) => ({
    title: item.title || "Untitled",
    link: item.link || "#",
    pubDate: item.pubDate || "Unknown date",
    description: item.contentSnippet || "No description",
  }));

  return items;
};

export const getNeovimNews = async () => {
  const feed = await fetchRss("https://neovim.io/news.xml");

  const items = feed.items.slice(0, 5).map((item: Item) => ({
    title: item.title || "Untitled",
    link: item.link || "#",
    pubDate: item.pubDate || "Unknown date",
    description: item.contentSnippet || "No description",
  }));

  return items;
};
