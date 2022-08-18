---
title: Get Started
---

# Get Started

## Prerequisite

This project uses [Google Identity Services](https://developers.google.com/identity/gsi/web) Library under the hood. Its just bunch of helpers
which allows you to develop Vue3 apps with google login :rocket:

You need to configure a project in [Google API Console](https://console.developers.google.com/apis) and obtain a **Client ID** using the following
[:memo: guide](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#get_your_google_api_client_id) from google.

::: tip
:bulb: Make sure to properly configure **Redirects** and **JavaScript Origins** in the Cloud Console.

To PopUps work, you may need to add same URL to **both** Redirects and JavaScript Origins.
:::

::: info
If you want to use the library with Nuxt jump to following [section](#with-nuxt)
:::

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

Now the library is ready to be used :sparkles:

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
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    'nuxt-vue3-google-signin'
  ],
  googleSignIn: {
    clientId: 'CLIENT ID OBTAINED FROM GOOGLE API CONSOLE',
  }
})
```
