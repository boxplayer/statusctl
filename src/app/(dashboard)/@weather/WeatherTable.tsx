import { Umbrella } from "lucide-react";
import { HourlySnap } from "../../../../lib/weather";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

export const WeatherTable = ({ hourly }: { hourly: HourlySnap[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Hour</TableHead>
        <TableHead>Temperature</TableHead>
        <TableHead>Wind</TableHead>
        <TableHead>Rain</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {hourly.map((h) => (
        <TableRow key={h.hour}>
          <TableCell className="font-medium">{h.hour}</TableCell>
          <TableCell>{h.temp}</TableCell>
          <TableCell>{h.wind}</TableCell>
          <TableCell>{h.rainFlag && <Umbrella />}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
