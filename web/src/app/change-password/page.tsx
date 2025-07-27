"use client";

import { postUsersChangePassword } from "@/api";
import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { PasswordInputWithStrength } from "@/components/custom/PasswordInputWithStrength";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zPassword } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v4";

const ChangePasswordContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    email: z.string({
      required_error: "Veuillez renseigner l'adresse email",
    }),
    old_password: z.string({
      required_error: "Veuillez renseigner votre mot de passe actuel",
    }),
    new_password: zPassword,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: email ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await postUsersChangePassword({
        body: {
          email: values.email,
          old_password: values.old_password,
          new_password: values.new_password,
        },
      });
      setIsLoading(false);
      if (response.response.status < 300) {
        router.push("/change-password/success");
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
      title="Modifier le mot de passe"
      description="Entrez votre ancien puis nouveau mot de passe"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <CustomFormField
              form={form}
              name="email"
              label="Email"
              render={(field) => (
                <Input placeholder="prenom.nom@etu.ec-lyon.fr" {...field} />
              )}
            />
            <CustomFormField
              form={form}
              name="old_password"
              label="Ancien mot de passe"
              render={(field) => {
                return <PasswordInput autoFocus {...field} />;
              }}
            />
            <CustomFormField
              form={form}
              name="new_password"
              label="Nouveau mot de passe"
              render={(field) => {
                return <PasswordInputWithStrength {...field} />;
              }}
            />
            <LoadingButton
              type="submit"
              className="mt-2 w-full"
              label="Modifier le mot de passe"
              isLoading={isLoading}
            />
          </div>
        </form>
      </Form>
    </CenteredCard>
  );
};

const ChangePasswordPage = () => {
  return (
    <Suspense>
      <ChangePasswordContent />
    </Suspense>
  );
};

export default ChangePasswordPage;
