import { onMounted, readonly, ref, type Ref } from "vue";

const loaded = ref(false);
const error = ref(false);
let script: HTMLScriptElement | undefined;

// Runs on mount only, so nothing touches the DOM during SSR
const load = () => {
  if (script) return;
  script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  script.addEventListener("load", () => {
    loaded.value = true;
    error.value = false;
  });
  script.addEventListener("error", () => {
    error.value = true;
    // Let the next component that mounts try again
    script?.remove();
    script = undefined;
  });
  document.head.append(script);
};

export type UseGsiScriptReturn = {
  /**
   * Script loaded successfully
   *
   * @type {Readonly<Ref<boolean>>}
   */
  scriptLoaded: Readonly<Ref<boolean>>;

  /**
   * Failed to load the GSI script
   *
   * @type {Readonly<Ref<boolean>>}
   */
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
  onMounted(load);

  return {
    scriptLoaded: readonly(loaded),
    scriptLoadError: readonly(error),
  };
}
