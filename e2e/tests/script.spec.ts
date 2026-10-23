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
