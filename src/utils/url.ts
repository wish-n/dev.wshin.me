import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * URL 쿼리 파라미터를 세팅한다.
 * @param router 라우터 객체
 * @param name 파라미터명
 * @param value 세팅될 값 (null인 경우, 해당 파라미터를 삭제)
 */
export function setSearchParam(
  router: AppRouterInstance,
  name: string,
  value: string | null,
): void {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;

  if (!!value) searchParams.set(name, value);
  else searchParams.delete(name);

  url.search = searchParams.toString();
  router.push(url.toString());
}
