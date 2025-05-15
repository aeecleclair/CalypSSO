import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

interface CustomFormFieldProps {
  form: UseFormReturn<any, any, FieldValues | undefined>; // eslint-disable-line @typescript-eslint/no-explicit-any
  label: string;
  name: string;
  neighborName?: string;
  render: (
    field: ControllerRenderProps<FieldValues, string>,
  ) => React.ReactNode;
}

export const CustomFormField = ({
  form,
  label,
  name,
  neighborName,
  render,
}: CustomFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>{render(field)}</FormControl>
          {form.getFieldState(name).error ? (
            <FormMessage />
          ) : (
            <>
              {neighborName && form.getFieldState(neighborName).error && (
                <div className="h-5" />
              )}
            </>
          )}
        </FormItem>
      )}
    />
  );
};
