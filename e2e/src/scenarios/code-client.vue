<script setup lang="ts">
import { useCodeClient } from "vue3-google-signin";
import { log } from "../log";

const { isReady, login, codeRequestRedirectUrl } = useCodeClient({
  scope: "https://www.googleapis.com/auth/drive.readonly",
  state: "e2e-state",
  onSuccess: (response) => log("success", response),
  onError: (response) => log("error", response),
  onNonOAuthError: (error) => log("nonOAuthError", error),
});
</script>

<template>
  <button type="button" :disabled="!isReady" @click="() => login()">
    Get code
  </button>
  <output data-testid="redirect-url">{{ codeRequestRedirectUrl }}</output>
</template>
