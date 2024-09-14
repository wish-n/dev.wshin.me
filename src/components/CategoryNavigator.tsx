"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SCH_PARAM_CATEGORY } from "@/utils/constants";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { setSearchParam } from "@/utils/url";

export default function CategoryNavigator(props: CategoryNavigatorProps) {
  const router = useRouter();
  const searchParam = useSearchParams();

  // 현재 선택된 카테고리
  const selectedCategory = getSelectedCategory(searchParam);

  return (
    <ul className="mb-10 flex flex-row flex-wrap text-sm leading-loose text-neutral-500 [&>li]:mr-5 [&>li]:font-medium">
      <li>
        <button
          onClick={() => setSelectedCategory(router, null)}
          className={selectedCategory ? "" : "text-black"}
        >
          전체
        </button>
      </li>
      {props.categories?.map(category => (
        <li key={category}>
          <button
            onClick={() => setSelectedCategory(router, category)}
            className={category === selectedCategory ? "text-black" : ""}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
}

interface CategoryNavigatorProps {
  categories?: string[];
}

function getSelectedCategory(searchParams: URLSearchParams): string | null {
  return searchParams.get(SCH_PARAM_CATEGORY);
}

function setSelectedCategory(router: AppRouterInstance, categoryToSelect: string | null): void {
  setSearchParam(router, SCH_PARAM_CATEGORY, categoryToSelect);
}
