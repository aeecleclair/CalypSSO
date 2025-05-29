"use client";

import { postUsersCreate } from "@/api";
import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterContent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const acceptExternalUser =
    searchParams.get("external")?.toLocaleLowerCase() === "true";

  let emailField = z
    .string({
      required_error: "Veuillez renseigner votre adresse email",
    })
    .email({
      message: "Veuillez renseigner une adresse email valide",
    });

  if (!acceptExternalUser) {
    emailField = emailField.regex(
      new RegExp(
        /^[\w\-.]*@(((etu(-enise)?|enise)\.)?ec-lyon\.fr|centraliens-lyon\.net)$/,
      ),
      {
        message: "Veuillez utiliser une adresse email centralienne",
      },
    );
  }

  const formSchema = z.object({
    email: emailField,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await postUsersCreate({
        body: {
          email: values.email,
          accept_external: acceptExternalUser,
        },
      });
      setIsLoading(false);
      if (response.response.status < 300) {
        router.push("/register/success");
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
      title={"Créer un compte"}
      description={"Vous n'avez besoin que de votre email pour commencer"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <CustomFormField
              form={form}
              name="email"
              label="Email"
              render={(field) => (
                <Input
                  type="email"
                  autoFocus
                  placeholder="prenom.nom@etu.ec-lyon.fr"
                  {...field}
                />
              )}
            />
            <LoadingButton
              className="mt-2 w-full"
              type="submit"
              label="Commencer à créer le compte"
              isLoading={isLoading}
            />
          </div>
        </form>
      </Form>
    </CenteredCard>
  );
};

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
};

export default RegisterPage;
