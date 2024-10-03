// https://github.com/vercel/next.js/issues/59136
export async function GET() {
  return new Response(getSitemap(), { headers: { "Content-Type": "text/xml" } });
}

function getSitemap() {
  const urls = [
    {
      url: "https://my.app.url",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
    ${urls
      .map(
        item => `
            <url>
              <loc>${item.url}</loc>
              <lastmod>${item.lastModified.toISOString()}</lastmod>
              <changefreq>${item.changeFrequency}</changefreq>
              <priority>${item.priority}</priority>
            </url>
          `,
      )
      .join("")}
    </urlset>
  `.trim();
}
