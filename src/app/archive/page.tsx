import { getAllPostsMetaGroupByYear } from "@/services/post.service";
import Link from "next/link";
import { defaultDateFormatter } from "@/utils/date";

export default function Archive() {
  const posts = getAllPostsMetaGroupByYear();

  return (
    <div>
      {posts.map(({ year, posts }) => (
        <div key={year} className="mb-5">
          <h3 className="mb-2 text-lg font-medium">{year}</h3>
          <ul>
            {posts.map(post => (
              <li key={post.slug} className="my-1">
                <Link href={`/posts/${post.slug}`}>
                  <p>
                    {post.title}{" "}
                    <span className="text-neutral-500">
                      &mdash; {defaultDateFormatter(post.date)}
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
