<script setup lang="ts">
import useGsiScript from "../composables/useGsiScript";
const { loaded } = useGsiScript();
</script>

<template>
  <button>Hello btn2 {{ loaded }}</button>
</template>
