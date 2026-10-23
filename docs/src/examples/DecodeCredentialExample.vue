<script setup lang="ts">
import type { CredentialResponse } from "vue3-google-signin";
import { GoogleSignInButton, decodeCredential } from "vue3-google-signin";

const handleSignInSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  const decodedCredential = decodeCredential(credential);
  console.log("User:", decodedCredential);
};

const handleSignInError = () => {
  console.error("Signin Failed");
};
</script>

<template>
  <GoogleSignInButton
    @success="handleSignInSuccess"
    @error="handleSignInError"
  />
</template>
