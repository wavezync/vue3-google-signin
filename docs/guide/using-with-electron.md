---
title: Using with Electron
---

# Using with Electron

Electron like platforms(Tauri/NW.js etc) can use an outdated version of browser/webview.
In such cases Google would block the login attempts and warn about browser compability.

To overcome this problem, you can use the System Web Browser to perform the OAuth2 login for you.

> For example you might have seen this strategy with VSCode GitHub login.

::: info
We do not cover how you need to handle the response. Its based on your platform and its capabilities
:::

## Obtain a login session URL

You can use [`useCodeClient`](../composables/use-code-client.md) for this. It returns `codeRequestRedirectUrl` which can be open up using system browser
with your platform.

In here we have put up an example with Electron.

```ts
const { codeRequestRedirectUrl } = useCodeClient({
  scope,
  // other params
});

// open this url with system browser with Electron
const openLoginSession = () => require('electron').shell.openExternal(codeRequestRedirectUrl);

```

::: tip
Make sure to put `redirect_url` and handle the response correctly in the system broswer. Probably you may want to run some local/remote server to exchange token.

After that to open up the app from system browser can be done using a [Protocol](https://www.electronjs.org/docs/latest/api/protocol) with Electron for an example.

Its also possible to send the tokens to app via a websocket channel too. It depends on your app and platform :smile:
