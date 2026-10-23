<script setup lang="ts">
import { GoogleSignInButton } from "vue3-google-signin";
import { log } from "../log";
</script>

<template>
  <GoogleSignInButton
    one-tap
    @prompt-moment-notification="(n) => log('prompt', n.getMomentType())"
  />
</template>
