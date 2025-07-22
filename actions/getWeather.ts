"use server";

import { cache } from "react";
import { fetchForecast, fetchPollen } from "../lib/weather";

export const getWeather = cache(async () => {
  return fetchForecast();
});

export const getPollenData = cache(async () => {
  const summary = await fetchPollen();

  const today = summary.dailyInfo[0];
  const outlook = summary.dailyInfo;

  return {
    today,
    outlook,
  };
});
