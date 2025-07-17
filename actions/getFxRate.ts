"use server";

import { cache } from "react";
import { fetchFxRate } from "../lib/fx";

export const getFxRate = cache(async (baseCurrency: string) => {
  return fetchFxRate(baseCurrency);
});
