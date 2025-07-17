import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default async function NeoVimNews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NeoVim News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </CardContent>
    </Card>
  );
}
