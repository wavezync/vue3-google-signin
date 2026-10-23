<script setup lang="ts">
import {
  GoogleSignInButton,
  type CredentialResponse,
  type CredentialSuccessResponse,
} from "vue3-google-signin";

// handle success event
const handleLoginSuccess = ({ credential }: CredentialSuccessResponse) => {
  // An ID token (JWT). Send it to your server and verify it there.
  console.log("ID token", credential);
};

// handle an error event
const handleLoginError = (response: CredentialResponse) => {
  console.error("Google returned no credential", response);
};
</script>

<template>
  <GoogleSignInButton
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
</template>
