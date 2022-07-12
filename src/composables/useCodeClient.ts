import useGsiScript from "./useGsiScript";
import type {
  CodeClient,
  CodeResponse,
  CodeClientConfig,
} from "@/interfaces/oauth2";
import { inject, unref, watchEffect, ref, readonly, type Ref } from "vue";
import { GoogleClientIdKey } from "@/utils/symbols";
import type { MaybeRef } from "@/utils/types";

/**
 * On success with implicit flow
 */
export type ImplicitFlowSuccessResponse = Omit<
  CodeResponse,
  "error" | "error_description" | "error_uri"
>;

/**
 * On error with implicit flow
 */
export type ImplicitFlowErrorResponse = Pick<
  CodeResponse,
  "error" | "error_description" | "error_uri"
>;

/**
 * Options for Implicit flow
 *
 * @export
 * @interface ImplicitFlowOptions
 * @extends {(Omit<CodeClientConfig, "client_id" | "scope" | "callback">)}
 */
export interface ImplicitFlowOptions
  extends Omit<CodeClientConfig, "client_id" | "scope" | "callback"> {
  /**
   * On success callback
   *
   * @memberof ImplicitFlowOptions
   */
  onSuccess?: (response: ImplicitFlowSuccessResponse) => void;

  /**
   * On error callback
   *
   * @memberof ImplicitFlowOptions
   */
  onError?: (errorResponse: ImplicitFlowErrorResponse) => void;

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
 * Result of composable
 *
 * @export
 * @interface UseCodeClientResult
 */
export interface UseCodeClientResult {
  /**
   * Is script is ready to be used?
   *
   * @type {Readonly<Ref<boolean>>}
   * @memberof UseCodeClientResult
   */
  isReady: Readonly<Ref<boolean>>;

  /**
   * Execute login with code client
   *
   * @memberof UseCodeClientResult
   */
  login: () => void | undefined;
}

/**
 * Initiate login with implicit flow using code client. Return values of the composable can be used
 * to trigger the login flow and determine the readiness of the client.
 * It also provides callbacks such as `onSuccess` and `onError` that can be used to obtain the results from the login client.
 *
 * @export
 * @param {ImplicitFlowOptions} [options={}]
 * @see https://developers.google.com/identity/oauth2/web/guides/use-code-model
 * @return {*}  {UseCodeClientResult}
 */
export default function useCodeClient(
  options: ImplicitFlowOptions = {}
): UseCodeClientResult {
  const { scope = "", onError, onSuccess, ...rest } = options;

  const { scriptLoaded } = useGsiScript();
  const clientId = inject<string>(GoogleClientIdKey);
  const isReady = ref(false);
  let client: CodeClient | undefined;

  watchEffect(() => {
    isReady.value = false;
    if (!scriptLoaded.value) return;

    const scopeValue = unref(scope);
    const scopes = Array.isArray(scopeValue)
      ? scopeValue.join(" ")
      : scopeValue;

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
