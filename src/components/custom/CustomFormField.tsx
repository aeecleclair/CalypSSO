import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface CustomFormFieldProps {
  form: any;
  label: string;
  name: string;
  render: (
    field: ControllerRenderProps<FieldValues, string>,
  ) => React.ReactNode;
}

export const CustomFormField = ({
  form,
  label,
  name,
  render,
}: CustomFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>{render(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
