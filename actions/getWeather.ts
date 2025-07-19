"use server";

import { cache } from "react";
import { fetchForecast, fetchPollen } from "../lib/weather";

export const getWeather = cache(async () => {
  return fetchForecast();
});

export const getPollenData = cache(async () => {
  const summary = await fetchPollen();

  const today = summary.dailyInfo[0];
  const outlook = summary.dailyInfo.slice(1); // next 4 days

  /* Today per-type risk */
  const todayByType = Object.fromEntries(
    today.pollenTypeInfo.map((t) => [t.code, t]),
  );

  return {
    today,
    outlook,
    todayByType,
  };
});
