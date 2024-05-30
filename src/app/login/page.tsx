"use client";

import { BodyAuthorizeValidationAuthAuthorizationFlowAuthorizeValidationPost } from "@/api/hyperionSchemas";
import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { HiddenField } from "@/components/custom/HiddenField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const { authenticate, isLoading, isError } = useAuthenticate();

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
    client_id: z.string(),
    response_type: z.string(),
    redirect_uri: z.string(),
    scope: z.string(),
    state: z.string(),
    nonce: z.string(),
    code_challenge: z.string().optional(),
    code_challenge_method: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setError("email", {
      type: "manual",
      message: isError ? "Identifiants incorrects" : "",
    });
    form.setError("password", {
      type: "manual",
      message: isError ? "Identifiants incorrects" : "",
    });
    form.reset({ ...form.getValues(), password: "" });
  }, [form, isError]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const body: BodyAuthorizeValidationAuthAuthorizationFlowAuthorizeValidationPost =
      {
        client_id: values.client_id,
        response_type: values.response_type,
        email: values.email,
        password: values.password,
        redirect_uri: values.redirect_uri,
        scope: values.scope,
        state: values.state,
        nonce: values.nonce,
      };
    // Only for PKCE, if the code_challenge is not present, we don't send it
    if (values.code_challenge) {
      body.code_challenge = values.code_challenge;
    }
    if (values.code_challenge_method) {
      body.code_challenge_method = values.code_challenge_method;
    }
    authenticate(body, () => {
      // redirect to the redirect_uri
    });
  }

  return (
    <CenteredCard
      title="MyECL"
      description="Portail de connexion pour les services proposé par Eclair"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <HiddenField form={form} name="client_id" queryParam="client_id" />
            <HiddenField
              form={form}
              name="response_type"
              queryParam="response_type"
            />
            <HiddenField
              form={form}
              name="redirect_uri"
              queryParam="redirect_uri"
            />
            <HiddenField form={form} name="scope" queryParam="scope" />
            <HiddenField form={form} name="state" queryParam="state" />
            <HiddenField form={form} name="nonce" queryParam="nonce" />
            <HiddenField
              form={form}
              name="code_challenge"
              queryParam="code_challenge"
            />
            <HiddenField
              form={form}
              name="code_challenge_method"
              queryParam="code_challenge_method"
            />
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
              isLoading={isLoading}
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
