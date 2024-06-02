"use client";

import { BodyAuthorizeValidationAuthAuthorizationFlowAuthorizeValidationPost } from "@/api/hyperionSchemas";
import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as React from "react";
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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // useEffect(() => {
  //   form.setError("email", {
  //     type: "manual",
  //     message: isError ? "Identifiants incorrects" : "",
  //   });
  //   form.setError("password", {
  //     type: "manual",
  //     message: isError ? "Identifiants incorrects" : "",
  //   });
  //   form.reset({ ...form.getValues(), password: "" });
  // }, [form, isError]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const urlParams = new URLSearchParams(window.location.search);
    const client_id = urlParams.get("client_id");
    const response_type = urlParams.get("response_type");
    const redirect_uri = urlParams.get("redirect_uri");
    const scope = urlParams.get("scope");
    const state = urlParams.get("state");
    const nonce = urlParams.get("nonce");
    const code_challenge = urlParams.get("code_challenge");
    const code_challenge_method = urlParams.get("code_challenge_method");

    console.log(process.env.NEXT_PUBLIC_OVERRIDE_HYPERION_URL);

    if (
      !client_id ||
      !response_type ||
      !redirect_uri ||
      !scope ||
      !state ||
      !nonce
    ) {
      console.error("Missing parameters");
      return;
    }

    const body: BodyAuthorizeValidationAuthAuthorizationFlowAuthorizeValidationPost =
      {
        client_id: client_id,
        response_type: response_type,
        email: values.email,
        password: values.password,
        redirect_uri: redirect_uri,
        scope: scope,
        state: state,
        nonce: nonce,
      };
    // Only for PKCE, if the code_challenge is not present, we don't send it
    if (code_challenge) {
      body.code_challenge = code_challenge;
    }
    if (code_challenge_method) {
      body.code_challenge_method = code_challenge_method;
    }
    authenticate(body, () => {
      // redirect to the redirect_uri
      console.log("Success");
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
