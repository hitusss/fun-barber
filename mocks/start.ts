import { setupServer } from "msw/node";
import { contentfulHandlers } from "./handlers/contentful";

const server = setupServer(...contentfulHandlers);

server.listen({ onUnhandledRequest: "warn" });
console.info("🔶 Mock server running");

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
