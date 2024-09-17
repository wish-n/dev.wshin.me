import Posts from "@/services/post.service";
import { notFound } from "next/navigation";
import { defaultDateFormatter } from "@/utils/date";

export default function PostPage({ params }: { params: PostPageStaticParams }) {
  const post = Posts.get(params.id) ?? notFound();

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="mt-2 text-sm font-medium text-neutral-500">
          {defaultDateFormatter(post.date)}
        </p>
      </div>
      <div
        className="prose mt-5 overflow-x-scroll break-words"
        dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
      />
    </div>
  );
}
interface PostPageStaticParams {
  id: string;
}

export async function generateStaticParams(): Promise<PostPageStaticParams[]> {
  return Posts.getAll().map(post => ({ id: post.id }));
}
