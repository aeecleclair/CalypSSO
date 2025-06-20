"use client";

import {
  getPrivacy,
  getTermsAndConditions,
  getSupport,
  getMyeclpayTermsOfService,
} from "@/api";
import { CenteredCard } from "@/components/custom/CenteredCard";
import { MotionField } from "@/components/custom/MotionField";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RequestResult } from "@hey-api/client-fetch";
import { notFound, useSearchParams } from "next/navigation";
import * as React from "react";
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

  return (
    <article
      className="prose lg:prose-lg
        prose-p:text-justify prose-p:leading-6 prose-p:my-4
        prose-ul:list-outside prose-ul:pl-4 prose-ul:my-0
        prose-li:my-0 prose-li:pl-0
        prose-headings:font-semibold prose-headings:my-4
        prose-h2:text-2xl prose-h1:text-4xl
        marker:text-foreground marker:mx-0
        max-w-none mx-3 
      "
    >
      <Markdown>{text}</Markdown>
    </article>
  );
};

const AssetPage = () => {
  return (
    <CenteredCard title="Document" description="Consultez son contenu">
      <MotionField radius={400}>
        <ScrollArea className="rounded-md bg-background h-[62vh]">
          <Suspense>
            <AssetPageContent />
          </Suspense>
        </ScrollArea>
      </MotionField>
    </CenteredCard>
  );
};

export default AssetPage;
