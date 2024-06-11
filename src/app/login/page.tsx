"use client";

import { CenteredCard } from "@/components/custom/CenteredCard";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { LoginCustomFormField } from "@/components/custom/LoginCustomField";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { SuspenseHiddenField } from "@/components/custom/SuspenseHiddenField";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as React from "react";
import { Suspense } from "react";
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

  return (
    <CenteredCard
      title="MyECL"
      description="Portail de connexion pour les services proposé par Eclair"
    >
      <Form {...form}>
        {/* We can't use redirection since it will trigger CORS error, thus we are using the form */}
        <form
          method="POST"
          action={`${
            process.env.NEXT_PUBLIC_OVERRIDE_HYPERION_URL ||
            (typeof window !== "undefined" ? window?.location.origin : "")
          }/auth/authorization-flow/authorize-validation`}
        >
          <div className="grid gap-4">
            <Suspense>
              <LoginCustomFormField
                form={form}
                name="email"
                label="Email"
                render={(field) => (
                  <Input
                    placeholder="inscription@raid.fr"
                    required
                    {...field}
                  />
                )}
              />
            </Suspense>
            <Suspense>
              <LoginCustomFormField
                form={form}
                name="password"
                label="Mot de passe"
                render={(field) => <PasswordInput required {...field} />}
                displayError
              />
            </Suspense>
            <SuspenseHiddenField
              form={form}
              name="response_type"
              queryParam="response_type"
            />
            <SuspenseHiddenField
              form={form}
              name="redirect_uri"
              queryParam="redirect_uri"
            />
            <SuspenseHiddenField
              form={form}
              name="client_id"
              queryParam="client_id"
            />
            <SuspenseHiddenField form={form} name="scope" queryParam="scope" />
            <SuspenseHiddenField form={form} name="state" queryParam="state" />
            <SuspenseHiddenField form={form} name="nonce" queryParam="nonce" />
            <SuspenseHiddenField
              form={form}
              name="code_challenge"
              queryParam="code_challenge"
            />
            <SuspenseHiddenField
              form={form}
              name="code_challenge_method"
              queryParam="code_challenge_method"
            />
            <LoadingButton
              type="submit"
              className="w-full mt-2"
              label="Se connecter"
              isLoading={false}
            />
            <div className="flex flex-row justify-between">
              <Link href="/register" target="_blank" rel="noopener noreferrer">
                Créer un compte
              </Link>
              <Link href="/recover" target="_blank" rel="noopener noreferrer">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </CenteredCard>
  );
};

export default Login;
