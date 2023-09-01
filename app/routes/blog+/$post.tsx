import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import type {
	LoaderArgs,
	SerializeFrom,
	V2_MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getGenericSocialImage } from '~/images.ts'
import type { LoaderData as RootLoaderData } from '~/root.tsx'
import type { BlogPost } from '~/types.ts'

import { contentful } from '~/services/contentful.server.ts'
import { Tag, TagWrapper } from '~/components/Tags.tsx'
import { getMetas, getUrl } from '~/utils/index.ts'

export async function loader({ params }: LoaderArgs) {
	const {
		blogPostsCollection: { items: blogPost },
	} = await contentful<{
		blogPostsCollection: { items: BlogPost[] }
	}>(`{
    blogPostsCollection(where: {
      slug: "${params.post}"
    }) {
      items {
        title
        tags
        description
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
  }`)

	if (!blogPost[0]) {
		throw new Error('Blog post not found')
	}

	return json({
		blogPost: blogPost[0],
	})
}

export const meta: V2_MetaFunction<typeof loader, { root: RootLoaderData }> = ({
	matches,
	data,
}) => {
	const requestInfo = matches.find(m => m.id === 'root')?.data.requestInfo
	const { blogPost } = data as SerializeFrom<typeof loader>

	return getMetas({
		origin: requestInfo?.origin ?? '',
		url: getUrl(requestInfo),
		title: blogPost.title,
		description: blogPost.description,
		keywords: blogPost.tags.join(', '),
		image: getGenericSocialImage({
			words: blogPost.title,
			featuredImage: blogPost.heroImage.url,
		}),
	})
}

export default function PostPage() {
	const { blogPost } = useLoaderData<typeof loader>()
	const content = blogPost.content.json as BlogPost['content']['json']
	return (
		<div className=" mx-auto flex min-h-screen max-w-prose flex-col gap-28 py-12">
			<div className="flex flex-col gap-6">
				<div className="flex w-full flex-col gap-2 px-4 lg:px-0">
					<h1 className="text-heading2 font-bold text-brand drop-shadow-lg">
						{blogPost.title}
					</h1>
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
						<div>
							<p>{blogPost.author.name}</p>
							<p className="text-sm">
								{new Date(blogPost.date).toLocaleDateString()}
							</p>
						</div>
					</div>
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
							className="h-[50vh] w-full rounded-md object-cover object-center"
						/>
					</picture>
					<TagWrapper>
						{blogPost.tags.map(tag => (
							<Tag key={tag}>{tag}</Tag>
						))}
					</TagWrapper>
				</div>
			</div>
			<article
				className="text-base"
				dangerouslySetInnerHTML={{
					__html: documentToHtmlString(content),
				}}
			/>
		</div>
	)
}
