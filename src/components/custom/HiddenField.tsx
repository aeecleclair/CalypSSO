"use client";

import { FormField } from "../ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface HiddenFieldProps {
  form: UseFormReturn<any, any, FieldValues | undefined>; // eslint-disable-line @typescript-eslint/no-explicit-any
  queryParam: string;
  name: string;
  optional?: boolean;
}

export const HiddenField = ({
  form,
  queryParam,
  name,
  // optional = false,
}: HiddenFieldProps) => {
  const searchParams = useSearchParams();
  const value = searchParams.get(queryParam);

  // const router = useRouter();

  // if (!optional && !value) {
  //   router.push(
  //     encodeURI(`/error?message=Url invalide : ${queryParam} manquant`),
  //   );
  // }

  form.setValue(name, value);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => <input type="hidden" {...field} />}
    />
  );
};
