<script setup lang="ts">
import type { CredentialResponse } from "vue3-google-signin";
import { GoogleSignIn } from "vue3-google-signin";
import { decodeJWTToken } from "vue3-google-signin/utils";

const handleSignInSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  const decodedCredential = decodeJWTToken(credential);
  console.log("Acess Token", decodedCredential);
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
