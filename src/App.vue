<script setup lang="ts">
import GoogleLoginButton from "./components/GoogleLoginButton.vue";
import type { CredentialResponse } from "./interfaces/accounts";
import useCodeClient from "./composables/useCodeClient";
import { ref } from "vue";
import useTokenClient from "./composables/useTokenClient";

const scope = ref("");

const onLoginSuccessCallback = (resp: CredentialResponse) => {
  console.log("Login successful", resp);
};

const onLoginErrorCallback = () => {
  console.log("Login failed");
};

const { isReady: isCodeClientReady, login: loginCodeClient } = useCodeClient({
  scope,
  onSuccess: (resp) => console.log(resp),
  onError: (resp) => console.error(resp),
  ux_mode: "popup",
});

const { isReady: isTokenClientReady, login: loginTokenClient } = useTokenClient(
  {
    scope,
    onSuccess: (resp) => console.log(resp),
    onError: (resp) => console.error(resp),
    prompt: "consent",
  }
);
</script>

<template>
  <GoogleLoginButton
    @on-login-success="onLoginSuccessCallback"
    @on-login-error="onLoginErrorCallback"
    size="large"
  ></GoogleLoginButton>

  <input placeholder="Scopes" v-model="scope" />
  <button @click="loginCodeClient" :disabled="!isCodeClientReady">
    Login Code Client
  </button>

  <button @click="() => loginTokenClient()" :disabled="!isTokenClientReady">
    Login Token Client
  </button>
</template>
