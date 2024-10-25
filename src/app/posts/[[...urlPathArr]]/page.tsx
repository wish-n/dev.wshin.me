import Posts from "@/services/post.service";
import { notFound } from "next/navigation";
import { defaultDateFormatter } from "@/utils/date";
import GiscusComment from "@/components/GiscusComment";
import PostHierarchyView from "@/components/PostHierarchyView";

export default function PostPage({ params }: { params: PostPageStaticParams }) {
  const urlPath = getUrlPath(params.urlPathArr);
  const { title, date, disableComments, bodyHtml } = Posts.get(urlPath) ?? notFound();

  const childPosts = Posts.getChildPostsOf(urlPath);
  const parentPost = Posts.getParentPostOf(urlPath);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-sm font-medium text-neutral-500">{defaultDateFormatter(date)}</p>
      </div>
      <PostHierarchyView parentPost={parentPost} childPosts={childPosts} />
      <div
        className="prose mt-10 overflow-x-scroll break-words dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
      {disableComments !== true && <GiscusComment />}
    </div>
  );
}

interface PostPageStaticParams {
  urlPathArr: string[];
}

export async function generateStaticParams(): Promise<PostPageStaticParams[]> {
  return Posts.getAll().map(({ urlPath }) => ({ urlPathArr: getUrlPathArr(urlPath) }));
}

function getUrlPathArr(urlPath: string): string[] {
  return urlPath.split("/");
}

function getUrlPath(urlPathArr: string[]): string {
  return urlPathArr.join("/");
}
