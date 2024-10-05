import Posts from "@/services/post.service";
import { notFound } from "next/navigation";
import { defaultDateFormatter } from "@/utils/date";
import GiscusComment from "@/components/GiscusComment";

export default function PostPage({ params }: { params: PostPageStaticParams }) {
  const { title, date, disableComments, bodyHtml } = Posts.get(params.id) ?? notFound();

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-sm font-medium text-neutral-500">{defaultDateFormatter(date)}</p>
      </div>
      <div
        className="prose mt-10 overflow-x-scroll break-words dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
      {disableComments !== true && <GiscusComment />}
    </div>
  );
}

interface PostPageStaticParams {
  id: string;
}

export async function generateStaticParams(): Promise<PostPageStaticParams[]> {
  return Posts.getAll().map(({ id }) => ({ id }));
}
