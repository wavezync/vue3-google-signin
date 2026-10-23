import { CLIENT_ID, calls, expect, open, test } from "./fixtures";

const clientIds = async (page: Parameters<typeof calls>[0], name: string) =>
  (await calls(page, name)).map(
    (call) => (call.args[0] as { client_id: string }).client_id,
  );

test("waits for a client ID that is set after startup", async ({ page }) => {
  await open(page, "token-client", "&clientId=");
  const login = page.getByRole("button", { name: "Get token" });
  await expect.poll(() => page.evaluate(() => window.__gsiLoads)).toBe(1);
  await expect(login).toBeDisabled();
  expect(await calls(page, "oauth2.initTokenClient")).toHaveLength(0);

  await page.evaluate(() => (window.__clientId.value = "late-client-id"));
  await expect(login).toBeEnabled();
  expect(await clientIds(page, "oauth2.initTokenClient")).toEqual([
    "late-client-id",
  ]);
});

test("re-initializes when the plugin's client ID changes", async ({ page }) => {
  await open(page, "one-tap");
  await expect.poll(() => calls(page, "id.prompt")).toHaveLength(1);

  await page.evaluate(() => (window.__clientId.value = "next-client-id"));
  await expect
    .poll(() => clientIds(page, "id.initialize"))
    .toEqual([CLIENT_ID, "next-client-id"]);
});

test("a composable's or button's own client ID wins", async ({ page }) => {
  await open(page, "client-id");
  await expect(page.getByTestId("gsi-button")).toBeVisible();
  expect(await clientIds(page, "oauth2.initTokenClient")).toEqual([
    "token-client-id",
  ]);
  expect(await clientIds(page, "id.initialize")).toEqual(["button-client-id"]);
});
