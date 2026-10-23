<script setup lang="ts">
import { ref, type Component } from "vue";

const scenarios = import.meta.glob<Component>("./scenarios/*.vue", {
  eager: true,
  import: "default",
});
const name = new URLSearchParams(location.search).get("scenario");
const Scenario = scenarios[`./scenarios/${name}.vue`];
const mounted = ref(true);
</script>

<template>
  <button type="button" @click="mounted = !mounted">toggle</button>
  <component :is="Scenario" v-if="mounted && Scenario" />
  <p v-else-if="!Scenario">Unknown scenario: {{ name }}</p>
</template>
