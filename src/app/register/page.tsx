"use client";

import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useAccountCreation } from "@/hooks/useCreateAccount";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterPage = () => {
  // const { registerAccount, isRegisteringLoading } = useAccountCreation();
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
    router.push("/register/success");
    // registerAccount(values.email, () => {
    //   toast({
    //     title: "Email envoyé",
    //     description: "Un email vous a été envoyé pour activer votre compte",
    //   });
    //   onCodeReceived();
    // });
  }
  return (
    <CenteredCard
      title={"Créer un compte"}
      description={"Vous n'avez besoin que de votre email pour commencer"}
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
              className="w-full mt-2"
              type="submit"
              label="Commencer à créer le compte"
              isLoading={false}
              // isLoading={isRegisteringLoading}
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
                  <Link href="/activate">Continuer</Link>
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
