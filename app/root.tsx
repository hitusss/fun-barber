import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import BackgroundImg from "~/image/background.jpg";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

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
        <main
          style={{
            background: `linear-gradient(160deg, transparent -50%, rgb(var(--c-gray-d)) 65%), url(${BackgroundImg}), rgb(var(--c-gray-d))`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}
          className="min-h-full pt-[72px]"
        >
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
