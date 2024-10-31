import useGsiScript from "./useGsiScript";
import type {
  CodeClient,
  CodeResponse,
  CodeClientConfig,
} from "@/interfaces/oauth2";
import { inject, unref, watchEffect, ref, readonly, type Ref } from "vue";
import { GoogleClientIdKey } from "@/utils/symbols";
import type { MaybeRef } from "@/utils/types";
import { buildCodeRequestRedirectUrl } from "../utils/oauth2";
import {
  validateInitializeSetup,
  validateLoginSetup,
} from "@/utils/validations";

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
 * @interface UseCodeClientReturn
 */
export interface UseCodeClientReturn {
  /**
   * Is script is ready to be used?
   *
   * @type {Readonly<Ref<boolean>>}
   * @memberof UseCodeClientReturn
   */
  isReady: Readonly<Ref<boolean>>;

  /**
   * Execute login with code client
   *
   * @memberof UseCodeClientReturn
   */
  login: () => void;

  /**
   * Get a URL to perform code request without actually redirecting user.
   * This is useful for platforms like _Electron/Tauri_ for redirecting user with system browser
   *
   * @type {Readonly<ComputedRef<string>>}
   * @memberof UseCodeClientReturn
   */
  codeRequestRedirectUrl: Readonly<Ref<string | null>>;
}

/**
 * Initiate login with implicit flow using code client. Return values of the composable can be used
 * to trigger the login flow and determine the readiness of the client.
 * It also provides callbacks such as `onSuccess` and `onError` that can be used to obtain the results from the login client.
 *
 * @export
 * @param {ImplicitFlowOptions} [options={}]
 * @see https://developers.google.com/identity/oauth2/web/guides/use-code-model
 * @return {*}  {UseCodeClientReturn}
 */
export default function useCodeClient(
  options: ImplicitFlowOptions = {},
): UseCodeClientReturn {
  const { scope = "", onError, onSuccess, ...rest } = options;

  const { scriptLoaded } = useGsiScript();
  const clientId = inject(GoogleClientIdKey);
  const isReady = ref(false);
  const codeRequestRedirectUrl = ref<string | null>(null);
  let client: CodeClient | undefined;

  const login = () => {
    if (!validateLoginSetup(isReady.value, clientId?.value)) return;

    client?.requestCode();
  };

  watchEffect(() => {
    isReady.value = false;
    if (!validateInitializeSetup(scriptLoaded.value, clientId?.value)) return;

    const scopeValue = unref(scope);
    const scopes = Array.isArray(scopeValue)
      ? scopeValue.join(" ")
      : scopeValue;
    const computedScopes = `openid email profile ${scopes}`;

    codeRequestRedirectUrl.value = buildCodeRequestRedirectUrl({
      client_id: clientId!.value,
      scope: computedScopes,
      ...rest,
    });

    client = window.google?.accounts.oauth2.initCodeClient({
      client_id: clientId!.value,
      scope: computedScopes,
      callback: (response: CodeResponse) => {
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
    codeRequestRedirectUrl: readonly(codeRequestRedirectUrl),
  };
}
