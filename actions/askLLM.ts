"use server";

import { cache } from "react";
import { Redis } from "@upstash/redis";
import askGPT from "../lib/openai";

const redis = new Redis({
  url: process.env["UPSTASH_REDIS_REST_URL"] || "",
  token: process.env["UPSTASH_REDIS_REST_TOKEN"] || "",
});

export const getVimTip = cache(async () => {
  const today = new Date().toISOString().split("T")[0];
  const key = `gpt:vimtip:${today}`;

  const cachedTip = await redis.get(key);
  if (cachedTip) {
    console.log("Returning cached vimtip");
    return cachedTip as string;
  }

  console.log("Generating new VIM tip");
  const newTip = await askGPT(
    "gpt-4.1-mini",
    `You are a concise Vim tutor.
     Give a single, lesser-known (but useful) Vim trick for developers.
     Format: one line command, newline, then one-sentence explanation.
     No backticks or bullet points.
    `,
  );
  await redis.set(key, newTip, { ex: 86_400 });

  return newTip;
});

export const getTriviaTip = cache(async () => {
  const today = new Date().toISOString().split("T")[0];
  const key = `gpt:triviatip:${today}`;

  const cachedTip = await redis.get(key);
  if (cachedTip) {
    console.log("Returning cached triviatip");
    return cachedTip as string;
  }

  console.log("Generating new trivia tip");
  const newTip = await askGPT(
    "gpt-4.1-mini",
    `You are an expert trivia writer creating 'Tip of the Day' content.
      Generate a single trivia fact that would be useful in a general knowledge quiz.
      The fact should be from a major category like history, science, geography, arts, or literature.
      Avoid common knowledge (e.g., the number of planets, the capital of France).
      Format: a catchy 3-5 word title, a newline, then a one or two-sentence explanation of the fact.
      Do not use backticks, markdown, or bullet points.
    `,
  );
  await redis.set(key, newTip, { ex: 86_400 });

  return newTip;
});

export const getWeatherReport = cache(async () => {
  const today = new Date().toISOString().split("T")[0];
  const key = `gpt:weatherreport:${today}`;

  const cachedReport = await redis.get(key);
  if (cachedReport) {
    console.log("Returning cached weather report");
    return cachedReport as string;
  }

  console.log("Generating new weather report");
  const newReport = await askGPT(
    "o3",
    `You are a concise weather forecaster.
      Give the *overall weather outlook for tomorrow in Warsaw, Poland*.  
      Include ➜ probability-of-precipitation, sunshine / cloud cover, temperature
      range °C, wind speed km/h, and relative humidity %.
      • **Consult at least five independent, reputable sources, preferably local ones**  
        (e.g. MeteoBlue, AccuWeather, ECMWF, NOAA, Meteo.pl, WeatherAPI).
      • **Cross-check** them and report the consensus / majority values.
      • **Output exactly two lines, nothing else**

        Summary ≤ 250 characters.
        2️⃣Sources: <list-of-sources-used> ( number must equal the distinct providers you actually referenced — minimum **5** )

      No back-ticks, No emojis, bullet points, no city name in summary or additional lines.
    `,
  );
  await redis.set(key, newReport, { ex: 86_400 });

  return newReport;
});
