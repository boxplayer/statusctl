import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Link } from "lucide-react";
import { getPollenData } from "../../../../actions/getWeather";

export default async function AirQuality() {
  const { today, outlook, todayByType } = await getPollenData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Air Quality</CardTitle>
      </CardHeader>
      <CardContent>Air quality and {JSON.stringify(today)}</CardContent>
      <CardContent>Air quality and {JSON.stringify(outlook)}</CardContent>
      <CardContent>Air quality and {JSON.stringify(todayByType)}</CardContent>
    </Card>
  );
}
