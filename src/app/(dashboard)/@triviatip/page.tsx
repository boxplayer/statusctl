import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyCard from "@/components/card/EmptyCard";
import { getTriviaTip } from "../../../../actions/askLLM";

export default async function VimTip() {
  const response = await getTriviaTip();

  if (!response) {
    return <EmptyCard title="Trivia Tip" message="Missing trivia tip data" />;
  }

  const [title, description] = response.split(/\n(.+)/, 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trivia Tip</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl">{title}</div>
        <span className="text-lg flex text-muted-foreground flex-row items-center py-3">
          {description}
        </span>
      </CardContent>
    </Card>
  );
}
