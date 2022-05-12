<script setup lang="ts">
import useGsiScript from "../composables/useGsiScript";
const { isScriptLoaded } = useGsiScript();
</script>

<template>
  <button>Hello btn2 {{ isScriptLoaded }}</button>
</template>
