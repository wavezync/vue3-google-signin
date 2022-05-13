<script setup lang="ts">
import useGsiScript from "../composables/useGsiScript";
const { loaded } = useGsiScript();
</script>

<template>
  <button>Hello {{ loaded }}</button>
</template>
