import { cache } from "react";
import { fetchForecast } from "../lib/weather";

export const getWeather = cache(async () => {
  return fetchForecast();
});
