---
title: FAQ
description: Answers about extra OAuth2 scopes, verifying users on your server, custom nonces, closed popups, One Tap not showing, and Nuxt and SSR.
---

## Which one should I use?

- **[`GoogleSignInButton`](/guide/google-signin-button/) or [`useOneTap`](/guide/one-tap-login/)** to sign users in. You get an ID token (`credential`) that says who the user is.
- **[`useTokenClient`](/composables/use-token-client/)** to call Google APIs from the browser. You get a short-lived access token.
- **[`useCodeClient`](/composables/use-code-client/)** to call Google APIs from your server. You get a code that your server exchanges for access and refresh tokens.

## How do I ask for extra scopes, like Drive or Calendar?

Sign-in alone gives you the user's profile. For Google APIs, pass the
[scopes](https://developers.google.com/identity/protocols/oauth2/scopes) to
`useTokenClient` or `useCodeClient`. They are added to `openid email profile`.

```ts
const { login } = useTokenClient({
  scope: ["https://www.googleapis.com/auth/drive.readonly"],
  onSuccess: (response) => {
    if (
      hasGrantedAllScopes(
        response,
        "https://www.googleapis.com/auth/drive.readonly",
      )
    ) {
      // call the Drive API with response.access_token
    }
  },
});
```

Users can untick scopes on the consent screen, so check what they granted with
[`hasGrantedAllScopes`](/helpers/oauth2/) before using a token. Sensitive
scopes also have to be added to your OAuth consent screen in the Google Cloud
console.

## How do I verify the user on my server?

Send the `credential` from `onSuccess` to your server and verify it there, for
example with `verifyIdToken` from
[google-auth-library](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token).
[`decodeCredential`](/helpers/account/) only reads the token; it doesn't check
the signature, so don't use it to authorize anything.

## Can I get an ID token with my own nonce?

Yes. Pass `nonce` to `GoogleSignInButton` or `useOneTap`. The `credential` you
get back is the ID token, with your nonce in its `nonce` claim. This is what
flows such as Sui's zkLogin need. The token and code clients don't return ID
tokens.

## How do I know the user closed the popup?

`useTokenClient` and `useCodeClient` call `onNonOAuthError` when the popup is
closed (`popup_closed`) or can't open (`popup_failed_to_open`). Use it to
re-enable your login button. See
[Creating custom buttons](/guide/creating-custom-buttons/). Google doesn't
report this for `GoogleSignInButton` or One Tap.

## My client ID comes from my server

Pass a ref to the plugin and set it when it arrives. See
[Dynamic Client ID](/guide/dynamic-client-id/).

## The button shows another language for a moment

Google draws a placeholder button in the script's language, which follows the
browser, then swaps in the button in its `locale`. Load the script in the same
language with the plugin's `locale` option:

```ts
app.use(GoogleSignInPlugin, { clientId, locale: "en" });
```

## Google's button is cut off

Google draws the button in an iframe slightly wider than its container. CSS
that limits iframes, such as `iframe { max-width: 100% }` in a reset or a
content stylesheet, clips its right edge. Exclude the button's container from
that rule, or set `max-width: none` on iframes inside it.

## One Tap doesn't show up

- One Tap runs on the browser's FedCM API. After a user closes the prompt, the
  browser waits before showing it again, longer each time.
- Your page's origin, including the port, must be listed under Authorized
  JavaScript origins for your client ID.
- Use `onPromptMomentNotification` to see why it wasn't shown:
  `getSkippedReason()` and `getDismissedReason()` say what happened.
- If you call `login()` yourself, wait until `isReady` is `true`. A `watch` on
  `isReady` is more reliable than a timeout.

## Does it work with Nuxt and SSR?

Yes. Use the [Nuxt module](/guide/#with-nuxt). Components and composables
render on the server and load Google's script once the page is in the browser.
`decodeCredential` works on the server too.

To import types such as `CredentialResponse` in a Nuxt app installed with pnpm,
add `vue3-google-signin` to your own dependencies. pnpm doesn't let you import
packages that only the Nuxt module depends on.
