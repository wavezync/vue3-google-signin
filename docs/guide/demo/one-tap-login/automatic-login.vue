<script setup lang="ts">
import { useOneTap } from "../../../../src/plugin";

useOneTap({
  onSuccess: (response) => {
    console.log("Success:", response);
  },
  onError: () => console.error("Error with One Tap Login"),
});
</script>

<template>
  <div class=""></div>
</template>
