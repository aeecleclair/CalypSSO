"use client";

import { CustomFormField } from "@/components/custom/CustomFormField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { TextSeparator } from "@/components/custom/TextSeparator";
import { Form } from "@/components/ui/form";
// import { useAccountCreation } from "@/hooks/useCreateAccount";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// import { CoreUserActivateRequest } from "@/api/hyperionSchemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterPage = () => {
  // const { activateAccount, isActivationLoading } = useAccountCreation();
  // const router = useRouter();
  const formSchema = z.object({
    activation_code: z
      .string({
        required_error: "Veuillez renseigner le code d'activation",
      })
      .min(8, {
        message: "Le code d'activation doit contenir 8 caractères",
      }),
    firstname: z
      .string({
        required_error: "Veuillez renseigner votre prénom",
      })
      .min(1, {
        message: "Veuillez renseigner votre prénom",
      }),
    name: z
      .string({
        required_error: "Veuillez renseigner votre nom",
      })
      .min(1, {
        message: "Veuillez renseigner votre nom",
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
    // const body: CoreUserActivateRequest = {
    //   activation_token: values.activation_code,
    //   firstname: values.firstname,
    //   name: values.name,
    //   password: values.password,
    //   floor: "Exte",
    // };
    // activateAccount(body, () => {
    //   toast({
    //     title: "Compte créé",
    //     description: "Votre compte a été créé avec succès",
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
              <CardTitle className="text-xl">Créer un compte</CardTitle>
              <CardDescription>
                Entrez vos informations pour créer un compte
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
                <TextSeparator text="Informations du compte" />
                <div className="grid md:grid-cols-2 gap-4 mt-2 grid-cols-1">
                  <CustomFormField
                    form={form}
                    name="firstname"
                    label="Prénom"
                    render={(field) => <Input {...field} />}
                  />
                  <CustomFormField
                    form={form}
                    name="name"
                    label="Nom"
                    render={(field) => <Input {...field} />}
                  />
                </div>
                <CustomFormField
                  form={form}
                  name="password"
                  label="Mot de passe"
                  render={(field) => <PasswordInput {...field} />}
                />
                <LoadingButton
                  type="submit"
                  className="w-full mt-2"
                  label={"Créer le compte"}
                  isLoading={false}
                  // isLoading={isActivationLoading}
                />
                <div className="flex justify-between lg:w-[700px] w-full lg:flex-row flex-col">
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
                      // onClick={onCodeNotReceived}
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

export default RegisterPage;