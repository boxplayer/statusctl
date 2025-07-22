"use server";

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
    console.log("Returning cached vimtip");
    return cachedTip as string;
  }

  console.log("Generating new VIM tip");
  const newTip = await askGemini(`You are a concise Vim tutor.
     Give a single, lesser-known (but useful) Vim trick for developers.
     Format: one line command, newline, then one-sentence explanation.
     No backticks or bullet points.
    `);
  await redis.set(key, newTip, { ex: 86_400 });

  return newTip;
});

export const getTriviaTip = cache(async () => {
  const today = new Date().toISOString().split("T")[0];
  const key = `triviatip:${today}`;

  const cachedTip = await redis.get(key);
  if (cachedTip) {
    console.log("Returning cached triviatip");
    return cachedTip as string;
  }

  console.log("Generating new trivia tip");
  const newTip =
    await askGemini(`You are an expert trivia writer creating 'Tip of the Day' content.
      Generate a single, surprising trivia fact that would be useful in a general knowledge quiz.
      The fact should be from a major category like history, science, geography, arts, or literature.
      Avoid common knowledge (e.g., the number of planets, the capital of France).
      Format: a catchy 3-5 word title, a newline, then a one or two-sentence explanation of the fact.
      Do not use backticks, markdown, or bullet points.
    `);
  await redis.set(key, newTip, { ex: 86_400 });

  return newTip;
});
