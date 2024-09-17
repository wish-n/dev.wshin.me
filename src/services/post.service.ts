import { Post } from "@/models/post";
import { convertMdToHtml, findMdFiles, getIdFromFilePath, parseMdFile } from "@/utils/markdown";

class PostService {
  /**
   * 포스트 디렉터리 경로
   */
  private static readonly ROOT_DIR_POSTS = "contents/posts";

  /**
   * 포스트 캐시
   */
  private readonly posts: readonly Post[];

  constructor() {
    // constructor 시점에 마크다운 파일들을 읽어 내부 필드에 캐싱
    // 빌드 이후에 변경될 일이 없는 데이터이기 때문
    this.posts = findMdFiles(PostService.ROOT_DIR_POSTS)
      .map(filePath => {
        const postId = getIdFromFilePath(filePath);
        const parsed = parseMdFile(filePath);

        return {
          id: postId,
          title: parsed.frontMatter.title,
          date: new Date(parsed.frontMatter.date as string),
          draft: parsed.frontMatter.draft,
          bodyHtml: convertMdToHtml(parsed.bodyMd),
        } as Post;
      })
      .filter(post => !post.draft);
  }

  /**
   * 포스트 ID로 단일 조회
   * @param id 포스트 ID
   */
  get(id: string): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  /**
   * 모든 포스트 조회 (작성일시 최신순)
   */
  getAll(): Post[] {
    return PostService.sortByDateDesc(this.posts);
  }

  /**
   * 모든 포스트를 연도별 GROUP BY 형태로 조회
   * (연도 최신순, 연도 내 포스트들은 작성일시 최신순)
   */
  getAllGroupByYear(): { year: number; posts: Post[] }[] {
    const mapByYear = new Map<number, Post[]>();
    this.getAll().forEach(post => {
      const year = post.date.getFullYear();
      if (!mapByYear.has(year)) {
        mapByYear.set(year, []);
      }
      mapByYear.get(year)!.push(post);
    });

    return Array.from(mapByYear.entries())
      .map(([year, posts]) => ({ year, posts }))
      .toSorted(({ year: yearA }, { year: yearB }) => yearB - yearA);
  }

  /**
   * 작성일시 최신순으로 포스트 목록 정렬하여 반환
   * @param posts 포스트 목록
   */
  private static sortByDateDesc(posts: readonly Post[]): Post[] {
    return posts.toSorted((postA, postB) => postB.date.getTime() - postA.date.getTime());
  }
}

const Posts = new PostService();
export default Posts;
