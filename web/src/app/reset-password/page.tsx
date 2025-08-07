"use client";

import { postUsersResetPassword } from "@/api";
import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PasswordInputWithStrength } from "@/components/custom/PasswordInputWithStrength";
import { SuspenseHiddenField } from "@/components/custom/SuspenseHiddenField";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zPassword } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    activation_code: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "Veuillez renseigner le code d'activation"
          : undefined,
    }),
    password: zPassword,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
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
    } catch (e) {
      setIsLoading(false);
      toast({
        title: "Erreur",
        description: `${e}`,
        variant: "destructive",
      });
    }
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
              render={(field) => {
                return <PasswordInputWithStrength autoFocus {...field} />;
              }}
            />
            <LoadingButton
              type="submit"
              className="mt-2 w-full"
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
