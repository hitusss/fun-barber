import type { DefaultBodyType, MockedRequest, RestHandler } from "msw";
import { rest } from "msw";
import data from "../data/contentful.json";

export const contentfulHandlers: Array<
  RestHandler<MockedRequest<DefaultBodyType>>
> = [
  rest.post(
    `https://graphql.contentful.com/content/v1/spaces/:spaceId`,
    (req, res, ctx) => {
      if (!req.headers.get("authorization")) {
        return res(ctx.json({ errors: [new Error("Unauthorized")] }));
      }
      return res(ctx.json({ data }));
    }
  ),
];
