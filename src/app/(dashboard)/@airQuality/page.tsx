import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getPollenData } from "../../../../actions/getWeather";
import { PollenChart } from "./PollenChart.client";
import { PollenTrendChart } from "./PollenTrend.client";
import { ChartConfig } from "@/components/ui/chart";
import EmptyCard from "@/components/card/EmptyCard";

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
  const { today, bars, trendData } = await getPollenData();

  if (!today || !bars || !trendData) {
    return <EmptyCard title="AirQuality" message="Missing air quality data" />;
  }

  const date = new Date(today.date.year, today.date.month - 1, today.date.day);

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
