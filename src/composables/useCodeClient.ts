import useGsiScript from "./useGsiScript";
import type {
  CodeClient,
  CodeResponse,
  CodeClientConfig,
} from "@/interfaces/oauth2";
import { inject, unref, watchEffect, ref, readonly, type Ref } from "vue";
import { GoogleClientIdKey } from "@/utils/symbols";
import type { MaybeRef } from "@/utils/types";
import { isArray } from "@vue/shared";

export interface ImplicitFlowOptions
  extends Omit<CodeClientConfig, "client_id" | "scope" | "callback"> {
  onSuccess?: (
    response: Omit<CodeResponse, "error" | "error_description" | "error_uri">
  ) => void;
  onError?: (
    errorResponse: Pick<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => void;
  scope?: MaybeRef<string> | MaybeRef<string[]>;
}

export interface UseCodeClientResult {
  isReady: Readonly<Ref<boolean>>;
  login: () => void | undefined;
}

/**
 * Initiate login with implicit flow using code client. Return values of the composable can be used
 * to trigger the login flow and determine the readiness of the client.
 * It also provides callbacks such as `onSuccess` and `onError` that can be used to obtain the results from the login client.
 *
 * @export
 * @param {ImplicitFlowOptions} - Options
 * @see https://developers.google.com/identity/oauth2/web/guides/use-code-model
 * @return {*}  {UseCodeClientResult}
 */
export default function useCodeClient({
  scope = "",
  onError,
  onSuccess,
  ...rest
}: ImplicitFlowOptions): UseCodeClientResult {
  const { scriptLoaded } = useGsiScript();
  const clientId = inject<string>(GoogleClientIdKey);
  const isReady = ref(false);
  let client: CodeClient | undefined;

  watchEffect(() => {
    isReady.value = false;
    if (!scriptLoaded.value) return;

    const scopeValue = unref(scope);
    const scopes = isArray(scopeValue) ? scopeValue.join(" ") : scopeValue;

    client = window.google?.accounts.oauth2.initCodeClient({
      client_id: clientId,
      scope: `openid email profile ${scopes}`,
      callback: (response: CodeResponse) => {
        if (response.error) return onError?.(response);

        onSuccess?.(response);
      },
      ...rest,
    });

    isReady.value = true;
  });

  return { isReady: readonly(isReady), login: () => client?.requestCode() };
}
