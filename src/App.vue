<script setup lang="ts">
import useGsiScript from "./composables/useGsiScript";
import GoogleLoginButton from "./components/GoogleLoginButton.vue";
import GoogleLoginOneTapButton from "./components/GoogleLoginOneTapButton.vue";
const { loaded: isScriptLoaded } = useGsiScript();
</script>

<template>
  <h1>Hello World</h1>
  <h2>Loaded {{ isScriptLoaded }}</h2>

  <google-login-button></google-login-button>
  <google-login-one-tap-button></google-login-one-tap-button>

  <div>hello</div>
</template>
