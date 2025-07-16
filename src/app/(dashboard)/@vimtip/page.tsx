import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVimTip } from "../../../../actions/askGemini";

export default async function VimTip() {
  const response = await getVimTip();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vim Tip</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl flex flex-row items-center">{response}</span>
      </CardContent>
    </Card>
  );
}
