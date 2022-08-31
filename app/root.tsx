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

import tailwindStylesheetUrl from "~/styles/tailwind.css";
import scrollbarStylesheetUrl from "~/styles/scrollbar.css";
import noScriptStylesheetUrl from "~/styles/no-script.css";
import reachMenuButtonStylesheetUrl from "@reach/menu-button/styles.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: reachMenuButtonStylesheetUrl },
    { rel: "stylesheet", href: scrollbarStylesheetUrl },
    { rel: "stylesheet", href: noScriptStylesheetUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
  title: "Fun Barber",
  description: "Fun Barber",
});

export default function App() {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-background font-serif text-text">
        <Header />
        <main
          style={{
            background: `linear-gradient(160deg, rgba(34, 33, 36, 0) -50%, #222124 61.65%), url(${BackgroundImg}), #222124`,
            backgroundSize: "cover",
          }}
          className="min-h-full pt-28 pb-12 text-paragraph"
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
