import * as React from 'react'
import type { MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { AnimatePresence } from 'framer-motion'

import type { BlogPost, PageHandle } from '~/types.ts'
import { contentful } from '~/services/contentful.server.ts'
import { BlogCard } from '~/components/BlogCard.tsx'
import { Heading } from '~/components/Heading.tsx'
import { getMetas, getUrl } from '~/utils/index.ts'
import type { LoaderData as RootLoaderData } from '~/root.tsx'

const handleId = 'blog'
export const handle: PageHandle = {
	id: handleId,
	getSitemapEntries: () => [{ route: `/blog`, priority: 0.7 }],
}

export async function loader() {
	const {
		blogPostsCollection: { items: blogPosts },
	} = await contentful<{
		blogPostsCollection: { items: Omit<BlogPost, 'content'>[] }
	}>(`{
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
  }`)

	return json({
		blogPosts,
	})
}

export const meta: MetaFunction<typeof loader, { root: RootLoaderData }> = ({
	matches,
}) => {
	const requestInfo = matches.find(m => m.id === 'root')?.data.requestInfo
	return getMetas({
		url: getUrl(requestInfo),
		origin: requestInfo?.origin ?? '',
		title: 'Blog',
		description: "Some cool blog posts about barber's world.",
		keywords: 'barber, barber shop, fun barber, blog',
	})
}

export default function BlogPage() {
	const [filter, setFilter] = React.useState('')
	const { blogPosts } = useLoaderData<typeof loader>()
	return (
		<div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center gap-10 py-12">
			<div className="flex w-full items-center justify-center gap-9">
				<figure className="aspect-square h-80">
					<picture>
						<source srcSet="images/blog.webp" type="image/webp" />
						<source srcSet="images/blog.jpg" type="image/jpeg" />
						<img
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
						onChange={e => setFilter(e.target.value)}
					/>
				</div>
			</div>
			<div className="flex flex-wrap justify-center gap-6">
				<AnimatePresence>
					{blogPosts
						.filter(
							post =>
								post.title.toLowerCase().match(filter.toLowerCase()) ||
								filter
									.split(' ')
									.reduce((acc, cur) => acc || post.tags.includes(cur), false),
						)
						.map((blogPost, i) => (
							<BlogCard key={blogPost.title} {...blogPost} delay={0.05 * i} />
						))}
				</AnimatePresence>
			</div>
		</div>
	)
}
