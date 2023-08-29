import type { LoaderArgs } from "@remix-run/node";
import type { BlogPost } from "~/types.ts";
import { contentful } from "~/services/contentful.server.ts";
import { getDomainUrl } from "~/utils/index.ts";

export async function loader({ request }: LoaderArgs) {
  const {
    blogPostsCollection: { items: blogPosts },
  } = await contentful(`{
    blogPostsCollection {
      items {
        slug
        title
        description
        sys {
          publishedAt
        }
      }
    }
  }`);

  const blogUrl = `${getDomainUrl(request)}/blog`;

  const rss = `
    <rss xmlns:blogChannel="${blogUrl}" version="2.0">
      <channel>
        <title>Fun Barber</title>
        <link>${blogUrl}</link>
        <description>Fun Barber Blog</description>
        <language>en-us</language>
        <generator>Fun</generator>
        <ttl>40</ttl>
        ${blogPosts
          .map((post: BlogPost) =>
            `
            <item>
              <title>${cdata(post.title ?? "Untitled Post")}</title>
              <description>${cdata(
                post.description ?? "This post is... indescribable",
              )}</description>
              <pubDate>${post.sys.publishedAt.split("T")[0]}</pubDate>
              <link>${blogUrl}/${post.slug}</link>
              <guid>${blogUrl}/${post.slug}</guid>
            </item>
          `.trim(),
          )
          .join("\n")}
      </channel>
    </rss>
  `.trim();

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Length": String(Buffer.byteLength(rss)),
    },
  });
}

function cdata(s: string) {
  return `<![CDATA[${s}]]>`;
}
