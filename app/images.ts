import { toBase64 } from '~/utils/index.ts'

export function getGenericSocialImage({
	words,
	featuredImage: img,
}: {
	words: string
	featuredImage: string
}) {
	const titleSection = `c_fit,co_rgb:ffffff,g_north_west,w_864,x_96,y_468,l_text:Arial_72_bold:${encodeURIComponent(
		encodeURIComponent(words),
	)}`
	const featuredImageSection = `c_pad,g_north_east,h_888,w_864,x_96,y_96,l_fetch:${toBase64(
		img,
	)}`
	return [
		`https://res.cloudinary.com/hitusss/image/upload`,
		titleSection,
		featuredImageSection,
		`v1/fun-barber/social-background.png`,
	].join('/')
}
