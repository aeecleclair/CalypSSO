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
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
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
  const radius = 300; // change this to increase the radius of the hover effect
  const [visible, setVisible] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <CenteredCard title="Document" description="Consultez son contenu">
      <motion.div
        style={{
          background: useMotionTemplate`
              radial-gradient(
                ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                hsl(var(--ring)),
                transparent 80%
              )
            `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <ScrollArea className="rounded-md bg-background h-[62vh]">
          <Suspense>
            <AssetPageContent />
          </Suspense>
        </ScrollArea>
      </motion.div>
    </CenteredCard>
  );
};

export default AssetPage;
