import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { Response } from "@remix-run/node";
import type { EntryContext, Headers } from "@remix-run/node";
import isbot from "isbot";
import { getDomainUrl } from "~/utils";
import { generateImage } from "~/images.server";
import { getSitemapXml } from "~/utils/sitemap.server";

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const url = new URL(request.url);
  if (url.pathname.startsWith("/social-image")) {
    const words = url.searchParams.get("words");
    const featuredImage = url.searchParams.get("img");
    if (!words || !featuredImage) return;
    const socialImage = await generateImage({
      origin: getDomainUrl(request),
      words,
      featuredImage,
    });
    return new Response(socialImage, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=2419200",
      },
    });
  }

  if (url.pathname === "/sitemap.xml") {
    const sitemap = await getSitemapXml(request, remixContext);

    if (sitemap)
      return new Response(sitemap, {
        headers: {
          "Content-Type": "application/xml",
          "Content-Length": String(Buffer.byteLength(sitemap)),
        },
      });
  }

  const callbackName = isbot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady";

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]() {
          let body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(body, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          );
          pipe(body);
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(error: unknown) {
          didError = true;
          console.error(error);
        },
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
