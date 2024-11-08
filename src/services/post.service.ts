import { Post } from "@/services/post.model";
import { convertMdToHtml, findMdFiles, getIdFromFilePath, parseMdFile } from "@/utils/markdown";
import config from "@/config";

class PostService {
  private readonly contents: readonly Post[];

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
          disableComments: parsed.frontMatter.disableComments,
          bodyHtml: convertMdToHtml(parsed.bodyMd),
        } as Post;
      })
      .filter(post => !post.draft);
  }

  get(id: string): Post | undefined {
    return this.contents.find(content => content.id === id);
  }

  getAll(): Post[] {
    return this.sortByDateDesc(this.contents);
  }

  /**
   * 작성일시 최신순으로 정렬하여 반환
   */
  private sortByDateDesc(contents: readonly Post[]): Post[] {
    return contents.toSorted((postA, postB) => postB.date.getTime() - postA.date.getTime());
  }
}

const Posts = new PostService(config.postRootDirectoryPath);
export default Posts;
