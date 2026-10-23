<script setup lang="ts">
import { ref } from "vue";
import { useTokenClient } from "vue3-google-signin";
import { log } from "../log";

const scope = ref(["https://www.googleapis.com/auth/drive.readonly"]);
const { isReady, login } = useTokenClient({
  scope,
  prompt: "consent",
  onSuccess: (response) => log("success", response),
  onError: (response) => log("error", response),
});
const addScope = () => {
  scope.value = [...scope.value, "https://www.googleapis.com/auth/calendar"];
};
</script>

<template>
  <button type="button" :disabled="!isReady" @click="() => login()">
    Get token
  </button>
  <button type="button" @click="addScope">Add scope</button>
</template>
