"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FxPoint } from "../../../../lib/fx";
import { format, isToday, parseISO } from "date-fns";
import { makeFxAxis } from "../../../../utils/axis";
import { AxisDomain } from "recharts/types/util/types";

export const LiveFXChart = ({
  chartConfig,
  chartData,
}: {
  chartConfig: ChartConfig;
  chartData: FxPoint[];
}) => {
  const y = makeFxAxis(chartData.map((p) => p.rate));

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
          left: 20,
          right: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          tickFormatter={(value) => {
            const d = parseISO(value);
            return isToday(d) ? "Today" : format(d, "dd/MM");
          }}
        />
        <YAxis
          ticks={y.ticks}
          domain={y.domain as AxisDomain}
          width={20}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => v.toFixed(2)}
          // allowDecimals={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          dataKey="rate"
          type="natural"
          stroke="var(--color-rate)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-rate)",
          }}
          activeDot={{
            r: 6,
          }}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
            formatter={(v: number) => v.toFixed(3)}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
};
