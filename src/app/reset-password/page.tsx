"use client";

import { HiddenField } from "@/components/custom/HiddenField";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const HYPERION = "http://localhost:8000";

const formSchema = z.object({
  newPassword: z.string().min(6, {
    message: "Votre mot de passe doit avoir au moins 6 caractères",
  }),
  code: z.string().optional(),
});

export const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);

    setIsRegisterLoading(true);

    const variables = await fetch("/calypsso/variables.json", {
      method: "GET",
    }).then((response) => response.json());

    fetch(variables.hyperion + "users/reset-password", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        reset_token: values.code,
        new_password: values.newPassword,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          toast({
            title: "Échec de la modification",
            description: data.detail,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Mot de passe modifié avec succès",
          });
        }
      })
      .catch((error) => {
        console.error("Échec de la requête", error);
        toast({
          title: "Échec de la requête",
          description: error.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsRegisterLoading(false);
        form.reset();
      });
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">MyECL</CardTitle>
        <CardDescription>Réinitialisez votre mot de passe</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nouveau mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mot de passe"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <HiddenField form={form} name="code" queryParam="token" />
            <LoadingButton
              type="submit"
              isLoading={isRegisterLoading}
              label="Réinitialiser"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
