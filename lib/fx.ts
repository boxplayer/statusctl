import { sub } from "date-fns";
import { format } from "date-fns-tz";
const tz = "Europe/Warsaw";

export interface NBPRate {
  table: "A" | "B" | "C";
  currency: "string";
  code: string;
  rates: {
    no: string;
    effectiveDate: string;
    mid: number;
  }[];
}

export interface FxPoint {
  date: string;
  rate: number;
}

export interface FxSeries {
  pair: string;
  latest: FxPoint;
  history: FxPoint[];
}

export const fetchFxRate = async (baseCurrency = "GBP"): Promise<FxSeries> => {
  const today = new Date();
  const endDate = format(today, "yyyy-MM-dd", { timeZone: tz });
  const startDate = format(sub(today, { days: 7 }), "yyyy-MM-dd", {
    timeZone: tz,
  });

  const nbpApi = `https://api.nbp.pl/api/exchangerates/rates/a/${baseCurrency}/${startDate}/${endDate}/?format=json`;

  const res = await fetch(nbpApi, { next: { revalidate: 43_200 } });
  if (!res.ok) throw new Error("fx-api-fail");
  const json = await res.json();

  const fxRates = normaliseNbp(json);

  return fxRates;
};

export function normaliseNbp(payload: NBPRate): FxSeries {
  const history: FxPoint[] = [...payload.rates]
    .sort((a, b) => a.effectiveDate.localeCompare(b.effectiveDate))
    .map((r) => ({ date: r.effectiveDate, rate: r.mid }));

  const latest = history.at(-1)!;

  return {
    pair: `${payload.code}/PLN` as const,
    latest,
    history,
  };
}
