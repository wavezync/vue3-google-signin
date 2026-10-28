---
title: Using with Nuxt
description: Add Sign in with Google to Nuxt 3 and 4 with the nuxt-vue3-google-signin module. Auto-imports, the client ID in runtime config, SSR, sessions, protected pages, One Tap in a layout and a client ID per domain.
---

The [nuxt-vue3-google-signin](https://github.com/wavezync/nuxt-vue3-google-signin)
module brings vue3-google-signin to Nuxt 3 and 4. It:

- installs the plugin with the client ID from runtime config,
- auto-imports `GoogleSignInButton`, the composables (`useOneTap`,
  `useTokenClient`, `useCodeClient`, `useGsiScript`) and the helpers
  (`decodeCredential`, `idRevoke`, `hasGrantedAllScopes`,
  `hasGrantedAnyScopes`, `revokeAccessToken`, `buildCodeRequestRedirectUrl`),
- re-exports every type, so you import types from `nuxt-vue3-google-signin`.

Every other guide works the same in Nuxt: leave out the `import` lines. Guides
whose code differs in Nuxt, such as server routes, have a **Nuxt** tab.

## Install

```sh
npx nuxi@latest module add nuxt-vue3-google-signin
```

That installs the package and adds it to `modules`. Then give it your client ID,
either in `.env` (see [below](#set-the-client-id-from-the-environment)) or in
`nuxt.config.ts`:

```ts title="nuxt.config.ts"
export default defineNuxtConfig({
  modules: ["nuxt-vue3-google-signin"],
  googleSignIn: {
    clientId: "1234567890-abc.apps.googleusercontent.com",
  },
});
```

| Option     | Default | Description                                                                                                           |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `clientId` | `""`    | Your client ID. Stored in `runtimeConfig.public.googleSignIn.clientId`.                                               |
| `locale`   |         | Language to load Google's script in, such as `en`. Defaults to the browser's.                                         |
| `plugin`   | `true`  | Set to `false` to install the plugin [yourself](#a-client-id-per-domain), for example per request. Auto-imports stay. |

## Set the client ID from the environment

The client ID lives in Nuxt's runtime config, so the
`NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID` variable overrides it. Leave `clientId`
out of `nuxt.config.ts` and put the variable in `.env` for development:

```sh title=".env"
NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID=1234567890-abc.apps.googleusercontent.com
```

In production, set it where the server runs. One build then serves staging and
production with their own client IDs:

```sh
NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID=your-client-id node .output/server/index.mjs
```

The module warns during a build without a client ID. If you set it when the
server starts, that warning is expected.

:::caution
`clientId: process.env.GOOGLE_CLIENT_ID` in `nuxt.config.ts` is read when you
build, not when the server starts. With `nuxi generate` there is no server, so
the client ID is fixed when you generate.
:::

Read it anywhere with `useRuntimeConfig().public.googleSignIn.clientId`.
Server routes need it to [verify ID tokens](/guide/verify-users/).

## Server-side rendering

You don't need `<ClientOnly>`. On the server:

- `GoogleSignInButton` renders an empty container that reserves the button's
  height, so nothing shifts when Google draws the button.
- The composables return `isReady` as `false`, and `login()` does nothing.

Once the page hydrates, Google's script loads in the browser, buttons render
and `isReady` turns `true`. Prerendered and cached pages work the same.

:::caution[Call composables in setup]
The composables load Google's script when the component mounts, so call them
in a page's or component's `<script setup>`. Calling them in a Nuxt plugin,
route middleware or a server route doesn't work.
:::

`decodeCredential` runs on the server too, but it doesn't check the token's
signature. Verify tokens with google-auth-library, as the next section shows.

## Sign users in with a session

The usual Nuxt setup sends the ID token to a server route, which verifies it
and stores the user in a session cookie with
[nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils). The route,
`server/api/auth/google.post.ts`, is in
[Verify users on your server](/guide/verify-users/#verify-it-on-the-server)
under the **Nuxt** tab. The login page posts to it:

```vue title="pages/login.vue"
<script setup lang="ts">
import type { CredentialSuccessResponse } from "nuxt-vue3-google-signin";

const { fetch: refreshSession } = useUserSession();

async function onSuccess({ credential }: CredentialSuccessResponse) {
  await $fetch("/api/auth/google", { method: "POST", body: { credential } });
  await refreshSession();
  await navigateTo("/");
}
</script>

<template>
  <GoogleSignInButton @success="onSuccess" />
</template>
```

### Protect pages

A route middleware sends signed-out visitors to the login page:

```ts title="middleware/auth.ts"
export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession();
  if (!loggedIn.value) return navigateTo("/login");
});
```

```vue title="pages/dashboard.vue"
<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const { user } = useUserSession();
</script>

<template>
  <h1>Hello {{ user?.name }}</h1>
</template>
```

Protect server routes with `requireUserSession(event)`, which throws a 401 for
signed-out requests.

### One Tap on every page

To offer One Tap wherever a signed-out visitor lands, call `useOneTap` in a
small component and mount it from your layout while nobody is signed in:

```vue title="components/GoogleOneTap.vue"
<script setup lang="ts">
const { fetch: refreshSession } = useUserSession();

useOneTap({
  onSuccess: async ({ credential }) => {
    await $fetch("/api/auth/google", { method: "POST", body: { credential } });
    await refreshSession();
  },
});
</script>

<template>
  <!-- Google draws the prompt itself -->
</template>
```

```vue title="layouts/default.vue"
<script setup lang="ts">
const { loggedIn } = useUserSession();
</script>

<template>
  <GoogleOneTap v-if="!loggedIn" />
  <slot />
</template>
```

When the user signs in, `loggedIn` turns `true`, the component unmounts and the
prompt closes.

### Sign out

```vue title="components/SignOutButton.vue"
<script setup lang="ts">
const { clear } = useUserSession();

async function signOut() {
  await clear();
  // Stops One Tap's autoSelect from signing the user straight back in
  window.google?.accounts.id.disableAutoSelect();
  await navigateTo("/login");
}
</script>

<template>
  <button @click="signOut">Sign out</button>
</template>
```

## Call Google APIs from server routes

Exchanging a code for refresh tokens needs your client secret, so it belongs in
a server route. Keep the secret in private runtime config, which never reaches
the browser:

```ts title="nuxt.config.ts"
export default defineNuxtConfig({
  modules: ["nuxt-vue3-google-signin", "nuxt-auth-utils"],
  runtimeConfig: {
    googleClientSecret: "", // set with NUXT_GOOGLE_CLIENT_SECRET
  },
});
```

[Call Google APIs](/guide/google-apis/#on-your-server) has the page and the
`server/api/google/connect.post.ts` route under its **Nuxt** tabs.

## A client ID per domain

To pick the client ID per request, for example one per domain in a
multi-brand app, turn off the module's plugin and install vue3-google-signin in
your own Nuxt plugin. Add `vue3-google-signin` to your dependencies to import
it.

```ts title="nuxt.config.ts"
export default defineNuxtConfig({
  modules: ["nuxt-vue3-google-signin"],
  googleSignIn: { plugin: false },
});
```

```ts title="plugins/google-sign-in.ts"
import GoogleSignInPlugin from "vue3-google-signin";

export default defineNuxtPlugin((nuxtApp) => {
  const clientId = clientIdFor(useRequestURL().hostname); // your lookup
  nuxtApp.vueApp.use(GoogleSignInPlugin, { clientId });
});
```

With `plugin: false` the client ID isn't in runtime config, so server routes
that verify tokens need the same lookup. The plugin also takes a ref, and each
composable and the button take their own `clientId`. See
[Set the client ID at runtime](/guide/dynamic-client-id/).

## Troubleshooting

### Nothing happens after Google's popup closes

Google's popup reports back to your page with `postMessage`, which a
`Cross-Origin-Opener-Policy: same-origin` header blocks. Modules such as
[nuxt-security](https://github.com/Baroshem/nuxt-security) send that header by default.
Use `same-origin-allow-popups`:

```ts title="nuxt.config.ts"
export default defineNuxtConfig({
  security: {
    headers: { crossOriginOpenerPolicy: "same-origin-allow-popups" },
  },
});
```

### "The given client ID is not found" or "missing required parameter client_id"

Check that the client ID reached the browser: it's in
`useRuntimeConfig().public.googleSignIn.clientId`. If you set it from an
environment variable, set `NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID` where the
server runs. Your page's origin, with its port, must also be listed under
Authorized JavaScript origins for that client ID.

### Upgrading from module 0.x

Version 1.0 of the module uses vue3-google-signin 3, whose option and response
types are named after their composable (`UseTokenClientOptions`,
`TokenClientSuccessResponse`, ...). The old names still work but are
deprecated. The module's options are unchanged. See
[Migrating to v3](/guide/migrating-to-v3/).
