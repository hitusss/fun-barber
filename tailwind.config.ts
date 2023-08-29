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
		},
	},
	plugins: [],
} satisfies Config
