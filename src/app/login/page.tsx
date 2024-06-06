"use client";

import { postAuthAuthorizationFlowAuthorizeValidation } from "@/api";
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

  return (
    <CenteredCard
      title="MyECL"
      description="Portail de connexion pour les services proposé par Eclair"
    >
      <Form {...form}>
        {/* We can't use redirection since it will trigger CORS error, thus we are using the form */}
        <form
          method="POST"
          action={`${process.env.NEXT_PUBLIC_OVERRIDE_HYPERION_URL}/auth/authorization-flow/authorize-validation`}
        >
          <div className="grid gap-4">
            <CustomFormField
              form={form}
              name="email"
              label="Email"
              render={(field) => (
                <Input placeholder="inscription@raid.fr" required {...field} />
              )}
            />
            <CustomFormField
              form={form}
              name="password"
              label="Mot de passe"
              render={(field) => <PasswordInput required {...field} />}
            />
            <LoadingButton
              type="submit"
              className="w-full mt-2"
              label="Se connecter"
              isLoading={false}
            />
            <div className="flex flex-row justify-between">
              <Button variant="link">
                <Link
                  href="/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Créer un compte
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/recover" target="_blank" rel="noopener noreferrer">
                  Mot de passe oublié ?
                </Link>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CenteredCard>
  );
};

export default Login;
