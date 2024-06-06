"use client";

import { toast } from "@/components/ui/use-toast";
import { createClient, client } from "@hey-api/client-fetch";

export default function Providers({ children }: { children: React.ReactNode }) {
  createClient({
    baseUrl:
      process.env.NEXT_PUBLIC_OVERRIDE_HYPERION_URL ||
      (typeof window !== "undefined" ? window?.location.origin : ""),
  });

  return children;
}
