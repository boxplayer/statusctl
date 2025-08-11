function categoryColor(cat: string) {
  return (
    (
      {
        None: "#d1d5db",
        "Very Low": "#6ee7b7",
        Low: "#34d399",
        Moderate: "#fbbf24",
        High: "#f87171",
        "Very High": "#ef4444",
      } as const
    )[cat as keyof typeof categoryColor] ?? "#d1d5db"
  );
}

export function prepTodayBars(daily: PollenDaily) {
  if (!daily?.pollenTypeInfo) return [];
  return daily.pollenTypeInfo
    .filter(
      (t) => t && ["GRASS", "WEED", "TREE"].includes(t.code) && t.indexInfo,
    )
    .map((t) => ({
      name: t.displayName,
      value: t.indexInfo.value,
      category: t.indexInfo.category,
      color: categoryColor(t.indexInfo.category),
    }));
}

export function prepTrend(outlook: PollenDaily[]) {
  if (!outlook) return [];
  return outlook
    .filter((d) => d?.date && d.pollenTypeInfo?.some((p) => p.indexInfo))
    .map((d) => {
      const day = new Date(
        d.date.year,
        d.date.month - 1,
        d.date.day,
      ).toISOString();

      const val = (code: "GRASS" | "WEED" | "TREE") =>
        d.pollenTypeInfo.find((p) => p?.code === code)?.indexInfo?.value ?? 0;

      return {
        day,
        GRASS: val("GRASS"),
        WEED: val("WEED"),
        TREE: val("TREE"),
      };
    });
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
      next: { revalidate: 43_200 },
    },
  );

  if (!res.ok) throw new Error("pollen-api-fail");
  return res.json();
};
