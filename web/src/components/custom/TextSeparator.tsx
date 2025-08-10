"use client";

import { Separator } from "../ui/separator";
import * as React from "react";

export type TextSeparatorProps = {
  text: string;
};

const TextSeparator = ({ text }: TextSeparatorProps) => (
  <div className="flex items-center gap-2">
    <Separator className="bg-border h-px w-full flex-1" />
    <span className="text-muted-foreground text-xs uppercase">{text}</span>
    <Separator className="bg-border h-px w-full flex-1" />
  </div>
);
TextSeparator.displayName = "TextSeparator";

export { TextSeparator };
