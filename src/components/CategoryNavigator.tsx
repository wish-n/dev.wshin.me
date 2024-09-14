"use client";

import { useRouter } from "next/navigation";
import { SCH_PARAM_CATEGORY } from "@/utils/constants";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { setSearchParam } from "@/utils/url";

export default function CategoryNavigator(props: CategoryNavigatorProps) {
  const router = useRouter();

  return (
    <ul className="mb-10 flex flex-row flex-wrap text-sm leading-loose text-neutral-500 [&>li]:mr-5 [&>li]:font-medium">
      <li>
        <button
          onClick={() => setSelectedCategory(router, null)}
          className={props.selectedCategory ? "" : "text-black"}
        >
          전체
        </button>
      </li>
      {props.categories?.map(category => (
        <li key={category}>
          <button
            onClick={() => setSelectedCategory(router, category)}
            className={category === props.selectedCategory ? "text-black" : ""}
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
  selectedCategory: string | null;
}

function setSelectedCategory(router: AppRouterInstance, categoryToSelect: string | null): void {
  setSearchParam(router, SCH_PARAM_CATEGORY, categoryToSelect);
}
