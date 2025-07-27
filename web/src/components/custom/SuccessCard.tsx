import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconType } from "react-icons/lib";

interface SuccessCardProps {
  title: string;
  description: string;
  icon: IconType;
}

export const SuccessCard = ({ title, description, icon }: SuccessCardProps) => {
  return (
    <div className="m-4 flex h-screen [&>div]:w-full">
      <Card className="m-auto rounded-xl border bg-white bg-opacity-80 shadow-sm backdrop-blur-xs">
        <CardHeader>
          <CardTitle>
            <div className="flex w-full items-center">
              {icon({ className: "w-32 h-32 m-auto" })}
            </div>
            <div>
              <h1 className="text-center text-2xl">{title}</h1>
            </div>
          </CardTitle>
          <CardDescription className="w-full min-w-[400px] text-center text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="w-full text-center text-sm">
            Vous pouvez fermer cette fenêtre
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
