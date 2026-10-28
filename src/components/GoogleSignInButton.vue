<script setup lang="ts">
/**
 * Google Sign In Button
 */
import type {
  Context,
  CredentialResponse,
  CredentialSuccessResponse,
  NativeCallbackResponse,
  PromptMomentNotification,
  UxMode,
} from "@/interfaces/accounts";
import { useClientId } from "@/utils/symbols";
import { ref, toRef, watchEffect, onUnmounted, computed } from "vue";
import useGsiScript from "@/composables/useGsiScript";

interface GoogleSignInButtonProps {
  /**
   * Client ID for this button. Overrides the one given to the plugin.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
   * @memberof GoogleSignInButtonProps
   */
  clientId?: string;

  /**
   * Use One Tap Login
   *
   * @type {boolean}
   * @memberof GoogleSignInButtonProps
   */
  oneTap?: boolean;

  /**
   * This field determines if an ID token is automatically returned without any user interaction
   * when there's only one Google session that has approved your app before
   *
   * @type {boolean}
   * @default false
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#auto_select
   * @memberof GoogleSignInButtonProps
   */
  autoSelect?: boolean;

  /**
   * This attribute is the URI of your login endpoint.
   * May be omitted if the current page is your login page, in which case the credential is posted to this page by default.
   *
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#login_uri
   * @memberof GoogleSignInButtonProps
   */
  loginUri?: string;

  /**
   * This field sets whether or not to cancel the One Tap request if a user clicks outside the prompt.
   *
   * @type {boolean}
   * @default true
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#cancel_on_tap_outside
   * @memberof GoogleSignInButtonProps
   */
  cancelOnTapOutside?: boolean;

  /**
   * This attribute sets the DOM ID of the container element.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#prompt_parent_id
   * @memberof GoogleSignInButtonProps
   */
  promptParentId?: string;

  /**
   * This field is a random string used by the ID token to prevent replay attacks.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#nonce
   * @memberof GoogleSignInButtonProps
   */
  nonce?: string;

  /**
   * This field changes the text of the title and messages in the One Tap prompt.
   *
   * @type {Context}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#context
   * @memberof GoogleSignInButtonProps
   */
  context?: Context;

  /**
   * If you need to display One Tap in the parent domain and its subdomains, pass the parent domain to this field so that a single shared-state cookie is used.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#state_cookie_domain
   * @memberof GoogleSignInButtonProps
   */
  stateCookieDomain?: string;

  /**
   * Use this field to set the UX flow used by the Sign In With Google button.
   *
   * @type {UxMode}
   * @default popup
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#ux_mode
   * @memberof GoogleSignInButtonProps
   */
  uxMode?: UxMode;

  /**
   * The origins that are allowed to embed the intermediate iframe. One Tap will run in the intermediate iframe mode if this field presents.
   *
   * @type {(string | string[])}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#allowed_parent_origin
   * @memberof GoogleSignInButtonProps
   */
  allowedParentOrigin?: string | string[];

  /**
   * This field determines if the upgraded One Tap UX should be enabled on browsers that support Intelligent Tracking Prevention (ITP).
   *
   * @type {boolean}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#itp_support
   * @memberof GoogleSignInButtonProps
   */
  itpSupport?: boolean;

  /**
   * Skips account selection when you already know which user should sign in: an email address or the `sub` field of an ID token.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#login_hint
   * @memberof GoogleSignInButtonProps
   */
  loginHint?: string;

  /**
   * Limits account selection to a Google Workspace domain, or `*` for any Workspace account.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#hd
   * @memberof GoogleSignInButtonProps
   */
  hd?: string;

  /**
   * Color scheme of the One Tap prompt. Defaults to the user's system setting.
   *
   * @type {"default" | "light" | "dark"}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#color_scheme
   * @memberof GoogleSignInButtonProps
   */
  colorScheme?: "default" | "light" | "dark";

  /**
   * Extra claims to include in the ID token, such as `"auth_time, amr"`.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#essential_claims
   * @memberof GoogleSignInButtonProps
   */
  essentialClaims?: string;

  /**
   * Use the FedCM button flow on browsers that support it.
   *
   * @type {boolean}
   * @default false
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#use_fedcm_for_button
   * @memberof GoogleSignInButtonProps
   */
  useFedcmForButton?: boolean;

  /**
   * With the FedCM button flow, sign returning users in without showing the account chooser.
   *
   * @type {boolean}
   * @default false
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#button_auto_select
   * @memberof GoogleSignInButtonProps
   */
  buttonAutoSelect?: boolean;

  /**
   * Returned as `state` in the credential response, to tell several buttons apart.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#state
   * @memberof GoogleSignInButtonProps
   */
  state?: string;

  /**
   * The button type: icon, or standard button.
   *
   * @type {("standard" | "icon")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#type
   * @memberof GoogleSignInButtonProps
   */
  type?: "standard" | "icon";

