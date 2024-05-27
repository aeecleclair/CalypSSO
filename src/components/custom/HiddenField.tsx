"use client";

import { useSearchParams } from "next/navigation";
import { FormField } from "../ui/form";
import { Input } from "../ui/input";

interface HiddenFieldProps {
  form: any;
  queryParam: string;
  name: string;
}

export const HiddenField = ({
  form,
  queryParam,
  name,
}: HiddenFieldProps) => {
  const searchParams = useSearchParams();
  const token = searchParams.get(queryParam);
  form.setValue(name, token);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => <Input type="hidden" {...field} />}
    />
  );
};