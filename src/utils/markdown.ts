import * as fs from "node:fs";
import * as Path from "node:path";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

export function findMdFiles(rootDirPath: string): string[] {
  return walk(rootDirPath).filter(isMdFile);
}

function walk(dirPath: string): string[] {
  let fileNames: string[] = [];
  const filePaths: string[] = [];
  const dirPaths: string[] = [];

  try {
    fileNames = fs.readdirSync(dirPath);
  } catch (e) {
    console.warn(`Directory not found - ${dirPath}\n`, e);
    return [];
  }

  fileNames.forEach(fileName => {
    const filePath = Path.join(dirPath, fileName);
    const fileStat = fs.lstatSync(filePath);
    if (fileStat.isFile()) filePaths.push(filePath);
    else if (fileStat.isDirectory()) dirPaths.push(filePath);
  });

  return [...filePaths, ...dirPaths.map(walk).flat(1)];
}

function isMdFile(filePath: string): boolean {
  return filePath.endsWith(".md");
}

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

export function getSlugByFilePath(filePath: string): string {
  const pathArr = filePath.split(path.sep);
  const fileName = pathArr[pathArr.length - 1];
  const fileNameWithoutExtension = fileName.split(".")[0];
  const upperDirName = pathArr[pathArr.length - 2];

  return fileNameWithoutExtension === "index" ? upperDirName : fileNameWithoutExtension;
}

export function convertMdToHtml(mdContent: string): string {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(mdContent)
    .toString();
}
