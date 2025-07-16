import { cache } from "react";
import { Redis } from "@upstash/redis";
import askGemini from "../lib/gemini";

const redis = new Redis({
  url: process.env["UPSTASH_REDIS_REST_URL"] || "",
  token: process.env["UPSTASH_REDIS_REST_TOKEN"] || "",
});

export const getVimTip = cache(async () => {
  const today = new Date().toISOString().split("T")[0];
  const key = `vimtip:${today}`;

  const cachedTip = await redis.get(key);
  if (cachedTip) {
    console.log("Returning cached tip");
    return cachedTip as string;
  }

  console.log("Generating new VIM tip");
  const newTip = await askGemini(`You are a concise Vim tutor.
     Give a single, lesser-known (but useful) Vim trick for developers.
     Format: one line command, newline, then one-sentence explanation.
     No backticks or bullet points.
    `);
  await redis.set(key, newTip, { ex: 86400 });

  return newTip;
});
