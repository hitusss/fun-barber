import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation,
} from "@remix-run/react";

import { MainWrapper } from "~/components/MainWrapper";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { ErrorComponent } from "~/components/ErrorComponent";
import { getDomainUrl, getSocialMetas, getUrl } from "~/utils";
import { getEnv } from "~/utils/env.server";

import mainStylesheetUrl from "~/styles/main.css";
import tailwindStylesheetUrl from "~/styles/tailwind.css";
import noScriptStylesheetUrl from "~/styles/no-script.css";
import reachMenuButtonStylesheetUrl from "@reach/menu-button/styles.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      type: "image/png",
      sizes: "192X192",
      href: "/images/android-chrome-192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      href: "/images/android-chrome-512.png",
    },
    { rel: "icon", href: "/favicon.ico" },
    { rel: "manifest", href: "/manifest.webmanifest" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
    },
    { rel: "stylesheet", href: reachMenuButtonStylesheetUrl },
    { rel: "stylesheet", href: mainStylesheetUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
  ];
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  const { requestInfo } = data;
  return {
    viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
    "theme-color": "#FFFEFE",
    ...getSocialMetas({
      origin: requestInfo?.origin ?? "",
      url: getUrl(requestInfo),
    }),
  };
};

export type LoaderData = {
  ENV: ReturnType<typeof getEnv>;
  requestInfo: {
    origin: string;
    path: string;
  };
};

export function loader({ request }: LoaderArgs) {
  return json<LoaderData>({
    ENV: getEnv(),
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  });
}

export default function App() {
  const data = useLoaderData();
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
        <Header />
        <MainWrapper>
          <Outlet />
        </MainWrapper>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <title>Oh no...</title>
        <Links />
      </head>
      <body className="bg-white font-serif text-paragraph text-white transition duration-500">
        <MainWrapper className="flex flex-col items-center justify-center gap-6">
          <ErrorComponent size="large" className="max-w-screen-lg text-center">
            500 - Oh no, something did not go well.
          </ErrorComponent>
          <Link to="/" className="text-blue-600 underline">
            Go Home
          </Link>
        </MainWrapper>
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const location = useLocation();
  console.error("CatchBoundary", caught);
  if (caught.status === 404) {
    return (
      <html lang="en" className="h-full scroll-smooth">
        <head>
          <title>Oh no...</title>
          <Links />
        </head>
        <body className="bg-white font-serif text-paragraph text-white transition duration-500">
          <MainWrapper className="flex flex-col items-center justify-center gap-6">
            <ErrorComponent
              size="large"
              className="max-w-screen-lg text-center"
            >
              404 - Oh no, you found a page that's missing stuff.
            </ErrorComponent>
            <p>{location.pathname} is not a valid page.</p>
            <Link to="/" className="text-blue-600 underline">
              Go Home
            </Link>
          </MainWrapper>
          <Scripts />
        </body>
      </html>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}
