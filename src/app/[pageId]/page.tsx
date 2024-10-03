import { notFound } from "next/navigation";
import { defaultDateFormatter } from "@/utils/date";
import GiscusComment from "@/components/GiscusComment";
import Pages from "@/services/page.service";

export default function MarkdownPage({ params }: { params: MarkdownPageStaticParams }) {
  const { title, date, bodyHtml } = Pages.get(params.pageId) ?? notFound();

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-sm font-medium text-neutral-500">{defaultDateFormatter(date)}</p>
      </div>
      <div
        className="prose mt-5 overflow-x-scroll break-words"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
      <div className="pt-24">
        <GiscusComment />
      </div>
    </div>
  );
}

interface MarkdownPageStaticParams {
  pageId: string;
}

export async function generateStaticParams(): Promise<MarkdownPageStaticParams[]> {
  return Pages.getAll().map(({ id }) => ({ pageId: id }));
}
