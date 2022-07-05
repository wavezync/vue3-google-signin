import { onMounted, onUnmounted, readonly, ref, watch, type Ref } from "vue";

const loaded = ref(!!window.google || false);
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
    if (newCount > 0 && !loaded.value && !isLoading.value) {
      initialize();
    }

    if (newCount === 0 && loaded.value) {
      cleanup();
    }
  }
);

export type UseGsiScriptReturn = {
  scriptLoaded: Readonly<Ref<boolean>>;
  scriptLoadError: Readonly<Ref<boolean>>;
};

/**
 * Use google GSI script in the application.
 *
 * This is automatically called when you use any of
 * the provided composables such as `useOneTap` or using the `GoogleSignInButton` component.
 *
 * No matter how many time this function called, it only loads the script once if it not present.
 *
 * @export
 * @return {*}  {UseGsiScriptReturn}
 */
export default function useGsiScript(): UseGsiScriptReturn {
  onMounted(() => {
    subscriberCount.value++;
  });

  onUnmounted(() => {
    subscriberCount.value--;
  });

  return {
    scriptLoaded: readonly(loaded),
    scriptLoadError: readonly(error),
  };
}
