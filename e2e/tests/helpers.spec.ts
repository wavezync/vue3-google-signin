import { calls, expect, open, test } from "./fixtures";

// Helpers need window.google, so load any scenario that loads the script.
test.beforeEach(async ({ page }) => {
  await open(page, "script");
  await expect(page.getByTestId("script-loaded")).toHaveText("true");
});

test("decodeCredential reads UTF-8 claims from the ID token", async ({
  page,
}) => {
  const user = await page.evaluate(() => {
    const encode = (value: object) =>
      btoa(
        String.fromCharCode(...new TextEncoder().encode(JSON.stringify(value))),
      )
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    const payload = {
      sub: "1234567890",
      email: "zoe@example.com",
      email_verified: true,
      name: "Zoë Ünal",
      given_name: "Zoë",
      family_name: "Ünal",
      picture: "https://example.com/zoe.png",
      iat: 1,
      exp: 2,
    };
    return window.__lib.decodeCredential(
      `${encode({ alg: "RS256" })}.${encode(payload)}.sig`,
    );
  });
  expect(user).toEqual({
    id: "1234567890",
    email: "zoe@example.com",
    email_verified: true,
    name: "Zoë Ünal",
    given_name: "Zoë",
    family_name: "Ünal",
    picture: "https://example.com/zoe.png",
    iat: 1,
    exp: 2,
  });
});

test("idRevoke revokes by hint and forwards Google's response", async ({
  page,
}) => {
  const response = await page.evaluate(
    () =>
      new Promise((resolve) =>
        window.__lib.idRevoke("user@example.com", resolve),
      ),
  );
  expect(response).toEqual({ successful: true });
  expect((await calls(page, "id.revoke"))[0].args).toEqual([
    "user@example.com",
  ]);
});

test("scope helpers delegate to Google", async ({ page }) => {
  const result = await page.evaluate(() => {
    const token = { access_token: "t", scope: "email profile" } as never;
    const { hasGrantedAllScopes, hasGrantedAnyScopes } = window.__lib;
    return [
      hasGrantedAllScopes(token, "email", "profile"),
      hasGrantedAllScopes(token, "email", "drive"),
      hasGrantedAnyScopes(token, "drive", "email"),
      hasGrantedAnyScopes(token, "drive"),
    ];
  });
  expect(result).toEqual([true, false, true, false]);
});

test("revokeAccessToken revokes the token and calls back", async ({ page }) => {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        window.__lib.revokeAccessToken("ya29.token", resolve),
      ),
  );
  expect((await calls(page, "oauth2.revoke"))[0].args).toEqual(["ya29.token"]);
});
