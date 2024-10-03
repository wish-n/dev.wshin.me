/**
 * 마크다운 Front Matter
 */
export interface MdContentFrontMatter {
  /**
   * 제목
   */
  title: string;
  /**
   * 작성일시
   */
  date: Date;
  /**
   * Draft 여부
   */
  draft?: boolean;
}

/**
 * 마크다운 메타데이터
 */
export interface MdContentMeta extends MdContentFrontMatter {
  /**
   * 마크다운 콘텐츠 ID
   */
  id: string;
}

/**
 * 마크다운 콘텐츠 데이터 모델
 */
export interface MdContent extends MdContentMeta {
  /**
   * HTML 포맷의 본문
   */
  bodyHtml: string;
}
