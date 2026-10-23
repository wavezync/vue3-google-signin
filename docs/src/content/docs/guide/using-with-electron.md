---
title: Using with Electron
description: Run the Google login flow in the system browser from Electron, Tauri and similar platforms.
---

Electron-like platforms (Tauri, NW.js, etc.) may use an outdated browser or webview.
In such cases Google blocks the login attempt and warns about browser compatibility.

To work around this, use the system web browser to perform the OAuth2 login for you.

> For example, VS Code uses this strategy for GitHub login.

:::note
We do not cover how to handle the response. That depends on your platform and its capabilities.
:::

## Obtain a login session URL

Use [`useCodeClient`](/composables/use-code-client/) for this. It returns `codeRequestRedirectUrl`, which you can open in the system browser.

Here is an example with Electron:

```ts
const { codeRequestRedirectUrl } = useCodeClient({
  scope,
  // other params
});

// open this url in the system browser with Electron
const openLoginSession = () =>
  require("electron").shell.openExternal(codeRequestRedirectUrl.value);
```

:::tip
Make sure to set `redirect_url` and handle the response correctly in the system browser. You will probably want to run a local or remote server to exchange the token.

After that, you can reopen the app from the system browser, for example with an Electron [protocol](https://www.electronjs.org/docs/latest/api/protocol).

It's also possible to send the tokens to the app over a WebSocket channel. It depends on your app and platform.
:::
