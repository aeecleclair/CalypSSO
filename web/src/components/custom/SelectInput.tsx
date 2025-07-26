import { MotionField } from "./MotionField";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import React from "react";


export const CustomSelectTrigger = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  ref?: React.Ref<HTMLButtonElement>;
}) => (
  <MotionField>
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "duration-400 flex h-10 w-full items-center justify-between rounded-md border border-none border-input bg-background px-3 py-2 text-sm ring-offset-background transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] [&>span]:line-clamp-1",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  </MotionField>
);
CustomSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;