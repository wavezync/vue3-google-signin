<script setup lang="ts">
import { GoogleSignInButton } from "vue3-google-signin";
import { log } from "../log";
</script>

<template>
  <GoogleSignInButton
    theme="filled_black"
    size="medium"
    shape="pill"
    :width="320"
    login-hint="ada@example.com"
    use-fedcm-for-button
    state="header"
    @success="(response) => log('success', response)"
    @error="(response) => log('error', response)"
  />
</template>
