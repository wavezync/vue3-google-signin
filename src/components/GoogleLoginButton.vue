<script setup lang="ts">
import type {
  Context,
  CredentialResponse,
  PromptMomentNotification,
  UxMode,
} from "@/interfaces/accounts";
import { GoogleClientIdKey } from "@/utils/symbols";
import { inject, ref, watchEffect, onUnmounted, computed } from "vue";
import useGsiScript from "@/composables/useGsiScript";

interface GoogleLoginButtonProps {
  /**
   * Use One Tap Login
   *
   * @type {boolean}
   * @memberof GoogleLoginButtonProps
   */
  useOneTap?: boolean;

  /**
   * This field determines if an ID token is automatically returned without any user interaction
   * when there's only one Google session that has approved your app before
   *
   * @type {boolean}
   * @default false
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#auto_select
   * @memberof GoogleLoginButtonProps
   */
  autoSelect?: boolean;

  /**
   * This attribute is the URI of your login endpoint.
   * May be omitted if the current page is your login page, in which case the credential is posted to this page by default.
   *
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#login_uri
   * @memberof GoogleLoginButtonProps
   */
  loginUri?: string;

  /**
   * This field sets whether or not to cancel the One Tap request if a user clicks outside the prompt.
   *
   * @type {boolean}
   * @default true
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#cancel_on_tap_outside
   * @memberof GoogleLoginButtonProps
   */
  cancelOnTapOutside?: boolean;

  /**
   * This attribute sets the DOM ID of the container element.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#prompt_parent_id
   * @memberof GoogleLoginButtonProps
   */
  promptParentId?: string;

  /**
   * This field is a random string used by the ID token to prevent replay attacks.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#nonce
   * @memberof GoogleLoginButtonProps
   */
  nonce?: string;

  /**
   * This field changes the text of the title and messages in the One Tap prompt.
   *
   * @type {Context}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#context
   * @memberof GoogleLoginButtonProps
   */
  context?: Context;

  /**
   * If you need to display One Tap in the parent domain and its subdomains, pass the parent domain to this field so that a single shared-state cookie is used.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#state_cookie_domain
   * @memberof GoogleLoginButtonProps
   */
  stateCookieDomain?: string;

  /**
   * Use this field to set the UX flow used by the Sign In With Google button.
   *
   * @type {UxMode}
   * @default popup
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#ux_mode
   * @memberof GoogleLoginButtonProps
   */
  uxMode?: UxMode;

  /**
   * The origins that are allowed to embed the intermediate iframe. One Tap will run in the intermediate iframe mode if this field presents.
   *
   * @type {(string | string[])}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#allowed_parent_origin
   * @memberof GoogleLoginButtonProps
   */
  allowedParentOrigin?: string | string[];

  /**
   * This field determines if the upgraded One Tap UX should be enabled on browsers that support Intelligent Tracking Prevention (ITP).
   *
   * @type {boolean}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#itp_support
   * @memberof GoogleLoginButtonProps
   */
  itpSupport?: boolean;

  /**
   * The button type: icon, or standard button.
   *
   * @type {("standard" | "icon")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#type
   * @memberof GoogleLoginButtonProps
   */
  type?: "standard" | "icon";

  /**
   * The button theme
   *
   * @type {("outline" | "filled_blue" | "filled_black")}
   * @default outline
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#theme
   * @memberof GoogleLoginButtonProps
   */
  theme?: "outline" | "filled_blue" | "filled_black";

  /**
   * The button size
   *
   * @type {("large" | "medium" | "small")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#size
   * @default small
   * @memberof GoogleLoginButtonProps
   */
  size?: "large" | "medium" | "small";

  /**
   * The button text.
   *
   * @type {("signin_with" | "signup_with" | "continue_with" | "signin")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#text
   * @default signup_with
   * @memberof GoogleLoginButtonProps
   */
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";

  /**
   * The button shape
   *
   * @type {("rectangular" | "pill" | "circle" | "square")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#shape
   * @default rectangular
   * @memberof GoogleLoginButtonProps
   */
  shape?: "rectangular" | "pill" | "circle" | "square";

  /**
   * The alignment of the Google logo
   *
   * @type {("left" | "center")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#logo_alignment
   * @default left
   * @memberof GoogleLoginButtonProps
   */
  logoAlignment?: "left" | "center";

  /**
   * The minimum button width, in pixels.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#width
   * @default 400
   * @memberof GoogleLoginButtonProps
   */
  width?: string;

  /**
   * The pre-set locale of the button text. If it's not set, the browser's default locale or the Google session user’s preference is used.
   * Therefore, different users might see different versions of localized buttons, and possibly with different sizes.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#locale
   * @memberof GoogleLoginButtonProps
   */
  locale?: string;
}

const buttonContainerHeight = { large: 40, medium: 32, small: 20 };

const props = defineProps<GoogleLoginButtonProps>();
const emits = defineEmits<{
  (e: "onSuccess", response: CredentialResponse): void;
  (e: "onError"): void;
  (e: "intermediateIframeCloseCallback"): void;
  (
    e: "nativeCallback",
    response: {
      id: string;
      password: string;
    }
  ): void;
  (e: "promptMomentNotification", notification: PromptMomentNotification): void;
}>();

const clientId = inject<string>(GoogleClientIdKey);
const targetElement = ref<HTMLElement | null>(null);
const { scriptLoaded } = useGsiScript();

watchEffect((onCleanup) => {
  if (!scriptLoaded.value) return;

  window.google?.accounts.id.initialize({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    client_id: clientId!,
    callback: (credentialResponse: CredentialResponse) => {
      if (!credentialResponse.clientId || !credentialResponse.credential) {
        emits("onError");
        return;
      }

      emits("onSuccess", credentialResponse);
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
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  window.google?.accounts.id.renderButton(targetElement.value!, {
    type: props.type,
    theme: props.theme,
    size: props.size,
    text: props.text,
    shape: props.shape,
    logo_alignment: props.logoAlignment,
    width: props.width,
    locale: props.locale,
  });

  if (props.useOneTap)
    window.google?.accounts.id.prompt((notification) => {
      emits("promptMomentNotification", notification);
    });

  onCleanup(() => {
    if (props.useOneTap) window.google?.accounts.id.cancel();
  });
});

onUnmounted(() => {
  if (props.useOneTap) {
    window.google?.accounts.id.cancel();
  }
});

const height = computed(() => buttonContainerHeight[props.size || "large"]);
</script>

<template>
  <div ref="targetElement" :style="{ display: 'inline-flex', height }"></div>
</template>
