import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import EmptyCard from "@/components/card/EmptyCard";
import { getArchNews } from "../../../../../actions/getNews";
import { Link } from "lucide-react";

export default async function ArchNews() {
  const news = await getArchNews();

  if (!news) {
    return <EmptyCard title="Arch News" message="Missing arch news data" />;
  }

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
              <TableRow
                key={index}
                className={
                  new Date(item.pubDate).toDateString() ===
                  new Date().toDateString()
                    ? "bg-yellow-100 rounded-xl"
                    : ""
                }
              >
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
