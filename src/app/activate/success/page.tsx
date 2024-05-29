import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HiCheck } from "react-icons/hi";

const SuccessPage = () => {
  return (
    <div className="flex [&>div]:w-full h-screen m-4">
      <Card className="rounded-xl border shadow m-auto backdrop-blur bg-opacity-80 bg-white">
        <CardHeader>
          <CardTitle>
            <div className="items-center flex w-full">
              <HiCheck className="w-32 h-32 m-auto" />
            </div>
            <div>
              <h1 className="text-2xl text-center">Inscription réussie</h1>
            </div>
          </CardTitle>
          <CardDescription className="min-w-[400px] w-full text-center text-base">
            Votre compte a été créé avec succès
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

export default SuccessPage;
