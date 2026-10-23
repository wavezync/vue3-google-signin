<script setup lang="ts">
import {
  GoogleSignInButton,
  useOneTap,
  useTokenClient,
} from "vue3-google-signin";

useOneTap({ disableAutomaticPrompt: true });
useTokenClient();
</script>

<template>
  <GoogleSignInButton />
  <GoogleSignInButton />
</template>
