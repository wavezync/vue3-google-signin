---
title: Creating Custom Buttons
---

<script setup lang="ts">
import { shallowRef, onMounted } from "vue"

const tokenClientDemo = shallowRef(null)
const codeClientDemo = shallowRef(null)

onMounted(async () => {
  const tokenClientDemoComponent = await import("./demo/creating-custom-buttons/TokenClientDemo.vue")
  const codeClientDemoComponent = await import("./demo/creating-custom-buttons/CodeClientDemo.vue")

  tokenClientDemo.value = tokenClientDemoComponent.default
  codeClientDemo.value = codeClientDemoComponent.default
})
</script>

# Creating Custom Buttons

Often, you may want to use a custom designed button to handle Google Sign In.
`vue3-google-signin` provides two composables to create a custom button.


- `useTokenClient` : [Token Model authentication flow](https://developers.google.com/identity/oauth2/web/guides/use-token-model)
- `useCodeClient` : [Code Model authentication flow](https://developers.google.com/identity/oauth2/web/guides/use-code-model)

Based on your usecase, you can select the best flow for you.

:::tip
:bulb: To select the proper user authorization model, checkout this [guide](https://developers.google.com/identity/oauth2/web/guides/choose-authorization-model)
:::

## With `useTokenClient`

With [Token Model Auth flow](https://developers.google.com/identity/oauth2/web/guides/use-token-model) an **Access Token** is returned from
Google to the browser, which can be used directly to call Google APIs.

::: tip
:bulb: For backend API requests, you can pass this token from the frontend to backend with a header like `x-google-token`
:::

Both composables returns `isReady` and `login` to work with the authentication flow.

- `isReady` is a *reactive variable* you can use to determine whether the Google API properly loaded before triggering the action.
It can be used to disable button or do whatever you see fit your application.

- `login` is a *method* which can be trigger to initiate the login flow with Google.

In our example code, we have disabled the button until the API properly loaded and triggering the login flow with `login` function
using the button's `@click` event.

<<< @/guide/snippets/creating-custom-buttons/with-token-client-snippet.vue

<ClientOnly>
  <component
    v-if="tokenClientDemo"
    :is="tokenClientDemo">
  </component>
</ClientOnly>

## With `useCodeClient`

With [Code Model authentication flow](https://developers.google.com/identity/oauth2/web/guides/use-code-model) you are getting an `code` from Google, which can be verified from a **Backend Server** to obtain user informations, Access Token, Refresh Token etc.

The usage of this composable is similar to to the above section.

Only difference here is we have added an *optional* section which calls a backend API to verify the code.
Its using body of a **POST** request to do the verification.

<<< @/guide/snippets/creating-custom-buttons/with-code-client-snippet.vue

<ClientOnly>
  <component
    v-if="codeClientDemo"
    :is="codeClientDemo">
  </component>
</ClientOnly>


## Verify code on the backend

When you obtain a code, the backend needs to verify in order to get the **AccessToken**/**RefreshToken** as per previous [section](#with-usecodeclient).

::: info
:bulb: This depends on your backend programming language.
:::

But for sake of completeness, we will provide a simple snipppet to do the verification and obtain tokens in **Node.js** with [**Express**](https://expressjs.com/) framework.

First of all you will need to obtain the followings from [Google Developers Console](https://console.cloud.google.com/)

- `CLIENT_ID`
- `CLIENT_SECRET`
- `REDIRECT_URL`

You can find them in **Your project > APIs & auth > Credentials**

Read more about OAuth2 [here](https://developers.google.com/identity/protocols/oauth2)

Now for Node.js, you need to install [`google-auth-library`](https://www.npmjs.com/package/google-auth-library) package.

```bash
npm i -S google-auth-library
```

This is a sample implementation using ExpressJS.

<<< @/guide/snippets/creating-custom-buttons/code-verification.js

::: danger
:rotating_light: You **must** store Refresh Tokens in a **secure storage**
:::
