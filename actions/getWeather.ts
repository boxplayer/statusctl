"use server";

import { cache } from "react";
import { fetchForecast } from "../lib/weather";
import { fetchPollen, prepTodayBars, prepTrend } from "../lib/pollen";

export const getWeather = cache(async () => {
  return fetchForecast();
});

export const getPollenData = cache(async () => {
  const summary = await fetchPollen();

  if (!summary?.dailyInfo?.length) {
    return {
      today: undefined,
      outlook: [],
      bars: [],
      trendData: [],
    };
  }

  const today = summary.dailyInfo[0];
  const outlook = summary.dailyInfo;
  const bars = prepTodayBars(today);
  const trendData = prepTrend(outlook);

  return {
    today,
    outlook,
    bars,
    trendData,
  };
});
