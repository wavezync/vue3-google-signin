<script setup lang="ts">
import {
  useCodeClient,
  type ImplicitFlowSuccessResponse,
  type ImplicitFlowErrorResponse,
} from "vue3-google-signin";

const handleOnSuccess = async (response: ImplicitFlowSuccessResponse) => {
  // send code to a backend server to verify it.
  console.log("Code: ", response.code);

  // use axios or something to reach backend server
  const result = await fetch("https://YOUR_BACKEND/code/verify", {
    method: "POST",
    body: JSON.stringify({
      code: response.code,
    }),
  });
};

const handleOnError = (errorResponse: ImplicitFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useCodeClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  // other options
});
</script>

<template>
  <button :disabled="!isReady" @click="() => login()">Login with Google</button>
</template>
