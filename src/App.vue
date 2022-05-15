<script setup lang="ts">
import GoogleLoginButton from "./components/GoogleLoginButton.vue";
import type { CredentialResponse } from "./interfaces/accounts";

const onLoginSuccessCallback = (resp: CredentialResponse) => {
  console.log("Login successful", resp);
};

const onLoginErrorCallback = () => {
  console.log("Login failed");
};
</script>

<template>
  <GoogleLoginButton
    @on-login-success="onLoginSuccessCallback"
    @on-login-error="onLoginErrorCallback"
    size="large"
  ></GoogleLoginButton>
</template>
