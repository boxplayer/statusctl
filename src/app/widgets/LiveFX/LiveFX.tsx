import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { getFxRate } from "../../../../actions/getFxRate";
import { ChartConfig } from "@/components/ui/chart";
import { LiveFXChart } from "./LiveFXChart.client";

const chartConfig = {
  rate: {
    label: "rate label",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default async function LiveFX({
  baseCurrency,
}: {
  baseCurrency: string;
}) {
  const fxRates = await getFxRate(baseCurrency);

  const { pair, latest, history } = fxRates;

  return (
    <Card>
      <CardHeader>
        <CardTitle>FX Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-5">
          <span className="text-3xl flex flex-row items-center">{pair}</span>
          <p className="text-3xl font-semibold">{latest.rate.toFixed(2)}</p>
        </div>
        <p className="text-sm text-muted-foreground">Updated {latest.date}</p>
        <LiveFXChart chartConfig={chartConfig} chartData={history} />
      </CardContent>
    </Card>
  );
}
