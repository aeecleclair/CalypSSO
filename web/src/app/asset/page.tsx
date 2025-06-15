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
import { notFound, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Markdown from "react-markdown";

const assets: Record<string, () => RequestResult> = {
  privacy: getPrivacy,
  terms_and_conditions: getTermsAndConditions,
  myeclpay_terms_of_service: getMyeclpayTermsOfService,
  support: getSupport,
};

const AssetPageContent = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get("path");
  if (!path || !(path in assets)) notFound();
  const [text, setText] = useState("");
  useEffect(() => {
    (async () => {
      const text2 = await assets[path]().then((result) => result.data);
      if (typeof text2 === "string") setText(text2);
    })();
  }, [path]);
  return <Markdown>{text}</Markdown>;
};

const AssetPage = () => {
  return (
    <CenteredCard title="Document" description="Consultez son contenu">
      <ScrollArea className="rounded-md bg-background h-[62vh]">
        <article className="mx-3 text-justify">
          <Suspense>
            <AssetPageContent />
          </Suspense>
        </article>
      </ScrollArea>
    </CenteredCard>
  );
};

export default AssetPage;
