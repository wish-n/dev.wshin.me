import { notFound } from "next/navigation";
import GiscusComment from "@/components/GiscusComment";
import Pages from "@/services/page.service";

export default function MarkdownPage({ params }: { params: MarkdownPageStaticParams }) {
  const { title, date, disableComments, bodyHtml } = Pages.get(params.pageId) ?? notFound();

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div
        className="prose mt-10 overflow-x-scroll break-words dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
      {disableComments !== true && <GiscusComment />}
    </div>
  );
}

interface MarkdownPageStaticParams {
  pageId: string;
}

export async function generateStaticParams(): Promise<MarkdownPageStaticParams[]> {
  return Pages.getAll().map(({ id }) => ({ pageId: id }));
}
