<script setup lang="ts">
import { useOneTap } from "vue3-google-signin";

const { isReady, login } = useOneTap({ disableAutomaticPrompt: true });
</script>

<template>
  <button type="button" :disabled="!isReady" @click="login">One Tap</button>
</template>
