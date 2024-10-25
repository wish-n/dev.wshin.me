import * as fs from "node:fs";
import * as Path from "node:path";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";

/**
 * rootDirPath 하위 모든 마크다운 파일들의 경로 목록 반환 (rootDirPath는 경로에 포함되지 않음)
 * @param rootDirPath 탐색을 시작할 최상위 디렉터리 경로
 */
export function findMarkdownFilePaths(rootDirPath: string): string[] {
  return walk(rootDirPath).filter(isMdFile);
}

function walk(rootDirPath: string, currDirPathUnderRoot?: string): string[] {
  currDirPathUnderRoot = currDirPathUnderRoot ?? "";
  const dirPath = Path.join(rootDirPath, currDirPathUnderRoot);

  const filePaths: string[] = [];
  const dirPaths: string[] = [];

  let dirContentNames: string[] = [];
  try {
    dirContentNames = fs.readdirSync(dirPath);
  } catch (e) {
    console.info(`Directory not found - ${dirPath}\n`, e);
    return [];
  }

  dirContentNames.forEach(name => {
    const dirContentPath = Path.join(dirPath, name);
    const stat = fs.lstatSync(dirContentPath);

    const pathToPush = Path.join(currDirPathUnderRoot, name);
    if (stat.isFile()) {
      filePaths.push(pathToPush);
    } else if (stat.isDirectory()) {
      dirPaths.push(pathToPush);
    }
  });

  return [...filePaths, ...dirPaths.map(path => walk(rootDirPath, path)).flat(1)];
}

function isMdFile(filePath: string): boolean {
  return filePath.toLowerCase().endsWith(".md");
}

/**
 * 주어진 경로의 마크다운 파일을 읽어 파싱
 * (항상 마크다운 형식의 파일이 입력될 것으로 기대)
 * @param filePath 마크다운 파일 경로
 */
export function parseMdFile(filePath: string): MdFileParseResult {
  const fileContent = fs.readFileSync(filePath);
  const parsed = matter(fileContent);

  return {
    frontMatter: parsed.data,
    bodyMd: parsed.content,
  };
}

interface MdFileParseResult {
  frontMatter: { [key: string]: unknown };
  bodyMd: string;
}

export function getUrlPath(filePath: string): string {
  const split = filePath.split(path.sep);

  const baseUrlPath = split.slice(0, split.length - 1).join("/");
  const fileNameWithoutExtension = split[split.length - 1].split(".")[0];

  if (fileNameWithoutExtension === "index") {
    if (baseUrlPath === "") {
      throw new Error("index.md is not allowed on root directory");
    }
    return baseUrlPath;
  }

  return baseUrlPath === ""
    ? fileNameWithoutExtension
    : [baseUrlPath, fileNameWithoutExtension].join("/");
}

/**
 * 마크다운 형식의 텍스트를 HTML 형식 텍스트로 변환
 * @param mdContent 마크다운 텍스트
 */
export function convertMdToHtml(mdContent: string): string {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(mdContent)
    .toString();
}
