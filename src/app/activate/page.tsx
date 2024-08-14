"use client";

import { FloorsType, postUsersActivate } from "@/api";
import { CenteredCard } from "@/components/custom/CenteredCard";
import { CustomFormField } from "@/components/custom/CustomFormField";
import { DatePicker } from "@/components/custom/DatePicker";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { PasswordInputWithStrength } from "@/components/custom/PasswordInputWithStrength";
import { PhoneCustomInput } from "@/components/custom/PhoneCustomInput";
import { CustomSelectTrigger } from "@/components/custom/SelectInput";
import { SuspenseConditional } from "@/components/custom/SuspenseConditional";
import { SuspenseHiddenField } from "@/components/custom/SuspenseHiddenField";
import { TextSeparator } from "@/components/custom/TextSeparator";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { zPassword } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { addYears, format } from "date-fns";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FloorTypes: Readonly<[string, ...string[]]> = [
  "Autre",
  "Adoma",
  "Exte",
  "T1",
  "T2",
  "T3",
  "T4",
  "T56",
  "U1",
  "U2",
  "U3",
  "U4",
  "U56",
  "V1",
  "V2",
  "V3",
  "V45",
  "V6",
  "X1",
  "X2",
  "X3",
  "X4",
  "X5",
  "X6",
];

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    activation_token: z.string({
      required_error: "Veuillez renseigner le code d'activation",
    }),
    firstname: z
      .string({
        required_error: "Veuillez renseigner votre prénom",
      })
      .min(1, {
        message: "Veuillez renseigner votre prénom",
      }),
    name: z
      .string({
        required_error: "Veuillez renseigner votre nom",
      })
      .min(1, {
        message: "Veuillez renseigner votre nom",
      }),
    password: zPassword,
    nickname: z
      .string()
      .min(1, {
        message: "Veuillez renseigner votre prénom",
      })
      .optional(),
    birthday: z.date().optional(),
    phone: z
      .string()
      .refine((value) => isValidPhoneNumber("+" + value), {
        message: "Veuillez renseigner un numéro valide",
      })
      .optional(), // phone
    floor: z.enum(FloorTypes).optional(),
    promo: z
      .string()
      .refine(
        (value) => {
          const parsedValue = parseInt(value);
          return !isNaN(parsedValue) && parsedValue >= 0;
        },
        { message: "Veuillez renseigner une promo valide" },
      )
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await postUsersActivate({
        body: {
          activation_token: values.activation_token,
          firstname: values.firstname,
          name: values.name,
          password: values.password,
          nickname: values.nickname,
          birthday: values.birthday
            ? format(values.birthday, "yyyy-MM-dd")
            : undefined,
          phone: values.phone,
          floor: values.floor as FloorsType | undefined | null,
          promo: values.promo ? parseInt(values.promo) : undefined,
        },
      });
      setIsLoading(false);
      if (response.response.status < 300) {
        router.push("/activate/success");
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
      title="Activer un compte"
      description="Entrez vos informations pour activer votre compte"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <SuspenseHiddenField
              form={form}
              name="activation_token"
              queryParam="activation_token"
            />
            <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <CustomFormField
                form={form}
                name="firstname"
                label="Prénom"
                neighborName="name"
                render={(field) => <Input {...field} />}
              />
              <CustomFormField
                form={form}
                name="name"
                label="Nom"
                neighborName="firstname"
                render={(field) => <Input {...field} />}
              />
            </div>

            <SuspenseConditional maskComponentParam="external">
              <CustomFormField
                form={form}
                name="nickname"
                label="Surnom"
                render={(field) => <Input {...field} />}
              />
              <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                <CustomFormField
                  form={form}
                  name="birthday"
                  label="Date de naissance"
                  neighborName="phone"
                  render={(field) => (
                    <DatePicker
                      date={field.value}
                      setDate={field.onChange}
                      defaultDate={field.value || addYears(new Date(), -21)}
                      {...field}
                    />
                  )}
                />
                {/* TODO: Add animation */}
                <CustomFormField
                  form={form}
                  name="phone"
                  label="Numéro de téléphone"
                  neighborName="birthday"
                  render={(field) => <PhoneCustomInput {...field} />}
                />
              </div>

              <TextSeparator text="Informations sur votre scolarité" />
              <div className="mt-2 grid grid-cols-1 gap-4  md:grid-cols-2">
                <CustomFormField
                  form={form}
                  name="promo"
                  label="Promotion"
                  neighborName="floor"
                  render={(field) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <CustomSelectTrigger>
                        {field.value
                          ? `Promo ${field.value}`
                          : "Séléctionner votre promo"}
                      </CustomSelectTrigger>
                      <SelectContent>
                        {[...Array(10)].map((_, index) => {
                          const year = (
                            new Date().getFullYear() - index
                          ).toString();
                          return (
                            <SelectItem key={index} value={year}>
                              Promo {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  )}
                />
                <CustomFormField
                  form={form}
                  name="floor"
                  label="Étage de votre résidence"
                  neighborName="promo"
                  render={(field) => (
                    <Select onValueChange={field.onChange}>
                      <CustomSelectTrigger>
                        <SelectValue placeholder="Choisissez votre étage" />
                      </CustomSelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {FloorTypes.map((floor) => (
                            <SelectItem key={floor} value={floor}>
                              {floor}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <TextSeparator text="Mot de passe" />
            </SuspenseConditional>
            <CustomFormField
              form={form}
              name="password"
              label="Mot de passe"
              render={(field) => <PasswordInputWithStrength {...field} />}
            />
            <LoadingButton
              type="submit"
              className="mt-2 w-full"
              label={"Créer le compte"}
              isLoading={isLoading}
            />
          </div>
        </form>
      </Form>
    </CenteredCard>
  );
};

export default RegisterPage;
