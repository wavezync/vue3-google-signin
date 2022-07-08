<script setup lang="ts">
import useTokenClient, {
  type AuthCodeFlowErrorResponse,
  type AuthCodeFlowSuccessResponse,
} from "./composables/useTokenClient";

const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
  console.log("Access Token: ", response.access_token);
};

const handleOnError = (response: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", response);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
});
</script>

<template>
  <button :disabled="!isReady" @click="() => login()">Login with Google</button>
</template>
