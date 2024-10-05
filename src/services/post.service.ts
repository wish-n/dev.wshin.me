import { Post } from "@/models/markdown-content";
import MarkdownContentService from "@/services/markdown-content.service";

class PostService extends MarkdownContentService<Post> {
  constructor() {
    super("contents/posts");
  }
}

const Posts = new PostService();
export default Posts;
