<script setup lang="ts">
import useGsiScript from "../composables/useGsiScript";
const { loaded: isScriptLoaded } = useGsiScript();
</script>

<template>
  <button>Hello {{ isScriptLoaded }}</button>
</template>
