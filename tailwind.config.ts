import typography from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme.js'

export default {
	content: ['./app/**/*.{ts,tsx,jsx,js}'],
	theme: {
		fontFamily: {
			serif: ['Libre Baskerville', ...defaultTheme.fontFamily.serif],
		},
		extend: {
			fontSize: {
				heading: 'clamp(2rem, 5vw + 1rem, 6rem)',
				heading2: 'clamp(1.5rem, 3vw + 1rem, 4rem)',
				paragraph: 'clamp(0.75rem, 1vw + 0.5rem, 1.5rem)',
			},
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				white: 'rgb(var(--c-white) / <alpha-value>)',
				black: 'rgb(var(--c-black) / <alpha-value>)',
				brand: 'rgb(var(--c-brand) / <alpha-value>)',
				gray: {
					l: 'rgb(var(--c-gray-l) / <alpha-value>)',
					d: 'rgb(var(--c-gray-d) / <alpha-value>)',
				},
			},
			typography: (theme: any) => ({
				default: {
					css: {
						'--tw-prose-body': theme('colors.gray[200]'),
						'--tw-prose-headings': theme('colors.gray[100]'),
						'--tw-prose-lead': theme('colors.gray[300]'),
						'--tw-prose-links': theme('colors.gray[100]'),
						'--tw-prose-bold': theme('colors.gray[100]'),
						'--tw-prose-counters': theme('colors.gray[400]'),
						'--tw-prose-bullets': theme('colors.gray[500]'),
						'--tw-prose-hr': theme('colors.gray[600]'),
						'--tw-prose-quotes': theme('colors.gray[100]'),
						'--tw-prose-quote-borders': theme('colors.gray[600]'),
						'--tw-prose-captions': theme('colors.gray[300]'),
						'--tw-prose-code': theme('colors.gray[100]'),
						'--tw-prose-pre-code': theme('colors.gray[900]'),
						'--tw-prose-pre-bg': theme('colors.gray[100]'),
						'--tw-prose-th-borders': theme('colors.gray[600]'),
						'--tw-prose-td-borders': theme('colors.gray[2-00]'),
						'--tw-prose-invert-body': theme('colors.gray[2-00]'),
						'--tw-prose-invert-headings': theme('colors.white'),
						'--tw-prose-invert-lead': theme('colors.gray[600]'),
						'--tw-prose-invert-links': theme('colors.white'),
						'--tw-prose-invert-bold': theme('colors.white'),
						'--tw-prose-invert-counters': theme('colors.gray[500]'),
						'--tw-prose-invert-bullets': theme('colors.gray[400]'),
						'--tw-prose-invert-hr': theme('colors.gray[300]'),
						'--tw-prose-invert-quotes': theme('colors.gray[900]'),
						'--tw-prose-invert-quote-borders': theme('colors.gray[300]'),
						'--tw-prose-invert-captions': theme('colors.gray[500]'),
						'--tw-prose-invert-code': theme('colors.white'),
						'--tw-prose-invert-pre-code': theme('colors.gray[600]'),
						'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
						'--tw-prose-invert-th-borders': theme('colors.gray[400]'),
						'--tw-prose-invert-td-borders': theme('colors.gray[300]'),
					},
				},
			}),
		},
	},
	plugins: [typography],
} satisfies Config
