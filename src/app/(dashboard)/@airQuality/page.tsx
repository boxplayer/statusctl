import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getPollenData } from "../../../../actions/getWeather";
import { PollenDaily } from "../../../../lib/weather";
import { PollenChart } from "./PollenChart.client";
import { PollenTrendChart } from "./PollenTrend.client";
import { ChartConfig } from "@/components/ui/chart";

function prepTodayBars(daily: PollenDaily) {
  return daily.pollenTypeInfo
    .filter(
      (t) =>
        ["GRASS", "WEED", "TREE"].includes(t.code) &&
        t.indexInfo !== undefined,
    )
    .map((t) => ({
      name: t.displayName,
      value: t.indexInfo.value,
      category: t.indexInfo.category,
      color: categoryColor(t.indexInfo.category),
    }));
}

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

function prepTrend(outlook: PollenDaily[]) {
  return outlook.map((d) => {
    const day = new Date(
      d.date.year,
      d.date.month - 1,
      d.date.day,
    ).toISOString();

    const val = (code: "GRASS" | "WEED" | "TREE") =>
      d.pollenTypeInfo.find((p) => p.code === code)?.indexInfo?.value ?? 0;

    return {
      day,
      GRASS: val("GRASS"),
      WEED: val("WEED"),
      TREE: val("TREE"),
    };
  });
}

const chartConfig = {
  WEED: {
    label: "Weed",
    color: "#bd7ebe",
  },
  GRASS: {
    label: "Grass",
    color: "#beb9db",
  },
  TREE: {
    label: "Tree",
    color: "#7eb0d5",
  },
} satisfies ChartConfig;

export default async function AirQuality() {
  const { today, outlook } = await getPollenData();

  //TODO: change this
  if (!today || !outlook?.length) {
    return <div> no data</div>;
  }

  const bars = prepTodayBars(today);
  const date = new Date(today.date.year, today.date.month - 1, today.date.day);
  const trendData = prepTrend(outlook);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between">
            <div>Air Quality</div>
            <div className="text-muted-foreground text-sm">Warsaw</div>
          </div>
        </CardTitle>
        <CardDescription>
          Updated {date.toLocaleDateString("en-CA")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PollenChart chartData={bars} chartConfig={chartConfig} />
        <PollenTrendChart chartData={trendData} chartConfig={chartConfig} />
      </CardContent>
    </Card>
  );
}
