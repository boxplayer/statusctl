"use client";

import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HourlySnap } from "../../../../lib/weather";

export const WeatherChart = ({
  chartConfig,
  chartData,
}: {
  chartConfig: ChartConfig;
  chartData: HourlySnap[];
}) => (
  <ChartContainer config={chartConfig}>
    <AreaChart
      accessibilityLayer
      data={chartData}
      margin={{
        left: 20,
        right: 20,
        top: 20,
      }}
    >
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="hour"
        tickLine={true}
        axisLine={false}
        tickMargin={8}
        interval={0}
      />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent indicator="line" />}
      />
      <Area
        dataKey="wind"
        type="natural"
        fill="var(--color-wind)"
        fillOpacity={0.4}
        stroke="var(--color-wind)"
        stackId="a"
      >
        <LabelList
          dataKey="wind"
          position="top"
          formatter={(v: number) => `${v}`}
          fontSize={10}
          fill="hsl(var(--foreground))"
        />
      </Area>
      <Area
        dataKey="temp"
        type="natural"
        fill="var(--color-temp)"
        fillOpacity={0.4}
        stroke="var(--color-temp)"
        stackId="a"
      >
        <LabelList
          dataKey="temp"
          position="top"
          formatter={(v: number) => `${v}°`}
          fontSize={10}
          fill="hsl(var(--foreground))"
        />
      </Area>

      <ChartLegend content={<ChartLegendContent />} />
    </AreaChart>
  </ChartContainer>
);
