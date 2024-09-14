"use client";

import CategoryNavigator from "@/components/CategoryNavigator";
import { getAllCategories, getAllPosts } from "@/services/post.service";
import PostList from "@/components/PostList";
import { useSearchParams } from "next/navigation";
import { SCH_PARAM_CATEGORY } from "@/utils/constants";

export default function Home() {
  const searchParam = useSearchParams();
  const selectedCategory = getSelectedCategory(searchParam);

  return (
    <div>
      <CategoryNavigator categories={getAllCategories()} selectedCategory={selectedCategory} />
      <PostList posts={getAllPosts({ category: selectedCategory })} />
    </div>
  );
}

function getSelectedCategory(searchParams: URLSearchParams): string | null {
  return searchParams.get(SCH_PARAM_CATEGORY);
}
