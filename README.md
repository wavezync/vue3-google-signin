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

import GoogleSignInPlugin from "vue3-google-signin"

app.use(GoogleSignInPlugin, {
  clientId: 'CLIENT ID OBTAINED FROM GOOGLE API CONSOLE',
});

// other config

app.mount("#app");
```

## With Nuxt

To easily use the library with **Nuxt3** we have provided a module called [nuxt-vue3-google-signin](https://github.com/wavezync/nuxt-vue3-google-signin) which take care of proper component registration and plugin initialization :fire:.

### Add package

- With **NPM**

```bash
npm install -S nuxt-vue3-google-signin
```

- With **Yarn**

```bash
yarn add nuxt-vue3-google-signin
```

- With **PNPM**

```bash
pnpm add nuxt-vue3-google-signin
```

### Initialize

Now you can add following entry to the `nuxt.config.ts`(or `nuxt.config.js`)

```ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    'nuxt-vue3-google-signin'
  ],
  googleSignIn: {
    clientId: 'CLIENT ID OBTAINED FROM GOOGLE API CONSOLE',
  }
})
```

## Development

Requires Node.js 22+ and [pnpm](https://pnpm.io/). Recommended IDE: [VSCode](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

```sh
pnpm install
cp .env.example .env   # set VITE_GOOGLE_CLIENT_ID for the dev playground
pnpm dev               # playground (src/App.vue)
pnpm docs:dev          # docs site
pnpm lint
pnpm build             # type-check + library build
```
