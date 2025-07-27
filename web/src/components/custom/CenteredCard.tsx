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
    <div className="m-4 flex h-screen [&>div]:w-full">
      <Card className="m-auto rounded-xl border bg-white/80 shadow-sm backdrop-blur-xs">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="w-full lg:w-[700px]">{children}</CardContent>
      </Card>
    </div>
  );
};
