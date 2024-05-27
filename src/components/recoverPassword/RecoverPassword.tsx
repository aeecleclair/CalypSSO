import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { CustomFormField } from "../custom/CustomFormField";
// import { useRecoverPassword } from "@/hooks/useRecoverPassword";
import { useRouter } from "next/navigation";
import { LoadingButton } from "../custom/LoadingButton";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { TextSeparator } from "../custom/TextSeparator";
import { PasswordInput } from "../custom/PasswordInput";

interface RecoverPasswordProps {
  onCodeNotReceived: () => void;
}

export const RecoverPassword = ({
  onCodeNotReceived,
}: RecoverPasswordProps) => {
  // const { resetPassword, isResetLoading } = useRecoverPassword();
  const router = useRouter();
  const formSchema = z.object({
    activation_code: z
      .string({
        required_error: "Veuillez renseigner le code d'activation",
      })
      .min(8, {
        message: "Le code d'activation doit contenir 8 caractères",
      }),
    password: z
      .string({
        required_error: "Veuillez renseigner un mot de passe",
      })
      .min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // resetPassword(values.password, values.activation_code, () => {
    //   toast({
    //     title: "Mot de passe réinitialisé",
    //     description: "Votre mot de passe a été réinitialisé avec succès",
    //   });
    //   router.replace("/login");
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex [&>div]:w-full h-screen m-4">
          <Card className="rounded-xl border bg-card text-card-foreground shadow m-auto text-zinc-700 backdrop-blur bg-opacity-80 bg-white">
            <CardHeader>
              <CardTitle className="text-xl">
                Réinitialiser le mot de passe
              </CardTitle>
              <CardDescription>
                {"Entrez le code d'activation et votre nouveau mot de passe"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2 mb-2">
                  <CustomFormField
                    form={form}
                    name="activation_code"
                    label="Code d'activation"
                    render={(field) => <Input {...field} />}
                  />
                </div>
                <TextSeparator text="Nouveau mot de passe" />
                <CustomFormField
                  form={form}
                  name="password"
                  label="Mot de passe"
                  render={(field) => <PasswordInput {...field} />}
                />
                <LoadingButton
                  type="submit"
                  className="w-full mt-2"
                  label="Réinitialiser le mot de passe"
                  isLoading={false}
                  // isLoading={isResetLoading}
                />
                <div className="flex lg:flex-row lg:w-[700px] w-full flex-col">
                  <div className="w-full text-center text-sm">
                    Vous avez déjà un compte ?{" "}
                    <Button variant="link" className="pl-1" type="button">
                      <Link href="/login">Connectez-vous</Link>
                    </Button>
                  </div>
                  <div className="w-full text-center text-sm">
                    {"Vous n'avez pas reçu le code par mail ? "}
                    <Button
                      variant="link"
                      className="pl-1"
                      onClick={onCodeNotReceived}
                      type="button"
                    >
                      Revenir
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};
