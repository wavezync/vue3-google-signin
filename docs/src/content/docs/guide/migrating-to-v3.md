---
title: Migrating to v3
description: How to update a vue3-google-signin v2 app to v3. Covers the removed UMD build, renamed types, redirect URL parameters, plugin install changes and new features.
---

Most apps update without code changes. Read on if you use the type names, the
UMD build or `buildCodeRequestRedirectUrl`.

## Breaking changes

### No UMD build

The package ships ES modules (`dist/index.js`) and CommonJS
(`dist/index.cjs`). If you loaded `dist/index.umd.js` from a CDN, import the ES
module instead, for example from `https://esm.sh/vue3-google-signin`.

`require("vue3-google-signin")` now returns the plugin and its exports. In v2
it returned an empty object.

### Renamed types

The option and response types are named after their composable. The old names
had the two OAuth flows swapped. They still work but are deprecated.

| v2                            | v3                           |
| ----------------------------- | ---------------------------- |
| `ImplicitFlowOptions`         | `UseCodeClientOptions`       |
| `ImplicitFlowSuccessResponse` | `CodeClientSuccessResponse`  |
| `ImplicitFlowErrorResponse`   | `CodeClientErrorResponse`    |
| `AuthCodeFlowOptions`         | `UseTokenClientOptions`      |
| `AuthCodeFlowSuccessResponse` | `TokenClientSuccessResponse` |
| `AuthCodeFlowErrorResponse`   | `TokenClientErrorResponse`   |

### `buildCodeRequestRedirectUrl` parameters

The URL now carries `login_hint` and `hd`, the parameters Google's OAuth
endpoint documents, instead of `hint` and `hosted_domain`. The old option names
are mapped. `include_granted_scopes` is no longer always `true`.

### Plugin install

The plugin no longer throws. `clientId` is optional, and an empty one, usually
a missing environment variable, logs a warning and leaves sign-in disabled
instead of breaking the whole app. You can drop workarounds like a fake client
ID or skipping `app.use` when the variable isn't set.

If you passed `client_id` to `useTokenClient` or `useCodeClient` to override
the plugin's, use the new `clientId` option.

### Smaller changes

- One Tap and the button no longer send `use_fedcm_for_prompt`. Google ignores
  it now that One Tap always uses FedCM.
- The button's container reserves the button's height (40, 32 or 20px) before
  Google renders it, so the page no longer shifts.
- If Google's script fails to load, the next component that mounts tries again.

## New features

- `onNonOAuthError` on `useTokenClient` and `useCodeClient` reports a closed or
  blocked popup.
- The button's `@error` and `useOneTap`'s `onError` receive Google's response.
- The button's `@success` and `useOneTap`'s `onSuccess` receive a
  `CredentialSuccessResponse`, whose `credential` is always a string, so
  `decodeCredential(credential)` type-checks without a non-null assertion.
- The plugin's `clientId` can be a ref, and every composable and the button
  take their own `clientId`. See [Set the client ID at runtime](/guide/dynamic-client-id/).
- The plugin's `locale` option loads Google's script in your language.
- New Google options: `loginHint`, `hd`, `colorScheme` and `essentialClaims`
  on One Tap and the button; `useFedcmForButton`, `buttonAutoSelect` and
  `state` on the button; `login_hint`, `hd` and `include_granted_scopes` on
  the OAuth clients.
- `decodeCredential` works on the server.
