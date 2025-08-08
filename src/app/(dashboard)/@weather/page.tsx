import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideThermometer } from "lucide-react";
import { ChartConfig } from "@/components/ui/chart";
import EmptyCard from "@/components/card/EmptyCard";

import { getWeather } from "../../../../actions/getWeather";
import { WeatherChart } from "./WeatherChart.client";
import { WeatherTable } from "./WeatherTable";

const chartConfig = {
  temp: {
    label: "Temperature (°C)",
    color: "var(--chart-4)",
  },
  wind: {
    label: "Wind (km/h)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default async function Weather() {
  // TODO: get weather by current location
  const weather = await getWeather();
  const { current, hourly } = weather;

  if (!current || !hourly) {
    return <EmptyCard title="Weather" message="Missing weather data" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between">
            <div>Weather</div>
            <div className="text-muted-foreground text-sm">Warsaw</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-3xl flex flex-row items-center">
          <LucideThermometer /> {current}°C
        </span>
        <span className="text-sm text-muted-foreground">Warsaw</span>
        <div className="py-3">
          <WeatherTable hourly={hourly} />
        </div>
        <WeatherChart chartConfig={chartConfig} chartData={hourly} />
      </CardContent>
    </Card>
  );
}
