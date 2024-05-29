"use client";

import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { HiddenField } from "@/components/custom/HiddenField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { SuspenseEmbed } from "@/components/custom/SuspenseEmbed";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useAccountCreation } from "@/hooks/useCreateAccount";
import { toast } from "@/components/ui/use-toast";
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
    <CenteredCard
      title="Créer un compte"
      description="Entrez vos informations pour créer un compte"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <SuspenseEmbed>
              <HiddenField
                form={form}
                name="activation_code"
                queryParam="code"
              />
            </SuspenseEmbed>
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
                <Button variant="link" className="pl-1" type="button">
                  <Link href="/register">Revenir</Link>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </CenteredCard>
  );
};

export default RegisterPage;
