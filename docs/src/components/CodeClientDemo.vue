<script setup lang="ts">
import { useCodeClient } from "vue3-google-signin";

const { isReady, login } = useCodeClient({
  onSuccess: (response) => console.log("Code:", response.code),
  onError: (error) => console.error("Error:", error),
});
</script>

<template>
  <button :disabled="!isReady" @click="() => login()">
    Sign in with Google
  </button>
</template>
