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

/**
 * Successful token response
 */
export type TokenClientSuccessResponse = Omit<
  TokenResponse,
  "error" | "error_description" | "error_uri"
>;

/**
 * Token response with an OAuth error
 */
export type TokenClientErrorResponse = Pick<
  TokenResponse,
  "error" | "error_description" | "error_uri"
>;

/**
 * Options for `useTokenClient`
 *
 * @export
 * @interface UseTokenClientOptions
 * @extends {(Omit<TokenClientConfig, "client_id" | "scope" | "callback">)}
 */
export interface UseTokenClientOptions extends Omit<
  TokenClientConfig,
  "client_id" | "scope" | "callback"
> {
  /**
   * On success callback
   *
   * @memberof UseTokenClientOptions
   */
  onSuccess?: (response: TokenClientSuccessResponse) => void;

  /**
   * On error callback
   *
   * @memberof UseTokenClientOptions
   */
  onError?: (errorResponse: TokenClientErrorResponse) => void;

  /**
   * Authorization scopes
   *
   * @type {(MaybeRef<string> | MaybeRef<string[]>)}
   * @see https://developers.google.com/identity/protocols/oauth2/scopes
   * @memberof UseTokenClientOptions
   */
  scope?: MaybeRef<string> | MaybeRef<string[]>;
}

/** @deprecated Renamed to {@link UseTokenClientOptions}. */
export type AuthCodeFlowOptions = UseTokenClientOptions;
/** @deprecated Renamed to {@link TokenClientSuccessResponse}. */
export type AuthCodeFlowSuccessResponse = TokenClientSuccessResponse;
/** @deprecated Renamed to {@link TokenClientErrorResponse}. */
export type AuthCodeFlowErrorResponse = TokenClientErrorResponse;

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
  login: (overrideConfig?: OverridableTokenClientConfig) => void | undefined;
}

/**
 * Initiate login with the implicit flow using a token client. Return values of the composable can be used
 * to trigger the login flow and determine the readiness of the client.
 * It also provides callbacks such as `onSuccess` and `onError` that can be used to obtain the results from the login client.
 *
 * @export
 * @param {UseTokenClientOptions} [options={}]
 * @see https://developers.google.com/identity/oauth2/web/guides/use-token-model
 * @return {*}  {UseTokenClientReturn}
 */
export default function useTokenClient(
  options: UseTokenClientOptions = {},
): UseTokenClientReturn {
  const { scope = "", onError, onSuccess, ...rest } = options;

  const { scriptLoaded } = useGsiScript();
  const clientId = inject<string>(GoogleClientIdKey);
  const isReady = ref(false);
  let client: TokenClient | undefined;

  watchEffect(() => {
    isReady.value = false;
    if (!scriptLoaded.value) return;

    const scopeValue = unref(scope);
    const scopes = Array.isArray(scopeValue)
      ? scopeValue.join(" ")
      : scopeValue;

    client = window.google?.accounts.oauth2.initTokenClient({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      client_id: clientId!,
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
