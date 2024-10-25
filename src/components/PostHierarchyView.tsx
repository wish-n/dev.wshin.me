import { Post } from "@/services/post.model";
import Link from "next/link";

export default function PostHierarchyView(props: PostHierarchyViewProps) {
  const { parentPost, childPosts } = props;
  const parentPostExists = !!parentPost;
  const childPostsExist = childPosts.length > 0;

  if (!parentPostExists && !childPostsExist) {
    return <></>;
  }

  return (
    <div className="mt-5 divide-y-2 divide-dotted divide-black/30 rounded-xl bg-black/[.03] p-5 dark:divide-white/50 dark:bg-white/[.03]">
      {parentPostExists && (
        <div className={childPostsExist ? "pb-5" : ""}>
          <Link href={`/posts/${parentPost.urlPath}`}>
            <p className="mb-2 font-medium">상위 포스트로 이동</p>
            <p className="text-sm text-neutral-500">{parentPost.title}</p>
          </Link>
        </div>
      )}
      {childPostsExist && (
        <div className={parentPostExists ? "pt-5" : ""}>
          <p className="mb-2 font-medium">하위 포스트</p>
          <ul className="list-disc">
            {childPosts.map(post => (
              <li key={post.urlPath} className="my-0.5 ml-4">
                <Link href={`/posts/${post.urlPath}`} className="text-sm text-neutral-500">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface PostHierarchyViewProps {
  parentPost?: Post;
  childPosts: Post[];
}
