import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Skeleton } from "../ui/skeleton";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

interface LoginCustomFormFieldProps {
  form: UseFormReturn<any, any, FieldValues | undefined>; // eslint-disable-line @typescript-eslint/no-explicit-any
  label: string;
  name: string;
  render: (
    field: ControllerRenderProps<FieldValues, string>,
  ) => React.ReactNode;
  displayError?: boolean;
}

const LoginCustomFormFieldInternal = ({
  form,
  label,
  name,
  render,
  displayError,
}: LoginCustomFormFieldProps) => {
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
    <Suspense
      fallback={
        <>
          <Skeleton className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" />
          <Skeleton
            className={`flex h-10 w-full border-none bg-background rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent 
            file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-2
            focus-visible:outline-hidden focus-visible:ring-2  
            disabled:cursor-not-allowed disabled:opacity-50
            dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
            group-hover/input:shadow-none transition duration-400
            `}
          />
        </>
      }
    >
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
    </Suspense>
  );
};

export const LoginCustomFormField = ({
  ...props
}: LoginCustomFormFieldProps) => {
  return (
    <Suspense
      fallback={
        <>
          <Skeleton className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" />
          <Skeleton
            className={`flex h-10 w-full border-none bg-background rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent 
            file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-2
            focus-visible:outline-hidden focus-visible:ring-2  
            disabled:cursor-not-allowed disabled:opacity-50
            dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
            group-hover/input:shadow-none transition duration-400
            `}
          />
        </>
      }
    >
      <LoginCustomFormFieldInternal {...props} />
    </Suspense>
  );
};
