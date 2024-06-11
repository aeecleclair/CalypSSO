"use client";

import { postUsersResetPassword } from "@/api";
import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { SuspenseHiddenField } from "@/components/custom/SuspenseHiddenField";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zPassword } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    activation_code: z
      .string({
        required_error: "Veuillez renseigner le code d'activation",
      })
      .min(8, {
        message: "Le code d'activation doit contenir 8 caractères",
      }),
    password: zPassword,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await postUsersResetPassword({
      body: {
        reset_token: values.activation_code,
        new_password: values.password,
      },
    });
    setIsLoading(false);
    if (response.response.status < 300) {
      router.push("/reset-password/success");
      return;
    }
    toast({
      title: "Erreur",
      description: (response.error as { detail: string }).detail,
      variant: "destructive",
    });
  }

  return (
    <CenteredCard
      title="Réinitialiser le mot de passe"
      description="Entrez votre nouveau mot de passe"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <SuspenseHiddenField
              form={form}
              name="activation_code"
              queryParam="reset_token"
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
              label="Réinitialiser le mot de passe"
              isLoading={isLoading}
            />
          </div>
        </form>
      </Form>
    </CenteredCard>
  );
};

export default ResetPasswordPage;
