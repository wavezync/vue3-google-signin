<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import useCodeClient from "@/composables/useCodeClient";

const handleOnSuccess = (response: any) => {
  console.log("Success: ", response);
};

const handleOnError = (response: any) => {
  console.log("Error: ", response);
};

const { isReady, login } = useCodeClient({
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
