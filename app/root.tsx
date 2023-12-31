import { cssBundleHref } from '@remix-run/css-bundle'
import type {
	DataFunctionArgs,
	LinksFunction,
	MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
	isRouteErrorResponse,
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
} from '@remix-run/react'
import reachMenuButtonStylesheetUrl from '@reach/menu-button/styles.css'

import { ErrorComponent } from '~/components/ErrorComponent.tsx'
import { Footer } from '~/components/Footer.tsx'
import { Header } from '~/components/Header.tsx'
import { MainWrapper } from '~/components/MainWrapper.tsx'
import { getDomainUrl, getMetas, getUrl } from '~/utils/index.ts'
import { useNonce } from '~/utils/nonce-provider.ts'
import mainStylesheetUrl from '~/styles/main.css'
import noScriptStylesheetUrl from '~/styles/no-script.css'
import tailwindStylesheetUrl from '~/styles/tailwind.css'

export const links: LinksFunction = () => {
	return [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '192X192',
			href: '/images/android-chrome-192.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '512x512',
			href: '/images/android-chrome-512.png',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/images/apple-touch-icon.png',
		},
		{ rel: 'icon', href: '/favicon.ico' },
		{ rel: 'manifest', href: '/manifest.webmanifest' },
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap',
		},
		{ rel: 'stylesheet', href: reachMenuButtonStylesheetUrl },
		{ rel: 'stylesheet', href: mainStylesheetUrl },
		{ rel: 'stylesheet', href: tailwindStylesheetUrl },
		...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
	]
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	const requestInfo = data?.requestInfo

	return getMetas({
		origin: requestInfo?.origin ?? '',
		url: getUrl(requestInfo),
	})
}

export type LoaderData = typeof loader

export async function loader({ request }: DataFunctionArgs) {
	return json({
		requestInfo: {
			origin: getDomainUrl(request),
			path: new URL(request.url).pathname,
		},
	})
}

export function AppLayout({
	children,
	nonce,
}: {
	children: React.ReactNode
	nonce: string
}) {
	return (
		<html lang="en" className="h-full scroll-smooth">
			<head>
				<Meta />
				<Links />
				<noscript>
					<link rel="stylesheet" href={noScriptStylesheetUrl} />
				</noscript>
			</head>
			<body className="bg-white font-serif text-paragraph text-white transition duration-500">
				<span className="flex items-center justify-center gap-1 bg-red-500 px-3 py-1 text-base">
					This is only preview for
					<a
						href="https://github.com/Hitusss/fun-barber"
						target="_blank"
						className="text-blue-600 underline"
						rel="noreferrer"
					>
						github.com/Hitusss/fun-barber
					</a>
				</span>
				<Header />
				<MainWrapper>{children}</MainWrapper>
				<Footer />
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
				<LiveReload nonce={nonce} />
			</body>
		</html>
	)
}

export default function App() {
	const nonce = useNonce()
	return (
		<AppLayout nonce={nonce}>
			<Outlet />
		</AppLayout>
	)
}

export function ErrorBoundary() {
	const error = useRouteError()
	const nonce = useNonce()

	if (isRouteErrorResponse(error)) {
		return (
			<AppLayout nonce={nonce}>
				<div className="flex flex-col items-center justify-center gap-6 py-12">
					<ErrorComponent size="large" className="max-w-screen-lg text-center">
						{error.status} - {error.data.message}
					</ErrorComponent>
					<Link to="/" className="text-blue-600 underline">
						Go Home
					</Link>
				</div>
			</AppLayout>
		)
	}

	let errorMessage = 'Unknown error'
	if (error instanceof Error) {
		errorMessage = error.message
	}

	return (
		<AppLayout nonce={nonce}>
			<div className="flex flex-col items-center justify-center gap-6 py-12">
				<ErrorComponent size="large" className="max-w-screen-lg text-center">
					Oh no, Something went wrong.
				</ErrorComponent>
				<ErrorComponent size="medium" className="max-w-screen-lg text-center">
					{errorMessage}
				</ErrorComponent>
				<Link to="/" className="text-blue-600 underline">
					Go Home
				</Link>
			</div>
		</AppLayout>
	)
}
