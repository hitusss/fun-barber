import { PassThrough } from "stream";
import { Response, type HandleDocumentRequestFunction } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { makeTimings } from "~/utils/timing.server.ts";

const ABORT_DELAY = 5000;

type DocRequestArgs = Parameters<HandleDocumentRequestFunction>;

export default async function handleRequest(...args: DocRequestArgs) {
  const [request, responseStatusCode, responseHeaders, remixContext] = args;
  responseHeaders.set("fly-region", process.env.FLY_REGION ?? "unknown");
  responseHeaders.set("fly-app", process.env.FLY_APP_NAME ?? "unknown");

  const callbackName = isbot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady";

  return new Promise(async (resolve, reject) => {
    let didError = false;

    const timings = makeTimings("render", "renderToPipeableStream");

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.append("Server-Timing", timings.toString());
          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );
          pipe(body);
        },
        onShellError: (err: unknown) => {
          reject(err);
        },
        onError: (error: unknown) => {
          didError = true;

          console.error(error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

export async function handleDataRequest(response: Response) {
  response.headers.set("fly-region", process.env.FLY_REGION ?? "unknown");
  response.headers.set("fly-app", process.env.FLY_APP_NAME ?? "unknown");

  return response;
}
