<script setup lang="ts">
import {
  GoogleSignInButton,
  decodeCredential,
  type CredentialResponse,
  type CredentialSuccessResponse,
} from "vue3-google-signin";

const handleSignInSuccess = ({ credential }: CredentialSuccessResponse) => {
  const user = decodeCredential(credential);
  console.log("User:", user);
};

const handleSignInError = (response: CredentialResponse) => {
  console.error("Google returned no credential", response);
};
</script>

<template>
  <GoogleSignInButton
    @success="handleSignInSuccess"
    @error="handleSignInError"
  />
</template>
