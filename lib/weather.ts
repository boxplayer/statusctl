import { format } from "date-fns-tz";

export interface HourlySnap {
  hour: string;
  temp: number;
  wind: number;
  rainFlag: boolean;
}

export interface WeatherSummary {
  current: number;
  hourly: HourlySnap[];
}

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
  const json = await res.json();

  const current = json.current_weather.temperature as number;

  const todayISO = format(new Date(), "yyyy-MM-dd", { timeZone: tz });
  const midnightISO = format(
    new Date(Date.now() + 24 * 60 * 60 * 1000),
    "yyyy-MM-dd'T'00:00",
    { timeZone: tz },
  );

  const hourly: HourlySnap[] = HOURS.map((h) => {
    const iso =
      h === 24 ? midnightISO : `${todayISO}T${String(h).padStart(2, "0")}:00`;
    const idx = json.hourly.time.indexOf(iso);
    if (idx === -1) return null;

    const rainProb = json.hourly.precipitation_probability[idx] as number;
    return {
      hour: h === 24 ? "24" : `${String(h).padStart(2, "0")}`,
      temp: Math.round(json.hourly.temperature_2m[idx] as number),
      wind: Math.round(json.hourly.wind_speed_10m[idx] as number),
      rainFlag: rainProb >= RAIN_THRESHOLD,
    };
  }).filter(Boolean) as HourlySnap[];

  return { current, hourly };
}
