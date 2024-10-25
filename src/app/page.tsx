import Posts from "@/services/post.service";
import PostList from "@/components/PostList";

export default function HomePage() {
  return (
    <div>
      <PostList posts={Posts.getListablePosts()} />
    </div>
  );
}
