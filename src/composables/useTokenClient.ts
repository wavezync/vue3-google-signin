import useGsiScript from "./useGsiScript";
import type {
  TokenClientConfig,
  TokenClient,
  TokenResponse,
  OverridableTokenClientConfig,
} from "@/interfaces/oauth2";
import { inject, unref, watchEffect, ref, readonly, type Ref } from "vue";
import { GoogleClientIdKey } from "../utils/symbols";
import type { MaybeRef } from "@/utils/types";
import { isArray } from "@vue/shared";

export interface AuthCodeFlowOptions
  extends Omit<TokenClientConfig, "client_id" | "scope" | "callback"> {
  onSuccess?: (
    response: Omit<TokenResponse, "error" | "error_description" | "error_uri">
  ) => void;
  onError?: (
    errorResponse: Pick<
      TokenResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => void;
  scope?: MaybeRef<string> | MaybeRef<string[]>;
}

export interface UseTokenClientResult {
  isReady: Readonly<Ref<boolean>>;
  login: () => void | undefined;
}

/**
 * Initiate login with implicit flow using code client. Return values of the composable can be used
 * to trigger the login flow and determine the readiness of the client.
 * It also provides callbacks such as `onSuccess` and `onError` that can be used to obtain the results from the login client.
 *
 * @export
 * @param {AuthCodeFlowOptions} - Options
 * @see https://developers.google.com/identity/oauth2/web/guides/use-code-model
 * @return {*}  {UseCodeClientResult}
 */
export default function useTokenClient({
  scope = "",
  onError,
  onSuccess,
  ...rest
}: AuthCodeFlowOptions): UseTokenClientResult {
  const { scriptLoaded } = useGsiScript();
  const clientId = inject<string>(GoogleClientIdKey);
  const isReady = ref(false);
  let client: TokenClient | undefined;

  watchEffect(() => {
    isReady.value = false;
    if (!scriptLoaded.value) return;

    const scopeValue = unref(scope);
    const scopes = isArray(scopeValue) ? scopeValue.join(" ") : scopeValue;

    client = window.google?.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: `openid email profile ${scopes}`,
      callback: (response: TokenResponse) => {
        if (response.error) return onError?.(response);

        onSuccess?.(response);
      },
      ...rest,
    });

    isReady.value = true;
  });

  return {
    isReady: readonly(isReady),
    login: (overrideConfig?: OverridableTokenClientConfig) =>
      client?.requestAccessToken(overrideConfig),
  };
}
