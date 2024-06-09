"use client";

import { FormField } from "../ui/form";
import { useSearchParams } from "next/navigation";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface HiddenFieldProps {
  form: UseFormReturn<any, any, FieldValues | undefined>; // eslint-disable-line @typescript-eslint/no-explicit-any
  queryParam: string;
  name: string;
}

export const HiddenField = ({ form, queryParam, name }: HiddenFieldProps) => {
  const searchParams = useSearchParams();
  const token = searchParams.get(queryParam);
  form.setValue(name, token);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => <input type="hidden" {...field} />}
    />
  );
};
