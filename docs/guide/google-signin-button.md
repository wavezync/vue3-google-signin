---
title: Google SignIn button
---

<script setup lang="ts">
import GoogleSignInButton from "@/components/GoogleSignInButton.vue";
import type { CredentialResponse } from "@/interfaces/accounts";

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  console.log("Login successful", response);
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>

# Google SignIn Button

Adding Google Sign In button anywhere can be done using the provided `GoogleSignInButton` component imported from `vue3-google-signin`.

::: tip
This component is also globally availiable with `GoogleSignInButton` after plugin initialization.
:::


## Using google sign in button

To use the button we can simply import it or use global component as per in above. 
For better IDE support we are going to import it.

```vue
<script setup lang="ts">
import GoogleSignInButton from "vue3-google-singin";
import type { CredentialResponse } from "vue3-google-singin";

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  console.log("Login successful", response);
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>


<template>
  <GoogleSignInButton
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
</template>
```

<div>
  <GoogleSignInButton
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
</div>

