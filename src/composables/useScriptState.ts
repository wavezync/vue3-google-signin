import { ref } from "vue";

export default function useScriptState() {
  const loaded = ref(false);
  const error = ref(false);
  const scriptInitialized = ref(false);

  return { loaded, error, scriptInitialized };
}
