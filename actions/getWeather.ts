import { cache } from "react";
import { fetchForecast } from "../lib/weather";

export const getWeather = cache(async () => {
  // Revalidate every 30 min
  return fetchForecast();
});
