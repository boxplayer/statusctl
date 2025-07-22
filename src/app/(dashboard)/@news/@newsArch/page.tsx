import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { getArchNews } from "../../../../../actions/getNews";
import { Link } from "lucide-react";

export default async function ArchNews() {
  const news = await getArchNews();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Arch News</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium max-w-[12rem] truncate">
                  {item.title}
                </TableCell>
                <TableCell>
                  {new Date(item.pubDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <a href={item.link} target="_blank">
                    <Link />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
