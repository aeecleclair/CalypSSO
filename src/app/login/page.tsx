"use client";

import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    <CenteredCard
      title="MyECL"
      description="Portail de connexion pour les services proposé par Eclair"
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
          </div>
        </form>
      </Form>
    </CenteredCard>
  );
};

export default Login;
