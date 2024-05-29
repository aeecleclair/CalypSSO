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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// import { useRecoverPassword } from "@/hooks/useRecoverPassword";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResetPasswordPage = () => {
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
    router.push("/reset-password/success");
    // resetPassword(values.password, values.activation_code, () => {
    //   toast({
    //     title: "Mot de passe réinitialisé",
    //     description: "Votre mot de passe a été réinitialisé avec succès",
    //   });
    //   router.replace("/login");
    // });
  }

  return (
    <CenteredCard
      title="Réinitialiser le mot de passe"
      description="Entrez votre nouveau mot de passe"
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
                <Button variant="link" className="pl-1" type="button">
                  <Link href="/recover">Revenir</Link>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </CenteredCard>
  );
};

export default ResetPasswordPage;
