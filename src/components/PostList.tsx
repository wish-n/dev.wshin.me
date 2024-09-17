import { Post } from "@/models/post";
import { defaultDateFormatter } from "@/utils/date";

export default function PostList(props: PostListProps) {
  return <ul>{props.posts.map(postListItem)}</ul>;
}

interface PostListProps {
  posts: Post[];
}

function postListItem(post: Post) {
  return (
    <li className="mb-12" key={post.slug}>
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
    </li>
  );
}
