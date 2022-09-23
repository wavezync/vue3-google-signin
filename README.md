# Vue3 Google Sign-in

[![Build](https://github.com/syetalabs/vue3-google-signin/actions/workflows/build.yaml/badge.svg)](https://github.com/syetalabs/vue3-google-signin/actions/workflows/build.yaml) [![npm](https://img.shields.io/npm/v/vue3-google-signin)](https://www.npmjs.com/package/vue3-google-signin) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue3-google-signin) ![npm](https://img.shields.io/npm/dw/vue3-google-signin) ![NPM](https://img.shields.io/npm/l/vue3-google-signin) [![Docs](https://img.shields.io/badge/docs-Read%20Now-green)](https://vue3-google-signin.syetalabs.io/)

Use Google Identity Services with your Vue3 App easily

## Documentation

Full documentation can be accessed [here](https://vue3-google-signin.syetalabs.io/)

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

To easily use the library with **Nuxt3** we have provided a module called [nuxt-vue3-google-signin](https://github.com/syetalabs/nuxt-vue3-google-signin) which take care of proper component registration and plugin initialization :fire:.

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

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
