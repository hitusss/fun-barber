import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { BlogPost } from "~/types";
import { contentful } from "~/utils/contentful.server";

type LoaderData = {
  blogPost: BlogPost;
};

export async function loader({ params }: LoaderArgs) {
  const {
    blogPostsCollection: { items: blogPost },
  } = await contentful(`{
    {
      blogPostsCollection(where: {
       title_contains: "${params.post?.replace(/-/g, " ")}"
     }) {
       items {
         title
         heroImage {
           url
         }
         content {
           json
         }
         date
         author {
           name
           avatar {
             url
           }
         }
       }
     }
   }
  }`);

  return json<LoaderData>({
    blogPost: blogPost[0],
  });
}

export default function Post() {
  const { blogPost } = useLoaderData<LoaderData>();
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col gap-8 px-4 lg:px-0">
      <figure>
        <picture>
          <source
            srcSet={`${blogPost.heroImage.url}?w=1280&h=1280&fm=webp`}
            type="image/webp"
          />
          <source
            srcSet={`${blogPost.heroImage.url}?w=1280&h=1280&fm=jpg`}
            type="image/jpeg"
          />
          <img
            src={`${blogPost.heroImage.url}?w=1280&h=1280&fm=jpg`}
            alt=""
            className="h-96 w-full rounded-lg object-cover"
          />
        </picture>
      </figure>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-text/75">
          {new Date(blogPost.date).toLocaleDateString()}
        </p>
        <h1 className="text-heading2 font-bold text-brand">{blogPost.title}</h1>
        <div className="flex items-center gap-2 text-base">
          <figure>
            <picture>
              <source
                srcSet={`${blogPost.author.avatar.url}?w=100&h=100&fm=webp`}
                type="image/webp"
              />
              <source
                srcSet={`${blogPost.author.avatar.url}?w=100&h=100&fm=jpg`}
                type="image/jpeg"
              />
              <img
                src={`${blogPost.author.avatar.url}?w=100&h=100&fm=jpg`}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
            </picture>
          </figure>
          <p>{blogPost.author.name}</p>
        </div>
      </div>
      <div
        className="text-base"
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(blogPost.content.json),
        }}
      />
    </div>
  );
}
