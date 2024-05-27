"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "../custom/CustomFormField";
import { LoadingButton } from "../custom/LoadingButton";
// import { useRecoverPassword } from "@/hooks/useRecoverPassword";
import { toast } from "../ui/use-toast";

interface AskMailProps {
  onCodeReceived: () => void;
}

export const AskMail = ({ onCodeReceived }: AskMailProps) => {
  // const { recoverPassword, isRecoverLoading } = useRecoverPassword();
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
    // recoverPassword(values.email, () => {
    //   toast({
    //     title: "Email envoyé",
    //     description:
    //       "Un email vous a été envoyé pour réinitialiser votre mot de passe",
    //   });
    //   onCodeReceived();
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex [&>div]:w-full h-screen m-4">
          <Card className="rounded-xl border bg-card text-card-foreground shadow m-auto text-zinc-700 backdrop-blur bg-opacity-80 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">
                {"Réinitialiser le mot de passe"}
              </CardTitle>
              <CardDescription>
                {"Entrez votre email pour commencer"}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
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
                isLoading={false}
                // isLoading={isRecoverLoading}
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
                  <Button
                    variant="link"
                    className="pl-1"
                    onClick={onCodeReceived}
                    type="button"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};
