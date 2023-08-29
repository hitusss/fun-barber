import { getGenericSocialImage } from '~/images.ts'

export function getMetas({
	url,
	origin,
	title,
	description = 'One of the best barber show nears you.',
	keywords = 'barber shop, barber, fun barber',
	image = getGenericSocialImage({
		words: description,
		featuredImage: `${origin}/images/featuredImage.png`,
	}),
}: {
	url: string
	origin: string
	title?: string
	description?: string
	keywords?: string
	image?: string
}) {
	return [
		{
			name: 'viewport',
			content: 'width=device-width,initial-scale=1,viewport-fit=cover',
		},
		{
			name: 'theme-color',
			content: '#FFFEFE',
		},
		{ title: title ? `${title} | Fun Barber` : 'Fun Barber' },
		{ name: 'description', content: description },
		{ name: 'keywords', content: keywords },
		{ name: 'image', content: image },
		{ name: 'og:url', content: url },
		{ name: 'og:title', content: title },
		{ name: 'og:description', content: description },
		{ name: 'og:image', content: image },
		{
			name: 'twitter:card',
			content: image ? 'summary_large_image' : 'summary',
		},
		{ name: 'twitter:creator', content: '' },
		{ name: 'twitter:site', content: '' },
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:description', content: description },
		{ name: 'twitter:image', content: image },
		{ name: 'twitter:image:alt', content: title },
	]
}
