"use client";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const HYPERION = "http://localhost:8000";

const formSchema = z.object({
  newPassword: z.string().min(6, {
    message: "Votre mot de passe doit avoir au moins 6 caractères",
  }),
});

export function ResetPasswordForm() {
  let isRegisterLoading = false;

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
    },
  });
  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    isRegisterLoading = true;

    fetch(HYPERION + "/users/reset-password", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        reset_token: token,
        new_password: values.newPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("toasting");
          response.json().then((data) =>
            toast({
              title: "Échec de la modification",
              description: data.detail,
              variant: "destructive",
            }),
          );
        } else {
          toast({
            title: "Mot de passe modifié avec succès",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Échec de la requête",
          description: error,
          variant: "destructive",
        });
      })
      .finally(() => (isRegisterLoading = true));
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

const Reset = () => {
  return <h1> Test </h1>;
};

export default ResetPasswordForm;
