"use client";

import { FormField } from "../ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
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
  optional = false,
}: HiddenFieldProps) => {
  const searchParams = useSearchParams();
  const value = searchParams.get(queryParam);
  const router = useRouter();

  useEffect(() => {
    if (!optional && !value) {
      console.error(`Missing required query parameter: ${queryParam}`);
      router.push(encodeURI(`/message?type=missing_query_param`));
    } else if (value) {
      form.setValue(name, value);
    }
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => <input type="hidden" {...field} />}
    />
  );
};
