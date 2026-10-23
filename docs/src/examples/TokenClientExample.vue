<script setup lang="ts">
import {
  useTokenClient,
  type TokenClientSuccessResponse,
  type TokenClientErrorResponse,
} from "vue3-google-signin";

const handleOnSuccess = (response: TokenClientSuccessResponse) => {
  console.log("Access Token: ", response.access_token);
};

const handleOnError = (errorResponse: TokenClientErrorResponse) => {
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  // other options
});
</script>

<template>
  <button :disabled="!isReady" @click="() => login()">Login with Google</button>
</template>
