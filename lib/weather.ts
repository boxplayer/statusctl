import { format } from "date-fns-tz";
import { z } from "zod";

const openMeteoResponseSchema = z.object({
  current_weather: z.object({
    temperature: z.number(),
  }),
  hourly: z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    precipitation_probability: z.array(z.number()),
    wind_speed_10m: z.array(z.number()),
  }),
});

const hourlySnapSchema = z.object({
  hour: z.string(),
  temp: z.number(),
  wind: z.number(),
  rainFlag: z.boolean(),
});

export const weatherSummarySchema = z.object({
  current: z.number(),
  hourly: z.array(hourlySnapSchema),
});

export type HourlySnap = z.infer<typeof hourlySnapSchema>;
export type WeatherSummary = z.infer<typeof weatherSummarySchema>;

const RAIN_THRESHOLD = 40;
const HOURS = [9, 12, 15, 18, 21, 24];

export async function fetchForecast(
  lat = 52.2297,
  lon = 21.0122,
  tz = "Europe/Warsaw",
): Promise<WeatherSummary> {
  const api =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true` +
    `&hourly=temperature_2m,precipitation_probability,wind_speed_10m` +
    `&timezone=${tz}`;

  const res = await fetch(api, { next: { revalidate: 1800 } }); // 30 min
  if (!res.ok) throw new Error("weather-api-fail");

  const rawJson = await res.json();

  try {
    const json = openMeteoResponseSchema.parse(rawJson);

    const current = json.current_weather.temperature;

    const todayISO = format(new Date(), "yyyy-MM-dd", { timeZone: tz });
    const midnightISO = format(
      new Date(Date.now() + 24 * 60 * 60 * 1000),
      "'''yyyy-MM-dd'T'00:00'''",
      { timeZone: tz },
    );

    const hourly: HourlySnap[] = HOURS.map((h) => {
      const iso =
        h === 24 ? midnightISO : `${todayISO}T${String(h).padStart(2, "0")}:00`;
      const idx = json.hourly.time.indexOf(iso);
      if (idx === -1) return null;

      const rainProb = json.hourly.precipitation_probability[idx];
      return {
        hour: h === 24 ? "24" : `${String(h).padStart(2, "0")}`,
        temp: Math.round(json.hourly.temperature_2m[idx]),
        wind: Math.round(json.hourly.wind_speed_10m[idx]),
        rainFlag: rainProb >= RAIN_THRESHOLD,
      };
    }).filter(Boolean) as HourlySnap[];

    return { current, hourly };
  } catch (error) {
    console.error("Weather API response validation error:", error);
    throw new Error("weather-data-invalid");
  }
}

