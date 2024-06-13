"use client";

import { SuspenseEmbed } from "./SuspenseEmbed";
import { useSearchParams } from "next/navigation";

interface SuspenseConditionalProps {
  maskComponentParam: string;
  children: React.ReactNode;
}

const SuspenseConditionalContent = ({
  maskComponentParam,
  children,
}: SuspenseConditionalProps) => {
  const searchParams = useSearchParams();
  const maskComponent =
    searchParams.get(maskComponentParam)?.toLocaleLowerCase() === "true";

  return !maskComponent && children;
};

export const SuspenseConditional = ({
  children,
  maskComponentParam,
}: SuspenseConditionalProps) => {
  return (
    <SuspenseEmbed>
      <SuspenseConditionalContent maskComponentParam={maskComponentParam}>
        {children}
      </SuspenseConditionalContent>
    </SuspenseEmbed>
  );
};
