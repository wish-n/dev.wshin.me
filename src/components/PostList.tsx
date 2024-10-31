import { defaultDateFormatter } from "@/utils/date";
import { Post } from "@/services/post.model";
import Link from "next/link";

export default function PostList({ posts }: PostListProps) {
  if (posts.length < 1) {
    return <PostsNotFound />;
  }

  return (
    <ul>
      {posts.map(post => (
        <PostListItem key={post.id} post={post} />
      ))}
    </ul>
  );
}

interface PostListProps {
  posts: Post[];
}

function PostListItem({ post }: { post: Post }) {
  return (
    <li className="mb-7" key={post.id}>
      <Link href={`/posts/${post.id}`}>
        <h2 className="text-lg font-medium">{post.title}</h2>
        <p className="text-sm text-neutral-500">{defaultDateFormatter(post.date)}</p>
      </Link>
    </li>
  );
}

function PostsNotFound() {
  return <p className="text-center">Posts Not Found</p>;
}
