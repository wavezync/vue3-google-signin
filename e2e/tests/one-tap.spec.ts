import { CLIENT_ID, calls, events, expect, open, test } from "./fixtures";

test("prompts automatically with the given options", async ({ page }) => {
  await open(page, "one-tap");
  await expect.poll(() => calls(page, "id.prompt")).toHaveLength(1);

  const [init] = await calls(page, "id.initialize");
  expect(init.args[0]).toMatchObject({
    client_id: CLIENT_ID,
    auto_select: true,
    cancel_on_tap_outside: false,
    context: "signin",
    use_fedcm_for_prompt: true,
  });
});

test("reports success, errors and prompt moments", async ({ page }) => {
  await open(page, "one-tap");
  await expect.poll(() => calls(page, "id.prompt")).toHaveLength(1);

  await page.evaluate(() => {
    window.__gsi.promptMoment({ getMomentType: () => "skipped" });
    window.__gsi.credential({ credential: "h.p.s", select_by: "auto" });
    window.__gsi.credential({ select_by: "auto" });
  });
  expect(await events(page)).toEqual([
    { event: "prompt", payload: "skipped" },
    { event: "success", payload: { credential: "h.p.s", select_by: "auto" } },
    { event: "error" },
  ]);
});

test("cancels the prompt on unmount", async ({ page }) => {
  await open(page, "one-tap");
  await expect.poll(() => calls(page, "id.prompt")).toHaveLength(1);
  await page.getByRole("button", { name: "toggle" }).click();
  await expect.poll(() => calls(page, "id.cancel")).toHaveLength(1);
});

test("waits for login() when the automatic prompt is disabled", async ({
  page,
}) => {
  await open(page, "one-tap-manual");
  const login = page.getByRole("button", { name: "One Tap" });
  await expect(login).toBeEnabled();
  expect(await calls(page, "id.prompt")).toHaveLength(0);

  await login.click();
  expect(await calls(page, "id.prompt")).toHaveLength(1);
});
