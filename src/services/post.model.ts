/**
 * 마크다운 Front Matter
 */
interface MarkdownContentFrontMatter {
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
  /**
   * 코멘트 기능 비노출 여부
   */
  disableComments?: boolean;
}

/**
 * 마크다운 메타데이터
 */
interface MarkdownContentMeta extends MarkdownContentFrontMatter {
  /**
   * 마크다운 콘텐츠 ID
   */
  id: string;
}

/**
 * 마크다운 콘텐츠 데이터 모델
 */
interface MarkdownContent extends MarkdownContentMeta {
  /**
   * HTML 포맷의 본문
   */
  bodyHtml: string;
}

export interface Post extends MarkdownContent {}
