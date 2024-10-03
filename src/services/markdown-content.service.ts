import { MarkdownContent } from "@/models/markdown-content";
import { convertMdToHtml, findMdFiles, getIdFromFilePath, parseMdFile } from "@/utils/markdown";

export default abstract class MarkdownContentService<T extends MarkdownContent> {
  /**
   * 콘텐츠 캐시
   */
  private readonly contents: readonly T[];

  constructor(rootDirPath: string) {
    // constructor 시점에 마크다운 파일들을 읽어 내부 필드에 캐싱
    // 빌드 이후에 변경될 일이 없는 데이터이기 때문
    this.contents = findMdFiles(rootDirPath)
      .map(filePath => {
        const id = getIdFromFilePath(filePath);
        const parsed = parseMdFile(filePath);

        return {
          id,
          title: parsed.frontMatter.title,
          date: new Date(parsed.frontMatter.date as string),
          draft: parsed.frontMatter.draft,
          bodyHtml: convertMdToHtml(parsed.bodyMd),
        } as T;
      })
      .filter(post => !post.draft);
  }

  /**
   * 아이디로 단일 조회
   * @param id 아이디
   */
  get(id: string): T | undefined {
    return this.contents.find(content => content.id === id);
  }

  /**
   * 모든 콘텐츠 조회 (작성일시 최신순)
   */
  getAll(): T[] {
    return MarkdownContentService.sortByDateDesc(this.contents);
  }

  /**
   * 작성일시 최신순으로 정렬하여 반환
   * @param contents 콘텐츠 목록
   */
  private static sortByDateDesc(contents: readonly T[]): T[] {
    return contents.toSorted((postA, postB) => postB.date.getTime() - postA.date.getTime());
  }
}
