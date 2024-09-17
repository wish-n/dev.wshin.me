import { getAllPosts } from "@/services/post.service";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div>
      <PostList posts={getAllPosts()} />
    </div>
  );
}
