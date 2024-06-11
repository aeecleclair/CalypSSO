import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

interface CustomFormFieldProps {
  form: UseFormReturn<any, any, FieldValues | undefined>; // eslint-disable-line @typescript-eslint/no-explicit-any
  label: string;
  name: string;
  render: (
    field: ControllerRenderProps<FieldValues, string>,
  ) => React.ReactNode;
  displayError?: boolean;
}

export const CustomFormField = ({
  form,
  label,
  name,
  render,
  displayError,
}: CustomFormFieldProps) => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const credentialsError = !!searchParams.get("credentials_error");
    if (credentialsError && form.watch(name) === undefined) {
      form.setError(name, {
        message: "Combinaison email / mot de passe invalide",
      });
    }
  }, [displayError, form, name, searchParams]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>{render(field)}</FormControl>
          {displayError && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
