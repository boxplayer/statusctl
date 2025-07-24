import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

type EmptyCardProps = {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export default function EmptyCard({
  title = "Nothing here yet",
  message = "Once you create data it will appear in this section.",
  icon,
  action,
  className,
}: EmptyCardProps) {
  return (
    <Card className={className}>
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent>{action}</CardContent>
    </Card>
  );
}
