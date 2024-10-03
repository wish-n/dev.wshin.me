/**
 * 마크다운 Front Matter
 */
export interface MarkdownContentFrontMatter {
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
export interface MarkdownContentMeta extends MarkdownContentFrontMatter {
  /**
   * 마크다운 콘텐츠 ID
   */
  id: string;
}

/**
 * 마크다운 콘텐츠 데이터 모델
 */
export interface MarkdownContent extends MarkdownContentMeta {
  /**
   * HTML 포맷의 본문
   */
  bodyHtml: string;
}

export interface Post extends MarkdownContent {}
export interface Page extends MarkdownContent {}
