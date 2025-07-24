import { sub } from "date-fns";
import { format } from "date-fns-tz";
import z from "zod";

const tz = "Europe/Warsaw";

const NPBRateSchema = z.object({
  table: z.enum(["A", "B", "C"]),
  currency: z.string(),
  code: z.string(),
  rates: z.array(
    z.object({
      no: z.string(),
      effectiveDate: z.string(),
      mid: z.number(),
    }),
  ),
});

export type NBPRate = z.infer<typeof NPBRateSchema>;

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
  const cacheTag = `fx-${baseCurrency}-${endDate}`;

  const res = await fetch(nbpApi, {
    next: { revalidate: 3_600, tags: [cacheTag] },
  });
  if (!res.ok) throw new Error("fx-api-fail");
  const json = await res.json();

  const validatedJson = NPBRateSchema.safeParse(json);

  if (!validatedJson.success) {
    console.error("NBP API response validation error:", validatedJson.error);
    throw new Error("fx-data-invalid");
  }

  const fxRates = normaliseNbp(validatedJson.data);

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
