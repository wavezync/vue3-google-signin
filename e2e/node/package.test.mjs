// Checks the built package (../dist via the workspace link) the way Node and
// SSR frameworks load it. Run `pnpm build` in the repo root first.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { createApp, createSSRApp, defineComponent, h, ref } from "vue";
import { renderToString } from "vue/server-renderer";
import * as esm from "vue3-google-signin";

const require = createRequire(import.meta.url);
const EXPORTS = [
  "GoogleSignInButton",
  "useCodeClient",
  "useGsiScript",
  "useOneTap",
  "useTokenClient",
  "buildCodeRequestRedirectUrl",
  "decodeCredential",
  "hasGrantedAllScopes",
  "hasGrantedAnyScopes",
  "idRevoke",
  "revokeAccessToken",
];

test("require() returns the plugin and every named export", () => {
  const cjs = require("vue3-google-signin");
  assert.equal(typeof cjs.default.install, "function");
  for (const name of EXPORTS) assert.ok(cjs[name], `missing ${name}`);
});

test("import returns the plugin and every named export", () => {
  assert.equal(typeof esm.default.install, "function");
  for (const name of EXPORTS) assert.ok(esm[name], `missing ${name}`);
});

test("the plugin installs without a clientId and warns on an empty one", (t) => {
  const warn = t.mock.method(console, "warn", () => {});
  createApp({}).use(esm.default);
  createApp({}).use(esm.default, { clientId: ref() });
  assert.equal(warn.mock.callCount(), 0);

  for (const clientId of [undefined, "", "  "]) {
    createApp({}).use(esm.default, { clientId });
  }
  assert.equal(warn.mock.callCount(), 3);
  assert.match(warn.mock.calls[0].arguments[0], /clientId is empty/);
});

test("components and composables render on the server", async () => {
  const App = defineComponent({
    setup() {
      esm.useOneTap();
      esm.useTokenClient();
      const { codeRequestRedirectUrl } = esm.useCodeClient();
      return () =>
        h("main", [
          h(esm.GoogleSignInButton, { oneTap: true }),
          h("output", String(codeRequestRedirectUrl.value)),
        ]);
    },
  });
  const app = createSSRApp(App).use(esm.default, { clientId: "ssr-client" });

  const html = await renderToString(app);
  assert.match(html, /<main>/);
  assert.match(html, /<output>null<\/output>/);
  assert.equal(globalThis.window, undefined);
});

test("decodeCredential works without a window", () => {
  const payload = Buffer.from(
    JSON.stringify({ sub: "42", name: "Zoë Ñúñez", email: "z@example.com" }),
  ).toString("base64url");
  const user = esm.decodeCredential(`h.${payload}.s`);
  assert.equal(user.id, "42");
  assert.equal(user.name, "Zoë Ñúñez");
});

test("buildCodeRequestRedirectUrl builds Google's auth code URL", () => {
  const url = new URL(
    esm.buildCodeRequestRedirectUrl({
      client_id: "abc.apps.googleusercontent.com",
      scope: "openid email",
      redirect_uri: "https://example.com/callback",
      state: "xyz",
      login_hint: "user@example.com",
      hosted_domain: "example.com", // deprecated name for hd
      include_granted_scopes: false,
    }),
  );
  assert.equal(
    `${url.origin}${url.pathname}`,
    "https://accounts.google.com/o/oauth2/v2/auth",
  );
  assert.deepEqual(Object.fromEntries(url.searchParams), {
    gsiwebsdk: "3",
    client_id: "abc.apps.googleusercontent.com",
    scope: "openid email",
    include_granted_scopes: "false",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    login_hint: "user@example.com",
    hd: "example.com",
    redirect_uri: "https://example.com/callback",
    select_account: "false",
    enable_serial_consent: "false",
    state: "xyz",
  });
});
