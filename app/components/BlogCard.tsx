import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import type { BlogPost } from "~/types";
import { TagWrapper, Tag } from "~/components/Tags";
import { useReducedMotion } from "~/utils";

type BlogCardProps = Omit<BlogPost, "content"> & {
  delay: number;
};

export function BlogCard({
  title,
  slug,
  tags,
  heroImage,
  date,
  author,
  delay,
}: BlogCardProps) {
  const { duration } = useReducedMotion();
  return (
    <Link key={title} to={`/blog/${slug}`} aria-label={`blog post: ${title}`}>
      <motion.article
        initial={{ opacity: 0.5, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{
          duration,
          delay,
        }}
        whileHover={{ scale: 1.05 }}
        className="flex h-auto w-72 flex-col gap-4 overflow-hidden rounded-lg"
      >
        <figure>
          <picture>
            <source
              srcSet={`${heroImage.url}?w=300&h=300&fm=webp`}
              type="image/webp"
            />
            <source
              srcSet={`${heroImage.url}?w=300&h=300&fm=jpg`}
              type="image/jpeg"
            />
            <img
              src={`${heroImage.url}?w=300&h=300&fm=jpg`}
              alt=""
              className="h-60 w-full rounded-lg object-cover"
            />
          </picture>
        </figure>
        <div className="flex flex-col items-start px-2 text-left">
          <p className="text-sm text-gray-l">
            {new Date(date).toLocaleDateString()}
          </p>
          <h2 className="text-2xl font-bold">
            {title.slice(0, 30)}
            {title.length > 30 && "..."}
          </h2>
          <div className="flex items-center gap-2">
            <figure>
              <picture>
                <source
                  srcSet={`${author.avatar.url}?w=300&h=300&fm=webp`}
                  type="image/webp"
                />
                <source
                  srcSet={`${author.avatar.url}?w=300&h=300&fm=jpg`}
                  type="image/jpeg"
                />
                <img
                  src={`${author.avatar.url}?w=300&h=300&fm=jpg`}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover"
                />
              </picture>
            </figure>
            <p>{author.name}</p>
          </div>
          <TagWrapper>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagWrapper>
        </div>
      </motion.article>
    </Link>
  );
}
