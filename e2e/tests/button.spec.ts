import { CLIENT_ID, calls, events, expect, open, test } from "./fixtures";

test("renders Google's button with the plugin's client ID and props", async ({
  page,
}) => {
  await open(page, "button");
  await expect(page.getByTestId("gsi-button")).toBeVisible();

  const [init] = await calls(page, "id.initialize");
  expect(init.args[0]).toMatchObject({
    client_id: CLIENT_ID,
    login_hint: "ada@example.com",
    use_fedcm_for_button: true,
  });
  expect(init.args[0]).not.toHaveProperty("use_fedcm_for_prompt");
  const [render] = await calls(page, "id.renderButton");
  expect(render.args).toEqual([
    "[div]",
    expect.objectContaining({
      theme: "filled_black",
      size: "medium",
      shape: "pill",
      width: "320",
      state: "header",
    }),
  ]);
  expect(await calls(page, "id.prompt")).toHaveLength(0);
});

test("reserves the button's height", async ({ page }) => {
  await open(page, "button");
  const container = page.getByTestId("gsi-button").locator("..");
  await expect(container).toHaveCSS("height", "32px");
});

test("emits success with Google's credential response", async ({ page }) => {
  await open(page, "button");
  await expect(page.getByTestId("gsi-button")).toBeVisible();
  const response = {
    credential: "h.p.s",
    select_by: "btn",
    clientId: CLIENT_ID,
  };
  await page.evaluate((r) => window.__gsi.credential(r), response);
  expect(await events(page)).toEqual([{ event: "success", payload: response }]);
});

test("emits error with Google's response when there is no credential", async ({
  page,
}) => {
  await open(page, "button");
  await expect(page.getByTestId("gsi-button")).toBeVisible();
  await page.evaluate(() => window.__gsi.credential({ select_by: "btn" }));
  expect(await events(page)).toEqual([
    { event: "error", payload: { select_by: "btn" } },
  ]);
});

test("one-tap prompts, forwards prompt moments and cancels on unmount", async ({
  page,
}) => {
  await open(page, "button-one-tap");
  await expect.poll(() => calls(page, "id.prompt")).toHaveLength(1);

  await page.evaluate(() =>
    window.__gsi.promptMoment({ getMomentType: () => "display" }),
  );
  expect(await events(page)).toEqual([{ event: "prompt", payload: "display" }]);

  await page.getByRole("button", { name: "toggle" }).click();
  await expect.poll(() => calls(page, "id.cancel")).toHaveLength(1);
});

test("remounts into its element once Google's script has loaded", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await open(page, "button");
  await expect(page.getByTestId("gsi-button")).toBeVisible();

  // Mounting again finds the script already loaded
  const toggle = page.getByRole("button", { name: "toggle" });
  await toggle.click();
  await toggle.click();
  await expect(page.getByTestId("gsi-button")).toBeVisible();

  const renders = await calls(page, "id.renderButton");
  expect(renders.map((call) => call.args[0])).toEqual(["[div]", "[div]"]);
  expect(await calls(page, "id.initialize")).toHaveLength(2);
  expect(errors).toEqual([]);
});
