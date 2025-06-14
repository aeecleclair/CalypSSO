"use client";

import {
  getPrivacy,
  getTermsAndConditions,
  getSupport,
  getMyeclpayTermsOfService,
} from "@/api";
import { CenteredCard } from "@/components/custom/CenteredCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RequestResult } from "@hey-api/client-fetch";
import { useRouter, useSearchParams } from "next/navigation";
import Markdown from "react-markdown";

const assets: Record<string, () => RequestResult> = {
  privacy: getPrivacy,
  terms_and_conditions: getTermsAndConditions,
  myeclpay_terms_of_service: getMyeclpayTermsOfService,
  support: getSupport,
};

const assetPage = async () => {
  const searchParams = useSearchParams();
  const path = searchParams.get("path");
  const router = useRouter();
  if (!path || !(path in assets)) {
    router.push(encodeURI(`/message?type=missing_query_param`));
    return;
  }
  const text = await assets[path!]().then((result) => result.data);

  return (
    typeof text === "string" && (
      <CenteredCard title="Document" description="Consultez son contenu">
        <ScrollArea className="rounded-md bg-background h-[62vh]">
          <article className="mx-3 text-justify">
            <Markdown>{text}</Markdown>
          </article>
        </ScrollArea>
      </CenteredCard>
    )
  );
};

export default assetPage;
