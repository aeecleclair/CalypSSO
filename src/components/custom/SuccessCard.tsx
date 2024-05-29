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
    <div className="flex [&>div]:w-full h-screen m-4">
      <Card className="rounded-xl border shadow m-auto backdrop-blur bg-opacity-80 bg-white">
        <CardHeader>
          <CardTitle>
            <div className="items-center flex w-full">
              {icon({ className: "w-32 h-32 m-auto" })}
            </div>
            <div>
              <h1 className="text-2xl text-center">{title}</h1>
            </div>
          </CardTitle>
          <CardDescription className="min-w-[400px] w-full text-center text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="text-center w-full text-sm">
            Vous pouvez fermer cette fenêtre
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
