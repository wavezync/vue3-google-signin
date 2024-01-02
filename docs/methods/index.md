---
title: Methods
---

# Methods

## setGoogleClientId()

- **Type**

```ts
function setGoogleClientId(id: string): void;
```

- **Details**

This `setGoogleClientId` is used with the **vue3-google-signin** plugin to initialize the `clientId` dynamically, rather than at the time of installing the app.  
_For example, it can be used when retrieving the clientId from a backend API._

:::tip
:bulb: While the `clientId` value is being loaded, the `isReady` value returned by the [**useCodeClient**](/composables/use-code-client), [**useTokenClient**](/composables/use-token-client), and [**useOneTap**](/composables/use-one-tap) hooks will be **false**. Additionally, the [**GoogleSignInButton**](/components/google-signin-button) component will have its `pointer-events` set to '**none**', and will become clickable after the loading process is complete.
:::

- **Example**

```ts
// some component
import { setGoogleClientId } from "vue3-google-signin";

setGoogleClientId("CLIENT ID OBTAINED FROM GOOGLE API CONSOLE");
```
