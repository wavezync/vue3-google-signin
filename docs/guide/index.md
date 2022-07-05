---
title: Get Started
---

# Get Started

## Prerequisite

This project uses [Google Identity Services](https://developers.google.com/identity/gsi/web) Library under the hood. Its just bunch of helpers
which allows you to develop Vue3 apps with google login :rocket:

You need to configure a project in [Google API Console](https://console.developers.google.com/apis) and obtain a **Client ID** using the following
[:memo: guide](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#get_your_google_api_client_id) from google.

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

import GoogleOauth2Plugin from "vue3-google-signin"

app.use(GoogleOauth2Plugin, {
  clientId: 'CLIENT ID OBTAINED FROM GOOGLE API CONSOLE',
});

// other config

app.mount("#app");
```

Now the library is ready to be used :sparkles:
