import { onMounted, onUnmounted, readonly } from "vue";
import useScriptState from "./useScriptState";

function createScriptTag() {
  const scriptTag = document.createElement("script");
  scriptTag.src = "https://accounts.google.com/gsi/client";
  scriptTag.async = true;
  scriptTag.defer = true;

  return scriptTag;
}

export default function useGsiScript() {
  const scriptTag = createScriptTag();
  const { loaded } = useScriptState();
  const isScriptLoaded = readonly(loaded);

  onMounted(() => {
    scriptTag.onload = () => {
      loaded.value = true;
    };
    scriptTag.onerror = () => {
      loaded.value = false;
    };

    if (!window.isLoadingGoogle) {
      document.head.appendChild(scriptTag);
      window.isLoadingGoogle = true;
    }
  });

  onUnmounted(() => {
    if (loaded.value) document.head.removeChild(scriptTag);
  });

  return { isScriptLoaded };
}
