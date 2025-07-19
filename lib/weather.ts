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

export interface PollenSummary {
  regionCode: string;
  dailyInfo: PollenDaily[];
}

export interface PollenDaily {
  date: PollenDate;
  pollenTypeInfo: PollenTypeInfo[];
  plantInfo: PlantInfo[];
}

export interface PollenDate {
  year: number;
  month: number;
  day: number;
}

export interface PollenTypeInfo {
  code: string;
  displayName: string;
  inSeason: boolean;
  indexInfo: PollenIndexInfo;
  healthRecommendations?: string[];
}

export interface PlantInfo {
  code: string;
  displayName: string;
  inSeason?: boolean;
  indexInfo?: PollenIndexInfo;
  plantDescription?: PlantDescription;
}

export interface PollenIndexInfo {
  code: string;
  displayName: string;
  value: number;
  category: "None" | "Very Low" | "Low" | "Moderate" | "High" | "Very High";
  indexDescription: string;
  color: RGBColor;
}

export interface RGBColor {
  red?: number;
  green?: number;
  blue?: number;
}

export interface PlantDescription {
  type: "TREE" | "GRASS" | "WEED";
  family: string;
  season: string;
  specialColors: string;
  specialShapes: string;
  crossReaction: string;
  picture: string;
  pictureCloseup: string;
}
export interface PollenSummary {
  dailyInfo: PollenDaily[];
  regionCode: string;
}

export const fetchPollen = async (
  lat = 52.2297,
  lon = 21.0122,
): Promise<PollenSummary> => {
  const qs = new URLSearchParams({
    "location.latitude": lat.toString(),
    "location.longitude": lon.toString(),
    days: "5",
    key: process.env["GCP_API_KEY"]!,
  });

  const res = await fetch(
    `https://pollen.googleapis.com/v1/forecast:lookup?${qs}`,
    {
      next: { revalidate: 86_400 },
    },
  );

  if (!res.ok) throw new Error("pollen-api-fail");
  return res.json();
};
