<script setup lang="ts">
import { useOneTap } from "vue3-google-signin";
import { log } from "../log";

useOneTap({
  autoSelect: true,
  cancelOnTapOutside: false,
  context: "signin",
  onSuccess: (response) => log("success", response),
  onError: () => log("error"),
  onPromptMomentNotification: (n) => log("prompt", n.getMomentType()),
});
</script>

<template>
  <p>One Tap</p>
</template>
