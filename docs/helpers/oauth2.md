---
title: OAuth2 Helpers
---

# OAuth2 Helpers

This contains helpers for `google.accounts.oauth2` [namespace](https://developers.google.com/identity/oauth2/web/reference/js-reference).

## hasGrantedAllScopes()

- **Type**

```ts
function hasGrantedAllScopes(
  tokenResponse: TokenResponse,
  firstScope: string,
  ...restScopes: string[]
): boolean;
```

- **Details**

Helper method to access [`google.accounts.oauth2.hasGrantedAllScopes`](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.hasGrantedAllScopes)
Checks if the user granted all the specified scope or scopes.

- **Example**

```ts
import { hasGrantedAllScopes } from "vue3-google-signin";

const tokenResponse = // token response from google
const result = hasGrantedAllScopes(
  tokenResponse,
  "profile",
  "email",
  "https://www.googleapis.com/auth/drive"
);

console.log(result);
```

- **See More**: [Docs](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.hasGrantedAllScopes)

## hasGrantedAnyScopes()

- **Type**

```ts
function hasGrantedAnyScopes(
  tokenResponse: TokenResponse,
  firstScope: string,
  ...restScopes: string[]
): boolean;
```

- **Details**

Helper method to access [`google.accounts.oauth2.hasGrantedAnyScopes`](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.hasGrantedAnyScopes)
Checks if the user granted any the specified scope or scopes.

- **Example**

```ts
import { hasGrantedAnyScopes } from "vue3-google-signin";

const tokenResponse = // token response from google
const result = hasGrantedAnyScopes(
  tokenResponse,
  "profile",
  "email",
  "https://www.googleapis.com/auth/drive"
);

console.log(result);
```

- **See More**: [Docs](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.hasGrantedAnyScopes)

## revokeAccessToken()

- **Type**

```ts
function revokeAccessToken(accessToken: string, done?: () => void);
```

- **Details**

Helper method to access [`google.accounts.oauth2.revoke`](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.revoke)

The revoke method revokes all of the scopes that the user granted to the app. A valid access token is required to revoke the permission.

- **Example**

```ts
import { revokeAccessToken } from "vue3-google-signin";

revokeAccessToken("ACCESS TOKEN FROM GOOGLE", () => {
  console.log("Token revoked");
});
```

- **See More**: [Docs](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.revoke)
