import { CLIENT_ID, calls, events, expect, open, test } from "./fixtures";

const DRIVE = "https://www.googleapis.com/auth/drive.readonly";
const CALENDAR = "https://www.googleapis.com/auth/calendar";

test.describe("useTokenClient", () => {
  test("requests an access token with default and extra scopes", async ({
    page,
  }) => {
    await open(page, "token-client");
    const login = page.getByRole("button", { name: "Get token" });
    await expect(login).toBeEnabled();

    const [init] = await calls(page, "oauth2.initTokenClient");
    expect(init.args[0]).toMatchObject({
      client_id: CLIENT_ID,
      scope: `openid email profile ${DRIVE}`,
      prompt: "consent",
    });

    await login.click();
    expect(await calls(page, "oauth2.requestAccessToken")).toHaveLength(1);
  });

  test("routes token responses to onSuccess and onError", async ({ page }) => {
    await open(page, "token-client");
    await expect(page.getByRole("button", { name: "Get token" })).toBeEnabled();

    const token = { access_token: "ya29.token", scope: DRIVE };
    const error = { error: "access_denied" };
    await page.evaluate(
      ([t, e]) => {
        window.__gsi.tokenResponse(t);
        window.__gsi.tokenResponse(e);
      },
      [token, error],
    );
    expect(await events(page)).toEqual([
      { event: "success", payload: token },
      { event: "error", payload: error },
    ]);
  });

  test("re-creates the client when a scope ref changes", async ({ page }) => {
    await open(page, "token-client");
    await expect(page.getByRole("button", { name: "Get token" })).toBeEnabled();
    await page.getByRole("button", { name: "Add scope" }).click();

    await expect
      .poll(async () =>
        (await calls(page, "oauth2.initTokenClient")).map(
          (call) => (call.args[0] as { scope: string }).scope,
        ),
      )
      .toEqual([
        `openid email profile ${DRIVE}`,
        `openid email profile ${DRIVE} ${CALENDAR}`,
      ]);
  });
});

test.describe("useCodeClient", () => {
  test("requests a code and exposes a redirect URL", async ({ page }) => {
    await open(page, "code-client");
    const login = page.getByRole("button", { name: "Get code" });
    await expect(login).toBeEnabled();

    const [init] = await calls(page, "oauth2.initCodeClient");
    expect(init.args[0]).toMatchObject({
      client_id: CLIENT_ID,
      scope: `openid email profile ${DRIVE}`,
      state: "e2e-state",
    });

    await login.click();
    expect(await calls(page, "oauth2.requestCode")).toHaveLength(1);

    const url = new URL(await page.getByTestId("redirect-url").innerText());
    expect(url.origin + url.pathname).toBe(
      "https://accounts.google.com/o/oauth2/v2/auth",
    );
    expect(Object.fromEntries(url.searchParams)).toMatchObject({
      client_id: CLIENT_ID,
      scope: `openid email profile ${DRIVE}`,
      response_type: "code",
      redirect_uri: new URL(page.url()).origin,
      state: "e2e-state",
    });
  });

  test("routes code responses to onSuccess and onError", async ({ page }) => {
    await open(page, "code-client");
    await expect(page.getByRole("button", { name: "Get code" })).toBeEnabled();

    const code = { code: "4/0Ab", scope: DRIVE };
    const error = { error: "access_denied" };
    await page.evaluate(
      ([c, e]) => {
        window.__gsi.codeResponse(c);
        window.__gsi.codeResponse(e);
      },
      [code, error],
    );
    expect(await events(page)).toEqual([
      { event: "success", payload: code },
      { event: "error", payload: error },
    ]);
  });
});
