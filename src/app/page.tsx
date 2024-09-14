import CategoryNavigator from "@/components/CategoryNavigator";
import { getAllCategories, getAllPosts } from "@/services/post.service";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div>
      <CategoryNavigator categories={getAllCategories()} />
      <PostList posts={getAllPosts()} />
    </div>
  );
}
