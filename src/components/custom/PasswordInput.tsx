"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import zxcvbn from "zxcvbn";

function color(strength: number, index: number, length: number): string {
  if (!length) return "bg-gray-200";
  if (strength < index) return "bg-gray-200";
  return [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-400",
    "bg-green-400",
  ][strength];
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
      <div>
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
              <HiEyeOff
                className="h-4 w-4"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
        </div>

        <div className="grid grid-flow-col justify-stretch gap-4 mt-4 px-1">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`px-1 h-2 rounded-xl transition-colors ${color(zxcvbn(props.value?.toString() || "").score, index, props.value?.toString().length || 0)}`}
            />
          ))}
        </div>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
