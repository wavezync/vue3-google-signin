<script setup lang="ts">
import { useOneTap } from "../../../../src/plugin";

const { isReady, login } = useOneTap({
  disableAutomaticPrompt: true,
  onSuccess: (response) => {
    console.log("Success:", response);
  },
  onError: () => console.error("Error with One Tap Login"),
});
</script>

<template>
  <div class="demo">
    <button :disabled="!isReady" @click="() => login()">
      Trigger One Tap Login Manually
    </button>
  </div>
</template>
