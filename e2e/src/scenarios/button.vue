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
    @success="(response) => log('success', response)"
    @error="() => log('error')"
  />
</template>
