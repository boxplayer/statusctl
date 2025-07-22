import { ChartConfig } from "@/components/ui/chart";
import { getFxRate } from "../../../../actions/getFxRate";
import { LiveFXChart } from "./LiveFXChart.client";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const chartConfig = {
  rate: {
    label: "rate label",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default async function LiveFX({}: { baseCurrency: string }) {
  const fxRates = await getFxRate("GBP");

  const { pair, latest, history } = fxRates;

  return (
    <Card>
      <CardHeader>
        <CardTitle>FX Rate</CardTitle>
        <CardDescription>Updated {latest.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-5 mb-4">
          <span className="text-3xl flex flex-row items-center">{pair}</span>
          <p className="text-3xl font-semibold">{latest.rate.toFixed(2)}</p>
        </div>
        <LiveFXChart chartConfig={chartConfig} chartData={history} />
      </CardContent>
    </Card>
  );
}
