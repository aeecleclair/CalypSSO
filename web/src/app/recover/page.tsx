"use client";

import { postUsersRecover } from "@/api/services.gen";
import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Input } from "@/components/custom/input";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

const RecoverPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    email: z.email({
      error: (issue) =>
        issue.input === undefined
          ? "Veuillez renseigner votre adresse email"
          : undefined,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await postUsersRecover({
        body: {
          email: values.email,
        },
      });
      setIsLoading(false);
      if (response.response.status < 300) {
        router.push("/recover/success");
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
      title={"Réinitialiser le mot de passe"}
      description={"Entrez votre email pour commencer"}
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
              type="submit"
              className="mt-2 w-full"
              label={"Recevoir le code de réinitialisation"}
              isLoading={isLoading}
            />
          </div>
        </form>
      </Form>
    </CenteredCard>
  );
};

export default RecoverPage;
