<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import useTokenClient from "@/composables/useTokenClient";

const handleOnSuccess = (response: any) => {
  console.log("Success: ", response);
  console.log(`Sending code ${response.code} to the backend server...`);
  console.log("Oops...we were lazy to do that here :).");
};

const handleOnError = (response: any) => {
  console.log("Error: ", response);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
});
</script>

<template>
  <div class="demo">
    <button :disabled="!isReady" @click="() => login()">
      Login with Google
    </button>
  </div>
</template>
