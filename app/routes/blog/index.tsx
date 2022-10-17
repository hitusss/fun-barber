import * as React from "react";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { BlogPost } from "~/types";
import type { LoaderData as RootLoaderData } from "~/root";
import { Heading } from "~/components/Heading";
import { BlogCard } from "~/components/BlogCard";
import { contentful } from "~/services/contentful.server";
import { getSocialMetas, getUrl } from "~/utils";

type LoaderData = {
  blogPosts: Omit<BlogPost, "content">[];
};

export async function loader() {
  const {
    blogPostsCollection: { items: blogPosts },
  } = await contentful(`{
    blogPostsCollection {
      items {
        title
        slug
        tags
        description
        heroImage {
          url
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
  }`);

  return json<LoaderData>({
    blogPosts,
  });
}

export const meta: MetaFunction = ({ parentsData }) => {
  const { requestInfo } = parentsData.root as RootLoaderData;
  return {
    ...getSocialMetas({
      title: "Blog | Fun Barber",
      description: "Some cool blog posts about barber's world.",
      keywords: "barber, barber shop, fun barber, blog",
      url: getUrl(requestInfo),
      origin: requestInfo?.origin ?? "",
    }),
  };
};

export default function BlogPage() {
  const [filter, setFilter] = React.useState("");
  const reducedMotion = useReducedMotion();
  const { blogPosts } = useLoaderData<LoaderData>();
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center gap-10 py-12">
      <div className="flex w-full items-center justify-center gap-9">
        <figure className="aspect-square h-80">
          <picture>
            <source srcSet="images/blog.webp" type="image/webp" />
            <source srcSet="images/blog.jpg" type="image/jpeg" />
            <motion.img
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reducedMotion ? 0 : 0.5,
              }}
              viewport={{ once: true, margin: "-15%" }}
              src="images/blog.jpg"
              alt=""
              className="hidden h-full w-full border-4 border-brand object-cover drop-shadow-lg lg:block"
            />
          </picture>
        </figure>
        <div className="flex flex-col items-center gap-6 px-4 lg:items-start">
          <Heading>Blog</Heading>
          <p className="max-w-prose">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <input
            type="text"
            className="rounded-full border-2 border-gray-l bg-transparent px-4 py-2 text-brand focus:border-brand focus:outline-none"
            placeholder="Filter blog posts"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <AnimatePresence>
          {blogPosts
            .filter(
              (post) =>
                post.title.toLowerCase().match(filter.toLowerCase()) ||
                filter
                  .split(" ")
                  .reduce((acc, cur) => acc || post.tags.includes(cur), false)
            )
            .map((blogPost) => (
              <BlogCard key={blogPost.title} {...blogPost} />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
