import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmptyCard from "@/components/card/EmptyCard";
import { getWeatherReport } from "../../../../actions/askLLM";

export default async function WeatherTip() {
  const response = await getWeatherReport();

  if (!response) {
    return (
      <EmptyCard
        title="AI Weather Report"
        message="Missing weather report data"
      />
    );
  }

  const [line1, line2, srcLine] = response.trim().split("\n");
  const [sunChip, rainChip] = line1?.split(/\s{2,}/);
  const [rhChip, windChip] = line2 ? line2.split(/\s{2,}/) : [null, null];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between">
            <div>AI Weather Report</div>
            <div className="text-muted-foreground text-sm">Warsaw</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl">Tomorrow</div>
        <span className="text-lg flex-col text-muted-foreground items-center py-3">
          <div>{sunChip}</div>
          <div>{rainChip}</div>
          <div>{rhChip && rhChip}</div>
          <div>{windChip && windChip}</div>
        </span>
      </CardContent>
      <CardFooter>
        <span className="flex text-muted-foreground flex-row items-center py-3">
          {srcLine}
        </span>
      </CardFooter>
    </Card>
  );
}
