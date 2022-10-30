---
title: Account Helpers
---

# Account Helpers

This contains helpers for `google.accounts` [namespace](https://developers.google.com/identity/gsi/web/reference/js-reference).

## idRevoke()

- **Type**

```ts
function idRevoke(hint: string, callback?: RevocationCallback): void;
```

- **Details**

This `idRevoke` provides a helper to access `google.accounts.id.revoke` method.
It revokes the OAuth grant used to share the ID token for the specified user.

- **Example**

```ts
import { idRevoke } from "vue3-google-signin"

idRevoke('1618033988749895', done => {
  console.log(done.error);
})
```

- **See More**: [Docs](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.revoke)

## decodeCredential()

- **Type**

```ts
function decodeCredential(credential: string): DecodedGoogleUser;
```

- **Details**

Helper method to decode the JWT token retrieved from the GoogleSignIn onSuccess response into a usable Object

Google returns a jwt token encoded using base64url. This method will help you get a typed object to manipulate the data for your application.

:::info
This is not an official method exposed by google
:::

- **Example**

<<< @/helpers/snippets/decodeJwt.vue

**Output:**

<<< @/helpers/snippets/jwtTokenExample.json
