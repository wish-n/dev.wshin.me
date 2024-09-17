import { Post, PostMeta } from "@/models/post";
import { convertMdToHtml, findMdFiles, getSlugByFilePath, parseMdFile } from "@/utils/markdown";

class PostService {
  private static readonly ROOT_DIR_POSTS = "contents/posts";

  private readonly posts: readonly Post[];

  constructor() {
    // constructor 시점에 마크다운 파일들을 읽어 내부 필드에 캐싱
    // 빌드 이후에 변경될 일이 없는 데이터이기 때문
    this.posts = findMdFiles(PostService.ROOT_DIR_POSTS).map(filePath => {
      const slug = getSlugByFilePath(filePath);
      const parsed = parseMdFile(filePath);

      return {
        slug,
        title: parsed.frontMatter.title as string,
        date: new Date(parsed.frontMatter.date as string),
        draft: parsed.frontMatter.draft as boolean,
        bodyHtml: convertMdToHtml(parsed.bodyMd),
      };
    });
  }

  getAll(): Post[] {
    return this.posts.toSorted((postA, postB) => postB.date.getTime() - postA.date.getTime());
  }

  getAllGroupByYear(): { year: number; posts: PostMeta[] }[] {
    const allPosts = this.getAll();

    const mapByYear = new Map<number, PostMeta[]>();
    allPosts.forEach(post => {
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
}

const Posts = new PostService();
export default Posts;
