import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTriviaTip } from "../../../../actions/askGemini";

export default async function VimTip() {
  const response = await getTriviaTip();

  const [title, description] = response.split(/\n(.+)/, 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trivia Tip</CardTitle>
      </CardHeader>
      <CardContent>
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-2xl font-semibold">
          {title}
        </code>
        <span className="text-xl flex text-muted-foreground flex-row items-center py-3">
          {description}
        </span>
      </CardContent>
    </Card>
  );
}
