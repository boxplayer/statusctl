import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LiveFXLoading() {
  return (
    <Card className="w-full h-full animate-pulse">
      <CardHeader>
        <CardTitle className="h-4 w-28 rounded bg-muted" />
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="h-3 w-40 rounded bg-muted" />
        <div className="h-3 w-24 rounded bg-muted" />
      </CardContent>
    </Card>
  );
}
