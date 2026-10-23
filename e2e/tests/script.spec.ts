import type { Route } from "@playwright/test";
import { GSI_URL, expect, open, test } from "./fixtures";

test("loads Google's script once however many components use it", async ({
  page,
}) => {
  await open(page, "many");
  await expect(page.getByTestId("gsi-button")).toHaveCount(2);
  await expect(page.locator(`script[src="${GSI_URL}"]`)).toHaveCount(1);
  expect(await page.evaluate(() => window.__gsiLoads)).toBe(1);
});

test("reports when the script fails to load", async ({ page }) => {
  await page.route(GSI_URL, (route) => route.abort());
  await open(page, "script");
  await expect(page.getByTestId("script-error")).toHaveText("true");
  await expect(page.getByTestId("script-loaded")).toHaveText("false");
});

test("reports when the script has loaded", async ({ page }) => {
  await open(page, "script");
  await expect(page.getByTestId("script-loaded")).toHaveText("true");
  await expect(page.getByTestId("script-error")).toHaveText("false");
});

test("retries a failed load when a component mounts again", async ({
  page,
}) => {
  const fail = (route: Route) => route.abort();
  await page.route(GSI_URL, fail);
  await open(page, "script");
  await expect(page.getByTestId("script-error")).toHaveText("true");

  await page.unroute(GSI_URL, fail);
  const toggle = page.getByRole("button", { name: "toggle" });
  await toggle.click();
  await toggle.click();
  await expect(page.getByTestId("script-loaded")).toHaveText("true");
  await expect(page.getByTestId("script-error")).toHaveText("false");
  await expect(page.locator(`script[src="${GSI_URL}"]`)).toHaveCount(1);
});

test("loads the script in the plugin's locale", async ({ page }) => {
  await open(page, "script", "&locale=fr");
  await expect(page.getByTestId("script-loaded")).toHaveText("true");
  await expect(page.locator(`script[src="${GSI_URL}?hl=fr"]`)).toHaveCount(1);
});
