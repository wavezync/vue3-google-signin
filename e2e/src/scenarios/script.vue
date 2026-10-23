<script setup lang="ts">
import { useGsiScript } from "vue3-google-signin";

const { scriptLoaded, scriptLoadError } = useGsiScript();
</script>

<template>
  <output data-testid="script-loaded">{{ scriptLoaded }}</output>
  <output data-testid="script-error">{{ scriptLoadError }}</output>
</template>
