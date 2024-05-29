import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CenteredCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const CenteredCard = ({
  title,
  description,
  children,
}: CenteredCardProps) => {
  return (
    <div className="flex [&>div]:w-full h-screen m-4">
      <Card className="rounded-xl border bg-card text-card-foreground shadow m-auto text-zinc-700 backdrop-blur bg-opacity-80 bg-white">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};
