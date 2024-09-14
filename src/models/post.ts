/**
 * 포스트 Front Matter
 */
export interface PostFrontMatter {
  /**
   * 포스트 제목
   */
  title: string;
  /**
   * 작성일시
   */
  date: Date;
  /**
   * 카테고리
   */
  category?: string;
  /**
   * Draft 여부
   */
  draft?: boolean;
}

/**
 * 포스트 메타데이터
 */
export interface PostMeta {
  slug: string;
  meta: PostFrontMatter;
}

/**
 * 포스트
 */
export interface Post extends PostMeta {
  /**
   * HTML 포맷의 포스트 본문
   */
  bodyHtml: string;
}
