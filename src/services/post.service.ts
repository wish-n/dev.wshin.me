import { Post } from "@/services/post.model";
import { convertMdToHtml, findMarkdownFilePaths, getUrlPath, parseMdFile } from "@/utils/markdown";
import config from "@/config";
import * as Path from "node:path";

class PostService {
  private readonly ROOT_DIR_PATH = config.postRootDirectoryPath;
  private readonly contents: readonly Post[];
  private postTree = new PostTree();

  constructor() {
    // constructor 시점에 마크다운 파일들을 읽어 내부 필드에 캐싱
    // 빌드 이후에 변경될 일이 없는 데이터이기 때문
    this.contents = this.loadPosts(this.ROOT_DIR_PATH);
    this.contents.forEach(content => this.postTree.insert(content));
  }

  private loadPosts(rootDirPath: string): Post[] {
    return findMarkdownFilePaths(rootDirPath)
      .map(filePath => {
        const parsed = parseMdFile(Path.join(rootDirPath, filePath));

        return {
          urlPath: getUrlPath(filePath),
          title: parsed.frontMatter.title,
          date: new Date(parsed.frontMatter.date as string),
          draft: parsed.frontMatter.draft,
          disableComments: parsed.frontMatter.disableComments,
          bodyHtml: convertMdToHtml(parsed.bodyMd),
        } as Post;
      })
      .filter(post => !post.draft);
  }

  get(urlPath: string): Post | undefined {
    return this.contents.find(content => content.urlPath === urlPath);
  }

  getAll(): Post[] {
    return this.sortByDateDesc(this.contents);
  }

  getListablePosts(): Post[] {
    return this.sortByDateDesc(this.postTree.getChildPosts());
  }

  getChildPostsOf(urlPath: string): Post[] {
    return this.sortByDateAsc(this.postTree.find(urlPath)?.getChildPosts() ?? []);
  }

  getParentPostOf(urlPath: string): Post | undefined {
    return this.postTree.find(urlPath)?.getParentPost();
  }

  /**
   * 작성일시 최신순으로 정렬하여 반환
   */
  private sortByDateDesc(contents: readonly Post[]): Post[] {
    return contents.toSorted((postA, postB) => postB.date.getTime() - postA.date.getTime());
  }

  /**
   * 작성일시 최신순으로 정렬하여 반환
   */
  private sortByDateAsc(contents: readonly Post[]): Post[] {
    return contents.toSorted((postA, postB) => postA.date.getTime() - postB.date.getTime());
  }
}

class PostTree {
  post?: Post; // root인 경우에만 undefined
  children: PostTree[];
  parent?: PostTree;

  constructor(post?: Post, children?: PostTree[], parent?: PostTree) {
    this.post = post;
    this.children = children ?? [];
    this.parent = parent;
  }

  insert(post: Post): void {
    for (const child of this.children) {
      if (child.isAncestorOf(post.urlPath)) {
        child.insert(post);
        return;
      }
    }

    const descendants = this.children.filter(child => child.isDescendantOf(post.urlPath));
    const newNode = new PostTree(post, descendants, this);
    newNode.children.forEach(child => (child.parent = newNode));

    this.children = [...this.children.filter(child => !descendants.includes(child)), newNode];
  }

  private isAncestorOf(urlPath: string): boolean {
    if (!this.post?.urlPath) {
      return false;
    }
    return urlPath.startsWith(this.post.urlPath);
  }

  private isDescendantOf(urlPath: string): boolean {
    return this.post?.urlPath.startsWith(urlPath) ?? false;
  }

  find(urlPath: string): PostTree | undefined {
    const found = this.children.find(child => child.post?.urlPath === urlPath);
    if (found) {
      return found;
    }

    for (const child of this.children) {
      if (child.isAncestorOf(urlPath)) {
        return child.find(urlPath);
      }
    }
  }

  getChildPosts(): Post[] {
    return this.children.map(child => child.post).filter(post => !!post);
  }

  getParentPost(): Post | undefined {
    return this.parent?.post;
  }
}

const Posts = new PostService();
export default Posts;
