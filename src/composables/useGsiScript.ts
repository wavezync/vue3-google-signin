import { onMounted, onUnmounted, readonly, ref, watch } from "vue";

const loaded = ref(false);
const isLoading = ref(false);
const error = ref(false);
const subscriberCount = ref(0);

let scriptTag: HTMLScriptElement | null = null;

const createScriptTag = () => {
  const scriptTag = document.createElement("script");
  scriptTag.src = "https://accounts.google.com/gsi/client";
  scriptTag.async = true;
  scriptTag.defer = true;

  return scriptTag;
};

const initialize = () => {
  scriptTag = createScriptTag();
  document.head.appendChild(scriptTag);
  isLoading.value = true;

  scriptTag.onload = () => {
    isLoading.value = false;
    loaded.value = true;
  };

  scriptTag.onerror = () => {
    isLoading.value = false;
    error.value = true;
  };
};

const cleanup = () => {
  scriptTag && document.head.removeChild(scriptTag);
  loaded.value = false;
  error.value = false;
};

watch(
  () => subscriberCount.value,
  (newCount, _oldCount) => {
    if (newCount > 0 && !isLoading.value && !loaded.value) {
      initialize();
    }

    if (newCount === 0 && loaded.value) {
      cleanup();
    }
  }
);

export default function useGsiScript() {
  onMounted(() => {
    subscriberCount.value++;
  });

  onUnmounted(() => {
    subscriberCount.value--;
  });

  return {
    loaded: readonly(loaded),
    error: readonly(error),
  };
}
