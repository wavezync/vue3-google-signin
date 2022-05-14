import useGsiScript from "./useGsiScript";
import { watch } from "vue";
export interface IGoogleLoginConfig {
  clientId: string;
}

export default function useGoogleLogin(options: IGoogleLoginConfig) {
  const { loaded } = useGsiScript();

  watch(
    () => loaded.value,
    () => {}
  );
}
