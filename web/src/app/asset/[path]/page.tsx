import { CenteredCard } from "@/components/custom/CenteredCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

const assets = [
  "privacy",
  "terms-and-conditions",
  "myeclpay-terms-of-service",
  "support",
];

export function generateStaticParams() {
  return assets.map((p) => ({ path: p }));
}

const assetPage = async (props: { params: { path: string } }) => {
  const { path } = props.params;
  if (!assets.includes(path)) notFound(); // https://github.com/vercel/next.js/issues/56253
  const text = await fetch(
    (process.env.NEXT_PUBLIC_OVERRIDE_HYPERION_URL ??
      "https://hyperion.myecl.fr") +
      "/" +
      path,
  ).then((data) => data.text());
  return (
    <CenteredCard title="Document" description="Consultez son contenu">
      <ScrollArea className="rounded-md bg-background h-[62vh]">
        <article className="mx-3">
          <Markdown>{text}</Markdown>
        </article>
      </ScrollArea>
    </CenteredCard>
  );
};

export default assetPage;
