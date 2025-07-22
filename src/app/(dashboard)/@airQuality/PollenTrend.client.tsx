"use client";

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LabelList,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { format, isToday, parseISO } from "date-fns";

export const PollenTrendChart = ({
  chartConfig,
  chartData,
}: {
  chartConfig: ChartConfig;
  chartData: {
    day: string;
    GRASS: number;
    WEED: number;
    TREE: number;
  }[];
}) => (
  <ChartContainer config={chartConfig}>
    <LineChart
      accessibilityLayer
      data={chartData}
      margin={{ left: 20, right: 20, top: 12 }}
    >
      <CartesianGrid vertical={false} strokeDasharray="3 3" />

      <XAxis
        dataKey="day"
        tickLine={true}
        axisLine={false}
        tickMargin={6}
        interval={0}
        fontSize={12}
        tickFormatter={(value) => {
          const d = parseISO(value);
          return isToday(d) ? "Today" : format(d, "EEE");
        }}
      />

      <YAxis hide domain={[0, 5]} />

      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent indicator="line" />}
      />

      <Line
        dataKey="GRASS"
        type="monotone"
        stroke={chartConfig.GRASS.color}
        strokeWidth={2}
        dot={false}
      >
        <LabelList position="top" fontSize={12} formatter={(v: number) => v} />
      </Line>

      <Line
        dataKey="WEED"
        type="monotone"
        stroke={chartConfig.WEED.color}
        strokeWidth={2}
        dot={false}
      >
        <LabelList position="top" fontSize={12} formatter={(v: number) => v} />
      </Line>

      <Line
        dataKey="TREE"
        type="monotone"
        stroke={chartConfig.TREE.color}
        strokeWidth={2}
        dot={false}
      >
        <LabelList position="top" fontSize={12} formatter={(v: number) => v} />
      </Line>

      <ChartLegend content={<ChartLegendContent />} />
    </LineChart>
  </ChartContainer>
);
