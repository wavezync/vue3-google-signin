<script setup lang="ts">
import { ref } from "vue";
import {
  useTokenClient,
  type TokenClientSuccessResponse,
  type TokenClientErrorResponse,
} from "vue3-google-signin";

const pending = ref(false);

const handleOnSuccess = (response: TokenClientSuccessResponse) => {
  pending.value = false;
  console.log("Access Token: ", response.access_token);
};

const handleOnError = (errorResponse: TokenClientErrorResponse) => {
  pending.value = false;
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  // The user closed the popup, or it was blocked
  onNonOAuthError: () => (pending.value = false),
  // other options
});

const signIn = () => {
  pending.value = true;
  login();
};
</script>

<template>
  <button :disabled="!isReady || pending" @click="signIn">
    Sign in with Google
  </button>
</template>
