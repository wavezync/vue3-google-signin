// Checks the built package (../dist via the workspace link) the way Node and
// SSR frameworks load it. Run `pnpm build` in the repo root first.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { createApp, createSSRApp, defineComponent, h } from "vue";
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

test("the plugin rejects a missing or blank clientId", () => {
  assert.throws(() => createApp({}).use(esm.default), /options object/);
  assert.throws(
    () => createApp({}).use(esm.default, { clientId: "  " }),
    /clientId is required/,
  );
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

test("buildCodeRequestRedirectUrl builds Google's auth code URL", () => {
  const url = new URL(
    esm.buildCodeRequestRedirectUrl({
      client_id: "abc.apps.googleusercontent.com",
      scope: "openid email",
      redirect_uri: "https://example.com/callback",
      state: "xyz",
      hint: "user@example.com",
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
    include_granted_scopes: "true",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    hint: "user@example.com",
    redirect_uri: "https://example.com/callback",
    select_account: "false",
    enable_serial_consent: "false",
    state: "xyz",
  });
});
