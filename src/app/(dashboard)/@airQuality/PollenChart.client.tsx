"use client";

import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const PollenChart = ({
  chartConfig,
  chartData,
}: {
  chartConfig: ChartConfig;
  chartData: {
    name: string;
    value: number;
    category: string;
    color: string;
  }[];
}) => (
  <ChartContainer config={chartConfig}>
    <BarChart
      data={chartData}
      layout="vertical"
      margin={{
        left: 20,
        right: 20,
        top: 20,
      }}
    >
      <XAxis type="number" domain={[0, 5]} orientation="top" />
      <YAxis dataKey="name" type="category" tickLine={false} width={25} />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent indicator="line" />}
      />
      <Bar fillOpacity={0.7} dataKey="value" isAnimationActive={true}>
        {chartData.map((entry, i) => (
          <Cell key={i} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  </ChartContainer>
);
