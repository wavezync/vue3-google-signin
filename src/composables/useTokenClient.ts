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
import { toPluginError } from "@/utils/logs";

/**
 * Success response
 */
export type AuthCodeFlowSuccessResponse = Omit<
  TokenResponse,
  "error" | "error_description" | "error_uri"
>;

/**
 * Error response
 */
export type AuthCodeFlowErrorResponse = Pick<
  TokenResponse,
  "error" | "error_description" | "error_uri"
>;

/**
 * Auth Code Flow Options
 *
 * @export
 * @interface AuthCodeFlowOptions
 * @extends {(Omit<TokenClientConfig, "client_id" | "scope" | "callback">)}
 */
export interface AuthCodeFlowOptions
  extends Omit<TokenClientConfig, "client_id" | "scope" | "callback"> {
  /**
   * On success callback
   *
   * @memberof AuthCodeFlowOptions
   */
  onSuccess?: (response: AuthCodeFlowSuccessResponse) => void;

  /**
   * On error callback
   *
   * @memberof AuthCodeFlowOptions
   */
  onError?: (errorResponse: AuthCodeFlowErrorResponse) => void;

  /**
   * Authorization scopes
   *
   * @type {(MaybeRef<string> | MaybeRef<string[]>)}
   * @see https://developers.google.com/identity/protocols/oauth2/scopes
   * @memberof ImplicitFlowOptions
   */
  scope?: MaybeRef<string> | MaybeRef<string[]>;
}

/**
 * Token Client Result
 *
 * @export
 * @interface UseTokenClientReturn
 */
export interface UseTokenClientReturn {
  /**
   * Is script ready to be used?
   *
   * @type {Readonly<Ref<boolean>>}
   * @memberof UseTokenClientReturn
   */
  isReady: Readonly<Ref<boolean>>;

  /**
   * Invoke login flow. You can provide a `OverridableTokenClientConfig` to override the login flow options.
   *
   * @memberof UseTokenClientReturn
   */
  login: (overrideConfig?: OverridableTokenClientConfig) => void;
}

/**
 * Initiate login with authcode flow using token client. Return values of the composable can be used
 * to trigger the login flow and determine the readiness of the client.
 * It also provides callbacks such as `onSuccess` and `onError` that can be used to obtain the results from the login client.
 *
 * @export
 * @param {AuthCodeFlowOptions} [options={}]
 * @see https://developers.google.com/identity/oauth2/web/guides/use-token-model
 * @return {*}  {UseTokenClientReturn}
 */
export default function useTokenClient(
  options: AuthCodeFlowOptions = {}
): UseTokenClientReturn {
  const { scope = "", onError, onSuccess, ...rest } = options;

  const { scriptLoaded } = useGsiScript();
  const clientId = inject(GoogleClientIdKey);
  const isReady = ref(false);
  let client: TokenClient | undefined;

  const login = (overrideConfig?: OverridableTokenClientConfig) => {
    if (!isReady.value)
      throw new Error(
        toPluginError(
          "Set clientId in options or use setClientId to initialize."
        )
      );

    client?.requestAccessToken(overrideConfig);
  };

  watchEffect(() => {
    isReady.value = false;
    if (!scriptLoaded.value) return;
    if (!clientId?.value) return;

    const scopeValue = unref(scope);
    const scopes = Array.isArray(scopeValue)
      ? scopeValue.join(" ")
      : scopeValue;

    client = window.google?.accounts.oauth2.initTokenClient({
      client_id: clientId.value,
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
    login,
  };
}
