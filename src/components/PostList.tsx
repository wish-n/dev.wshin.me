import { defaultDateFormatter } from "@/utils/date";
import PostsNotFound from "@/components/PostsNotFound";
import { Post } from "@/services/post.model";
import Link from "next/link";

export default function PostList(props: PostListProps) {
  return <ul>{props.posts.length > 0 ? props.posts.map(postListItem) : <PostsNotFound />}</ul>;
}

interface PostListProps {
  posts: Post[];
}

function postListItem(post: Post) {
  return (
    <li className="mb-7" key={post.id}>
      <Link href={`/posts/${post.id}`}>
        <h2 className="text-lg font-medium">{post.title}</h2>
        <p className="text-sm text-neutral-500">{defaultDateFormatter(post.date)}</p>
      </Link>
    </li>
  );
}
