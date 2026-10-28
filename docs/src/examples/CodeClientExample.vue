<script setup lang="ts">
import {
  useCodeClient,
  type CodeClientSuccessResponse,
  type CodeClientErrorResponse,
} from "vue3-google-signin";

const handleOnSuccess = async (response: CodeClientSuccessResponse) => {
  // Send the code to your server, which exchanges it for tokens
  await fetch("/api/google/connect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Google asks your server to check this header in popup mode
      "X-Requested-With": "XmlHttpRequest",
    },
    body: JSON.stringify({ code: response.code }),
  });
};

const handleOnError = (errorResponse: CodeClientErrorResponse) => {
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useCodeClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  // other options
});
</script>

<template>
  <button :disabled="!isReady" @click="() => login()">
    Sign in with Google
  </button>
</template>
