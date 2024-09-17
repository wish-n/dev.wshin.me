import { Post, PostMeta } from "@/models/post";

export function getAllPosts(): Post[] {
  const posts = DUMMY_POSTS.map(post => ({
    ...post,
    bodyHtml: dummyBodyHtml,
  }));

  return posts;
}

/**
 * 모든 포스트의 메타데이터를 작성일시 최신순으로 조회한다.
 */
export function getAllPostsMeta(): PostMeta[] {
  return DUMMY_POSTS;
}

/**
 * 모든 포스트의 메타데이터를 작성연도로 GROUP BY 하여 반환한다.
 */
export function getAllPostsMetaGroupByYear(): { year: number; posts: PostMeta[] }[] {
  const allPosts = getAllPostsMeta();

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

/**
 * 모든 카테고리를 조회한다.
 */
export function getAllCategories(): string[] {
  return Array.from(
    new Set(
      getAllPostsMeta()
        .map(post => post.category)
        .filter(category => !!category)
        .map(category => category!), // 위에서 filter하고 있으므로, compile error 우회를 위해
    ),
  );
}

// 테스트용 더미데이터
// TODO: REMOVE
const DUMMY_POSTS: PostMeta[] = [
  {
    slug: "a",
    title: "마라탕을 졸이면 마라샹궈가 될까",
    date: new Date(2022, 8, 10),
  },
  {
    slug: "b",
    title: "개발이란 개발하는 것이다",
    date: new Date(2023, 8, 12),
  },
  {
    slug: "c",
    title: "아 배고프네",
    date: new Date(2024, 8, 13),
  },
  {
    slug: "d",
    title: "대충 내가 최신글이어야 함",
    date: new Date(2024, 8, 14),
  },
];

// TODO: REMOVE
const dummyBodyHtml =
  "<h3>Hello World</h3>" +
  "<p>\n" +
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id porttitor nibh. Nulla tempus lacinia diam, aliquet elementum dui varius non. Integer at enim massa. Nulla facilisi. Ut laoreet sem ac rhoncus venenatis. Morbi id hendrerit nisi. Ut auctor quam odio, facilisis blandit ligula porttitor non. Nunc nisi augue, laoreet eu porttitor non, imperdiet eu lectus. Integer molestie fringilla feugiat. Praesent sodales vestibulum lacus vitae malesuada. Nullam sodales neque ac leo tristique, a tristique ligula lobortis. Vivamus egestas convallis tristique. Curabitur pellentesque sem erat, quis vehicula nisl bibendum at.\n" +
  "</p><p>\n" +
  "Aenean imperdiet elit non feugiat molestie. Cras ultricies, ante et molestie accumsan, urna quam ullamcorper magna, vel aliquet ante metus id lorem. Nulla ultricies, metus non fermentum venenatis, erat turpis rhoncus ante, non faucibus enim lacus non magna. In hac habitasse platea dictumst. Praesent et orci sit amet dui volutpat mattis eget nec velit. Nullam arcu ante, semper ac ex eu, ultricies mattis leo. Morbi eu metus arcu. Duis scelerisque sem nec metus suscipit ultrices. Morbi vitae aliquam neque, non congue erat. Aenean semper magna est, tempus pulvinar felis vehicula sed. Phasellus rutrum metus a felis hendrerit, nec facilisis metus convallis.\n" +
  "</p><p>\n" +
  "Suspendisse auctor sodales enim, vel consequat lacus tempus id. Vestibulum interdum lorem a eros facilisis, sed suscipit urna placerat. Suspendisse tellus libero, cursus ac feugiat nec, imperdiet et quam. Duis sed tempor neque. Aliquam ornare convallis ullamcorper. Proin sit amet neque eget lectus aliquam cursus eu quis diam. Praesent tortor nisl, ornare ac iaculis sed, dictum ut dolor. Fusce dignissim nibh vel augue varius pulvinar.\n" +
  "</p><p>\n" +
  "Sed vitae nulla vitae massa rhoncus eleifend. Mauris sed augue pulvinar, placerat neque in, lobortis justo. Suspendisse faucibus gravida nulla, venenatis imperdiet leo dapibus nec. Nam in vulputate diam. Etiam blandit sem et tellus placerat, vitae sodales lectus suscipit. Donec egestas mollis turpis in ultrices. Integer tempor nulla vel molestie tincidunt.\n" +
  "</p><p>\n" +
  "Mauris lorem quam, lobortis in fringilla et, luctus et purus. Curabitur nec sem nunc. Pellentesque commodo bibendum odio ut maximus. Nulla facilisis auctor nibh, eget pulvinar eros laoreet et. Nullam ac nisl erat. Vivamus consectetur sodales tempor. Duis eget malesuada enim. Suspendisse commodo varius urna. Quisque quis justo condimentum, porta nulla et, tincidunt leo.\n" +
  "</p>";