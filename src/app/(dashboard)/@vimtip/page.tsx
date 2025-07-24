import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyCard from "@/components/card/EmptyCard";
import { getVimTip } from "../../../../actions/askGemini";

export default async function VimTip() {
  const response = await getVimTip();

  if (!response) {
    return <EmptyCard title="Vim Tip" message="Missing vim tip data" />;
  }

  const [command, description] = response.split(/\n(.+)/, 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vim Tip</CardTitle>
      </CardHeader>
      <CardContent>
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-xl font-semibold">
          {command}
        </code>
        <span className="text-lg flex text-muted-foreground flex-row items-center py-3">
          {description}
        </span>
      </CardContent>
    </Card>
  );
}
