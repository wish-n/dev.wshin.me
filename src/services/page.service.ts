import { Page } from "@/models/markdown-content";
import MarkdownContentService from "@/services/markdown-content.service";

class PageService extends MarkdownContentService<Page> {
  constructor() {
    super("contents/pages");
  }
}

const Pages = new PageService();
export default Pages;
