"use client";

import { SuspenseEmbed } from "./SuspenseEmbed";
import { useSearchParams } from "next/navigation";

interface SuspenseConditionalProps {
  showComponentParam: string;
  children: React.ReactNode;
}

const SuspenseConditionalContent = ({
  showComponentParam,
  children,
}: SuspenseConditionalProps) => {
  const searchParams = useSearchParams();
  const showComponent = searchParams.get(showComponentParam) === "true";

  return showComponent && children;
};

export const SuspenseConditional = ({
  children,
  showComponentParam,
}: SuspenseConditionalProps) => {
  return (
    <SuspenseEmbed>
      <SuspenseConditionalContent showComponentParam={showComponentParam}>
        {children}
      </SuspenseConditionalContent>
    </SuspenseEmbed>
  );
};