  /**
   * The button theme
   *
   * @type {("outline" | "filled_blue" | "filled_black")}
   * @default outline
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#theme
   * @memberof GoogleSignInButtonProps
   */
  theme?: "outline" | "filled_blue" | "filled_black";

  /**
   * The button size
   *
   * @type {("large" | "medium" | "small")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#size
   * @default small
   * @memberof GoogleSignInButtonProps
   */
  size?: "large" | "medium" | "small";

  /**
   * The button text.
   *
   * @type {("signin_with" | "signup_with" | "continue_with" | "signin")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#text
   * @default signup_with
   * @memberof GoogleSignInButtonProps
   */
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";

  /**
   * The button shape
   *
   * @type {("rectangular" | "pill" | "circle" | "square")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#shape
   * @default rectangular
   * @memberof GoogleSignInButtonProps
   */
  shape?: "rectangular" | "pill" | "circle" | "square";

  /**
   * The alignment of the Google logo
   *
   * @type {("left" | "center")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#logo_alignment
   * @default left
   * @memberof GoogleSignInButtonProps
   */
  logoAlignment?: "left" | "center";

  /**
   * The minimum button width, in pixels.
   *
   * @type {number}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#width
   * @default 400
   * @memberof GoogleSignInButtonProps
   */
  width?: number;

  /**
   * The pre-set locale of the button text. If it's not set, the browser's default locale or the Google session user’s preference is used.
   * Therefore, different users might see different versions of localized buttons, and possibly with different sizes.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#locale
   * @memberof GoogleSignInButtonProps
   */
  locale?: string;
}

// Reserve the rendered button's height so the page doesn't shift when it loads
const buttonContainerHeight = { large: "40px", medium: "32px", small: "20px" };

const props = defineProps<GoogleSignInButtonProps>();
const emits = defineEmits<{
  /**
   * On successful login, this will be emitted
   * @arg {CredentialSuccessResponse} response - The response from google, with its ID token
   */
  (e: "success", response: CredentialSuccessResponse): void;

  /**
   * Emitted when Google responds without a credential
   * @arg {CredentialResponse} response - The response from google
   */
  (e: "error", response: CredentialResponse): void;

  /**
   * When `intermediateIframeCloseCallback` activates this will be emitted
   */
  (e: "intermediateIframeCloseCallback"): void;

  /**
   * When `nativeCallback` activates this will be emitted
   *
   * @arg {NativeCallbackResponse} response - The response from google
   */
  (e: "nativeCallback", response: NativeCallbackResponse): void;

  /**
   * When `promptMomentNotification` activates this will be emitted
   *
   * @arg {PromptMomentNotification} response - The response from google
   */
  (e: "promptMomentNotification", notification: PromptMomentNotification): void;
}>();

const clientId = useClientId(toRef(props, "clientId"));
const targetElement = ref<HTMLElement | null>(null);
const { scriptLoaded } = useGsiScript();

watchEffect(() => {
  const client_id = clientId();
  const parent = targetElement.value;
  // The effect first runs in setup, before the element exists. Once Google's
  // script has loaded (say, after a route change), wait for the mount.
  if (!scriptLoaded.value || !client_id || !parent) return;

  window.google?.accounts.id.initialize({
    client_id,
    callback: (credentialResponse: CredentialResponse) => {
      const { credential } = credentialResponse;
      if (!credential) {
        emits("error", credentialResponse);
        return;
      }

      emits("success", { ...credentialResponse, credential });
    },
    allowed_parent_origin: props.allowedParentOrigin,
    auto_select: props.autoSelect,
    cancel_on_tap_outside: props.cancelOnTapOutside,
    context: props.context,
    intermediate_iframe_close_callback: () => {
      emits("intermediateIframeCloseCallback");
    },
    itp_support: props.itpSupport,
    login_uri: props.loginUri,
    native_callback: (resp) => {
      emits("nativeCallback", resp);
    },
    nonce: props.nonce,
    prompt_parent_id: props.promptParentId,
    state_cookie_domain: props.stateCookieDomain,
    ux_mode: props.uxMode,
    login_hint: props.loginHint,
    hd: props.hd,
    color_scheme: props.colorScheme,
    essential_claims: props.essentialClaims,
    use_fedcm_for_button: props.useFedcmForButton,
    button_auto_select: props.buttonAutoSelect,
  });

  window.google?.accounts.id.renderButton(parent, {
    type: props.type,
    theme: props.theme,
    size: props.size,
    text: props.text,
    shape: props.shape,
    logo_alignment: props.logoAlignment,
    width: props.width?.toString(),
    locale: props.locale,
    state: props.state,
  });

  if (props.oneTap)
    window.google?.accounts.id.prompt((notification) => {
      emits("promptMomentNotification", notification);
    });
});

onUnmounted(() => {
  if (props.oneTap) {
    window.google?.accounts.id.cancel();
  }
});

const height = computed(() => buttonContainerHeight[props.size || "large"]);
</script>

<template>
  <div ref="targetElement" :style="{ display: 'inline-flex', height }"></div>
</template>
