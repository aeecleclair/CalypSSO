import { Suspense } from "react";

interface SuspenseEmbedProps {
  children: React.ReactNode;
}

export const SuspenseEmbed = ({ children }: SuspenseEmbedProps) => {
  return <Suspense fallback={<></>}>{children}</Suspense>;
};
