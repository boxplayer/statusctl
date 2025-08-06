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

  const [report, sources] = response.split(/\n(.+)/, 2);

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
        <span className="text-lg flex text-muted-foreground flex-row items-center py-3">
          {report}
        </span>
      </CardContent>
      <CardFooter>
        <span className="flex text-muted-foreground flex-row items-center py-3">
          {sources}
        </span>
      </CardFooter>
    </Card>
  );
}
