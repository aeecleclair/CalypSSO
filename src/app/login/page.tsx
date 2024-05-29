"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

const Login = () => {
  const formSchema = z.object({
    password: z.string({
      required_error: "Veuillez renseigner un mot de passe",
    }),
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
          <Card className="rounded-xl border border-white bg-card text-card-foreground shadow m-auto text-zinc-700 backdrop-blur bg-opacity-75 bg-white">
            <CardHeader>
              <CardTitle>MyECL</CardTitle>
              <CardDescription>
                Portail de connexion pour les services proposé par Eclair
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
              <CustomFormField
                form={form}
                name="password"
                label="Mot de passe"
                render={(field) => <PasswordInput {...field} />}
              />
              <LoadingButton
                type="submit"
                className="w-full mt-2"
                label="Se connecter"
                isLoading={false}
                // isLoading={isResetLoading}
              />
              <div className="flex flex-row justify-between lg:w-[700px] w-full">
                <Button variant="link">
                  <Link href="/register">Créer un compte</Link>
                </Button>
                <Button variant="link">
                  <Link href="/recover">Mot de passe oublié ?</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default Login;
