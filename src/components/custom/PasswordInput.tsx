"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(className)}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400 hover:text-[hsl(var(--ring))]">
          {showPassword ? (
            <HiEye className="h-4 w-4" onClick={togglePasswordVisibility} />
          ) : (
            <HiEyeOff className="h-4 w-4" onClick={togglePasswordVisibility} />
          )}
        </div>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
