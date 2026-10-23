import { test as base, type Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { GSI_URL } from "../shared";

export { expect } from "@playwright/test";
export { CLIENT_ID, GSI_URL } from "../shared";

type Call = { name: string; args: unknown[] };
type Event = { event: string; payload?: unknown };

declare global {
  interface Window {
    __gsi: {
      calls: Call[];
      credential(response: object): void;
      promptMoment(notification: object): void;
      tokenResponse(response: object): void;
      tokenError(error: object): void;
      codeResponse(response: object): void;
      codeError(error: object): void;
    };
    __events?: Event[];
    __gsiLoads?: number;
    __lib: typeof import("vue3-google-signin");
  }
}

const stub = fileURLToPath(new URL("../gsi-stub.js", import.meta.url));

/** Every page gets the stubbed Google script instead of the real one. */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(GSI_URL, (route) =>
      route.fulfill({ path: stub, contentType: "text/javascript" }),
    );
    await use(page);
  },
});

export const open = (page: Page, scenario: string) =>
  page.goto(`/?scenario=${scenario}`);

export const calls = (page: Page, name: string) =>
  page.evaluate(
    (n) => window.__gsi?.calls.filter((call) => call.name === n) ?? [],
    name,
  );

export const events = (page: Page) =>
  page.evaluate(() => window.__events ?? []);
