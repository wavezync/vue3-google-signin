<script setup lang="ts">
import { GoogleSignInButton, useTokenClient } from "vue3-google-signin";

useTokenClient({ clientId: "token-client-id" });
</script>

<template>
  <GoogleSignInButton client-id="button-client-id" />
</template>
