# Vue3 Google Sign-in

[![Build](https://github.com/wavezync/vue3-google-signin/actions/workflows/build.yaml/badge.svg)](https://github.com/wavezync/vue3-google-signin/actions/workflows/build.yaml) [![npm](https://img.shields.io/npm/v/vue3-google-signin)](https://www.npmjs.com/package/vue3-google-signin) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue3-google-signin) ![npm](https://img.shields.io/npm/dw/vue3-google-signin) ![NPM](https://img.shields.io/npm/l/vue3-google-signin) [![Docs](https://img.shields.io/badge/docs-Read%20Now-green)](https://vue3-google-signin.wavezync.com/)

Use Google Identity Services with your Vue3 App easily

## Documentation

Full documentation can be accessed [here](https://vue3-google-signin.wavezync.com/)

## Installation

- With **NPM**

```bash
npm install -S vue3-google-signin
```

- With **Yarn**

```bash
yarn add vue3-google-signin
```

- With **PNPM**

```bash
pnpm add vue3-google-signin
```

## Setup the Library

Setting up the library is very simple. In your application entry point(`main.js` or `main.ts`)
put the following code.

```js
// rest of the code

import GoogleSignInPlugin from "vue3-google-signin";

app.use(GoogleSignInPlugin, {
  clientId: "CLIENT ID OBTAINED FROM GOOGLE API CONSOLE",
});

// other config

app.mount("#app");
```

## With Nuxt

For **Nuxt 3 and 4**, add the [nuxt-vue3-google-signin](https://github.com/wavezync/nuxt-vue3-google-signin) module. It installs the plugin and auto-imports the component, composables and helpers.

```sh
npx nuxi@latest module add nuxt-vue3-google-signin
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["nuxt-vue3-google-signin"],
  googleSignIn: {
    clientId: "CLIENT ID OBTAINED FROM GOOGLE API CONSOLE",
  },
});
```

Or leave `clientId` out and set `NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID` when the server starts. The [Nuxt guide](https://vue3-google-signin.wavezync.com/guide/nuxt/) covers SSR, sessions, protected pages and server routes.

## Development

Requires Node.js 22+ and [pnpm](https://pnpm.io/). Recommended IDE: [VSCode](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

```sh
pnpm install
cp .env.example .env   # set VITE_GOOGLE_CLIENT_ID for the dev playground
pnpm dev               # playground (src/App.vue)
pnpm docs:dev          # docs site
pnpm lint
pnpm build             # type-check + library build
pnpm test              # build, then E2E tests (Playwright uses your installed Chrome)
```
