import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
} from "@remix-run/react";

import { MainWrapper } from "~/components/MainWrapper";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { ErrorComponent } from "~/components/ErrorComponent";

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
      href: "/favicons/logo192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      href: "/favicons/logo512.png",
    },
    { rel: "manifest", href: "/manifest.json" },
    { rel: "icon", href: "/favicon.ico" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
    },
    { rel: "stylesheet", href: reachMenuButtonStylesheetUrl },
    { rel: "stylesheet", href: mainStylesheetUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
  title: "Fun Barber",
  description: "FBarber barber shop official website.",
});

export default function App() {
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
          <ErrorComponent className="max-w-screen-lg text-center text-4xl">
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
            <ErrorComponent className="max-w-screen-lg text-center text-4xl">
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
