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
