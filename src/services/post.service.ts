import { Post } from "@/models/markdown-content";
import MdContentService from "@/services/markdown-content.service";

class PostService extends MdContentService<Post> {
  constructor() {
    super("contents/posts");
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
}

const Posts = new PostService();
export default Posts;
