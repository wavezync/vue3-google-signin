import { ref } from "vue";

export default function useScriptState() {
  const loaded = ref(false);

  return { loaded };
}
