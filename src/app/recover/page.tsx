"use client";

import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRecoverPassword } from "@/hooks/useRecoverPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RecoverPage = () => {
  const { recoverPassword, isRecoverLoading } = useRecoverPassword();
  const router = useRouter();
  const formSchema = z.object({
    email: z
      .string({
        required_error: "Veuillez renseigner votre adresse email",
      })
      .email({
        message: "Veuillez renseigner une adresse email valide",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    recoverPassword(values.email, () => {
      router.push("/recover/success");
    });
  }

  return (
    <CenteredCard
      title={"Réinitialiser le mot de passe"}
      description={"Entrez votre email pour commencer"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <CustomFormField
              form={form}
              name="email"
              label="Email"
              render={(field) => (
                <Input placeholder="inscription@raid.fr" {...field} />
              )}
            />
            <LoadingButton
              type="submit"
              className="w-full mt-2"
              label={"Recevoir le code de réinitialisation"}
              isLoading={isRecoverLoading}
            />

            <div className="flex lg:flex-row lg:w-[700px] w-full flex-col">
              <div className="w-full text-center text-sm">
                Vous avez déjà un compte ?{" "}
                <Button variant="link" className="pl-1" type="button">
                  <Link href="/login">Connectez-vous</Link>
                </Button>
              </div>
              <div className="w-full text-center text-sm">
                Vous avez reçu le code par mail ?{" "}
                <Button variant="link" className="pl-1" type="button">
                  <Link href="/reset-password">Continuer</Link>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </CenteredCard>
  );
};

export default RecoverPage;
