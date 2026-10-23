import useGsiScript from "./useGsiScript";
import type {
  CodeClient,
  CodeResponse,
  CodeClientConfig,
  NonOAuthError,
} from "@/interfaces/oauth2";
import { unref, watchEffect, ref, readonly, type Ref } from "vue";
import { useClientId } from "@/utils/symbols";
import type { MaybeRef } from "@/utils/types";
import { buildCodeRequestRedirectUrl } from "../utils/oauth2";

/**
 * Successful code response
 */
export type CodeClientSuccessResponse = Omit<
  CodeResponse,
  "error" | "error_description" | "error_uri"
>;

/**
 * Code response with an OAuth error
 */
export type CodeClientErrorResponse = Pick<
  CodeResponse,
  "error" | "error_description" | "error_uri"
>;

/**
 * Options for `useCodeClient`
 *
 * @export
 * @interface UseCodeClientOptions
 * @extends {(Omit<CodeClientConfig, "client_id" | "scope" | "callback" | "error_callback">)}
 */
export interface UseCodeClientOptions extends Omit<
  CodeClientConfig,
  "client_id" | "scope" | "callback" | "error_callback"
> {
  /**
   * On success callback
   *
   * @memberof UseCodeClientOptions
   */
  onSuccess?: (response: CodeClientSuccessResponse) => void;

  /**
   * On error callback
   *
   * @memberof UseCodeClientOptions
   */
  onError?: (errorResponse: CodeClientErrorResponse) => void;

  /**
   * Called when the flow ends without an OAuth response,
   * for example when the user closes the popup or it can't be opened
   *
   * @see https://developers.google.com/identity/oauth2/web/reference/js-reference#CodeClientConfig
   * @memberof UseCodeClientOptions
   */
  onNonOAuthError?: (error: NonOAuthError) => void;

  /**
   * Authorization scopes
   *
   * @type {(MaybeRef<string> | MaybeRef<string[]>)}
   * @see https://developers.google.com/identity/protocols/oauth2/scopes
   * @memberof UseCodeClientOptions
   */
  scope?: MaybeRef<string> | MaybeRef<string[]>;

  /**
   * Client ID for this code client. Overrides the one given to the plugin.
   *
   * @type {MaybeRef<string>}
   * @see https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
   * @memberof UseCodeClientOptions
   */
  clientId?: MaybeRef<string | undefined>;
}

/** @deprecated Renamed to {@link UseCodeClientOptions}. */
export type ImplicitFlowOptions = UseCodeClientOptions;
/** @deprecated Renamed to {@link CodeClientSuccessResponse}. */
export type ImplicitFlowSuccessResponse = CodeClientSuccessResponse;
/** @deprecated Renamed to {@link CodeClientErrorResponse}. */
export type ImplicitFlowErrorResponse = CodeClientErrorResponse;

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
  login: () => void | undefined;

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
 * Initiate login with the authorization code flow using a code client. Return values of the composable can be used
 * to trigger the login flow and determine the readiness of the client.
 * It also provides callbacks such as `onSuccess` and `onError` that can be used to obtain the results from the login client.
 *
 * @export
 * @param {UseCodeClientOptions} [options={}]
 * @see https://developers.google.com/identity/oauth2/web/guides/use-code-model
 * @return {*}  {UseCodeClientReturn}
 */
export default function useCodeClient(
  options: UseCodeClientOptions = {},
): UseCodeClientReturn {
  const {
    clientId: ownClientId,
    scope = "",
    onError,
    onSuccess,
    onNonOAuthError,
    ...rest
  } = options;

  const { scriptLoaded } = useGsiScript();
  const clientId = useClientId(ownClientId);
  const isReady = ref(false);
  const codeRequestRedirectUrl = ref<string | null>(null);
  let client: CodeClient | undefined;

  watchEffect(() => {
    isReady.value = false;
    const client_id = clientId();
    if (!scriptLoaded.value || !client_id) return;

    const scopeValue = unref(scope);
    const scopes = Array.isArray(scopeValue)
      ? scopeValue.join(" ")
      : scopeValue;
    const computedScopes = `openid email profile ${scopes}`;

    codeRequestRedirectUrl.value = buildCodeRequestRedirectUrl({
      client_id,
      scope: computedScopes,
      ...rest,
    });

    client = window.google?.accounts.oauth2.initCodeClient({
      client_id,
      scope: computedScopes,
      callback: (response: CodeResponse) => {
        if (response.error) return onError?.(response);

        onSuccess?.(response);
      },
      error_callback: onNonOAuthError,
      ...rest,
    });

    isReady.value = true;
  });

  return {
    isReady: readonly(isReady),
    login: () => client?.requestCode(),
    codeRequestRedirectUrl: readonly(codeRequestRedirectUrl),
  };
}
