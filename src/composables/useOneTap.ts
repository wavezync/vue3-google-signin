import type { MaybeRef } from "@/utils/types";
import useGsiScript from "./useGsiScript";
import type {
  Context,
  CredentialResponse,
  NativeCallbackResponse,
  PromptMomentNotification,
} from "@/interfaces/accounts";
import { inject, unref, watchEffect, ref, readonly, type Ref } from "vue";
import { GoogleClientIdKey } from "@/utils/symbols";

export interface UseGoogleOneTapLoginOptions {
  /**
   * Callback to run on success
   *
   * @memberof UseGoogleOneTapLoginOptions
   */
  onSuccess?: (credentialResponse: CredentialResponse) => void;

  /**
   * Callback to run on error
   *
   * @memberof UseGoogleOneTapLoginOptions
   */
  onError?: () => void;

  /**
   * Callback to run on prompt moment
   *
   * @memberof UseGoogleOneTapLoginOptions
   */
  onPromptMomentNotification?: (
    promptMomentNotification: PromptMomentNotification
  ) => void;

  /**
   * Native callback
   *
   * @memberof UseGoogleOneTapLoginOptions
   */
  onNativeCallback?: (nativeCallbackResponse: NativeCallbackResponse) => void;

  /**
   * On intermediate iframe closed
   *
   * @memberof UseGoogleOneTapLoginOptions
   */
  onIntermediateIframeCloseCallback?: () => void;

  /**
   * Explicitly disable the automatic prompt.
   * This is `false` by default. You can trigger the prompet using `login` returned by the composable
   *
   * @type {MaybeRef<boolean>}
   * @memberof UseGoogleOneTapLoginOptions
   */
  disableAutomaticPrompt?: MaybeRef<boolean>;

  /**
   * This field determines if an ID token is automatically returned without any user interaction
   * when there's only one Google session that has approved your app before
   *
   * @type {MaybeRef<boolean>}
   * @default false
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#auto_select
   * @memberof UseGoogleOneTapLoginOptions
   */
  autoSelect?: MaybeRef<boolean>;

  /**
   * This attribute is the URI of your login endpoint.
   * May be omitted if the current page is your login page, in which case the credential is posted to this page by default.
   *
   *
   * @type {MaybeRef<string>}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#login_uri
   * @memberof UseGoogleOneTapLoginOptions
   */
  loginUri?: MaybeRef<string>;

  /**
   * This field sets whether or not to cancel the One Tap request if a user clicks outside the prompt.
   *
   * @type {MaybeRef<boolean>}
   * @default true
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#cancel_on_tap_outside
   * @memberof UseGoogleOneTapLoginOptions
   */
  cancelOnTapOutside?: MaybeRef<boolean>;

  /**
   * This attribute sets the DOM ID of the container element.
   *
   * @type {MaybeRef<string>}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#prompt_parent_id
   * @memberof UseGoogleOneTapLoginOptions
   */
  promptParentId?: MaybeRef<string>;

  /**
   * This field is a random string used by the ID token to prevent replay attacks.
   *
   * @type {MaybeRef<string>}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#nonce
   * @memberof UseGoogleOneTapLoginOptions
   */
  nonce?: MaybeRef<string>;

  /**
   * This field changes the text of the title and messages in the One Tap prompt.
   *
   * @type {MaybeRef<Context>}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#context
   * @memberof UseGoogleOneTapLoginOptions
   */
  context?: MaybeRef<Context>;

  /**
   * If you need to display One Tap in the parent domain and its subdomains, pass the parent domain to this field so that a single shared-state cookie is used.
   *
   * @type {MaybeRef<string>}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#state_cookie_domain
   * @memberof UseGoogleOneTapLoginOptions
   */
  stateCookieDomain?: MaybeRef<string>;

  /**
   * The origins that are allowed to embed the intermediate iframe. One Tap will run in the intermediate iframe mode if this field presents.
   *
   * @type {(MaybeRef<string> | MaybeRef<string[]>)}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#allowed_parent_origin
   * @memberof UseGoogleOneTapLoginOptions
   */
  allowedParentOrigin?: MaybeRef<string> | MaybeRef<string[]>;

  /**
   * This field determines if the upgraded One Tap UX should be enabled on browsers that support Intelligent Tracking Prevention (ITP).
   *
   * @type {MaybeRef<boolean>}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#itp_support
   * @memberof UseGoogleOneTapLoginOptions
   */
  itpSupport?: MaybeRef<boolean>;
}

export interface UseOneTapResult {
  /**
   * Is one tap ready to be used?
   *
   * @type {Readonly<Ref<boolean>>}
   * @memberof UseOneTapResult
   */
  isReady: Readonly<Ref<boolean>>;

  /**
   * Trigger one tap login manually
   *
   * @memberof UseOneTapResult
   */
  login: () => void;
}

/**
 * Use google one tap login
 *
 * @export
 * @param {UseGoogleOneTapLoginOptions} [options]
 * @see https://developers.google.com/identity/gsi/web/guides/display-google-one-tap
 * @return {*}  {UseOneTapResult}
 */
export default function useOneTap(
  options?: UseGoogleOneTapLoginOptions
): UseOneTapResult {
  const {
    disableAutomaticPrompt = false,
    onSuccess,
    onError,
    onPromptMomentNotification,
    onNativeCallback,
    onIntermediateIframeCloseCallback,
    autoSelect,
    loginUri,
    cancelOnTapOutside,
    promptParentId,
    nonce,
    context,
    stateCookieDomain,
    allowedParentOrigin,
    itpSupport,
  } = options || {};

  const { scriptLoaded } = useGsiScript();
  const clientId = inject<string>(GoogleClientIdKey);
  const isReady = ref(false);

  const login = () =>
    isReady.value &&
    window.google?.accounts.id.prompt((notification) =>
      onPromptMomentNotification?.(notification)
    );

  watchEffect((onCleanup) => {
    isReady.value = false;
    if (!scriptLoaded.value) return;

    const shouldAutoLogin = !unref(disableAutomaticPrompt);

    const auto_select = unref(autoSelect);
    const login_uri = unref(loginUri);
    const prompt_parent_id = unref(promptParentId);
    const nonceValue = unref(nonce);
    const contextValue = unref(context);
    const state_cookie_domain = unref(stateCookieDomain);
    const allowed_parent_origin = unref(allowedParentOrigin);
    const itp_support = unref(itpSupport);
    const cancel_on_tap_outside = unref(cancelOnTapOutside);

    window.google?.accounts.id.initialize({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      client_id: clientId!,
      callback: (credentialResponse: CredentialResponse) => {
        console.log("cb triggered");
        if (!credentialResponse.clientId || !credentialResponse.credential) {
          onError?.();
          return;
        }

        onSuccess?.(credentialResponse);
      },
      native_callback: (response: NativeCallbackResponse) => {
        onNativeCallback?.(response);
      },
      intermediate_iframe_close_callback: () => {
        onIntermediateIframeCloseCallback?.();
      },
      auto_select,
      allowed_parent_origin,
      context: contextValue,
      itp_support,
      login_uri,
      nonce: nonceValue,
      prompt_parent_id,
      state_cookie_domain,
      cancel_on_tap_outside,
    });

    isReady.value = true;

    if (shouldAutoLogin) {
      window.google?.accounts.id.prompt((notification) =>
        onPromptMomentNotification?.(notification)
      );
    }

    onCleanup(() => {
      window.google?.accounts.id.cancel();
    });
  });

  return { isReady: readonly(isReady), login };
}
