// GoogleSignInButton's props and events, grouped for the component page.
// Keep in sync with src/components/GoogleSignInButton.vue.

export interface ApiEntry {
  /** Prop name as written in templates (kebab-case), or the event name */
  name: string;
  /** Union members render as separate chips */
  type: string[];
  default?: string;
  description: string;
  /** Anchor on Google's GIS JavaScript reference */
  gis?: string;
}

export const GIS_REFERENCE =
  "https://developers.google.com/identity/gsi/web/reference/js-reference";

const union = (...values: string[]) => values.map((v) => `"${v}"`);

export const appearance: ApiEntry[] = [
  {
    name: "type",
    type: union("standard", "icon"),
    default: '"standard"',
    description: "A full button with text, or only the Google logo.",
    gis: "type",
  },
  {
    name: "theme",
    type: union("outline", "filled_blue", "filled_black"),
    default: '"outline"',
    description: "The button's colors.",
    gis: "theme",
  },
  {
    name: "size",
    type: union("large", "medium", "small"),
    default: '"large"',
    description: "Height of the button: 40, 32 or 20px.",
    gis: "size",
  },
  {
    name: "text",
    type: union("signin_with", "signup_with", "continue_with", "signin"),
    default: '"signin_with"',
    description:
      "The label: Sign in with Google, Sign up with Google, Continue with Google, or Sign in.",
    gis: "text",
  },
  {
    name: "shape",
    type: union("rectangular", "pill", "circle", "square"),
    default: '"rectangular"',
    description: "Corner style. Use circle or square with the icon type.",
    gis: "shape",
  },
  {
    name: "logo-alignment",
    type: union("left", "center"),
    default: '"left"',
    description: "Where the Google logo sits in a standard button.",
    gis: "logo_alignment",
  },
  {
    name: "width",
    type: ["number"],
    description: "Minimum width in pixels, up to 400.",
    gis: "width",
  },
  {
    name: "locale",
    type: ["string"],
    description:
      "Language of the button text, such as en or fr. Defaults to the browser's or the Google account's language.",
    gis: "locale",
  },
];

export const signIn: ApiEntry[] = [
  {
    name: "client-id",
    type: ["string"],
    description: "Client ID for this button. Overrides the plugin's.",
  },
  {
    name: "ux-mode",
    type: union("popup", "redirect"),
    default: '"popup"',
    description: "Open Google in a popup, or redirect the whole page.",
    gis: "ux_mode",
  },
  {
    name: "login-uri",
    type: ["string"],
    description: "Your endpoint that receives the credential in redirect mode.",
    gis: "login_uri",
  },
  {
    name: "nonce",
    type: ["string"],
    description:
      "A random string Google puts in the ID token, to prevent replay attacks.",
    gis: "nonce",
  },
  {
    name: "login-hint",
    type: ["string"],
    description:
      "Skip account selection for a known user: their email address or ID token sub.",
    gis: "login_hint",
  },
  {
    name: "hd",
    type: ["string"],
    description: "Limit accounts to a Google Workspace domain, or * for any.",
    gis: "hd",
  },
  {
    name: "state",
    type: ["string"],
    description:
      "Returned in the credential response, to tell several buttons apart.",
    gis: "state",
  },
  {
    name: "use-fedcm-for-button",
    type: ["boolean"],
    default: "false",
    description: "Use the browser's FedCM sign-in flow where it's supported.",
    gis: "use_fedcm_for_button",
  },
  {
    name: "button-auto-select",
    type: ["boolean"],
    default: "false",
    description:
      "With FedCM, sign returning users in without the account chooser.",
    gis: "button_auto_select",
  },
  {
    name: "essential-claims",
    type: ["string"],
    description: 'Extra claims for the ID token, such as "auth_time, amr".',
    gis: "essential_claims",
  },
];

export const oneTap: ApiEntry[] = [
  {
    name: "one-tap",
    type: ["boolean"],
    default: "false",
    description:
      "Also show Google's One Tap prompt while the button is on the page.",
  },
  {
    name: "auto-select",
    type: ["boolean"],
    default: "false",
    description:
      "Sign returning users in without a tap when only one Google session has approved your app.",
    gis: "auto_select",
  },
  {
    name: "cancel-on-tap-outside",
    type: ["boolean"],
    default: "true",
    description: "Close the prompt when the user clicks outside it.",
    gis: "cancel_on_tap_outside",
  },
  {
    name: "context",
    type: union("signin", "signup", "use"),
    default: '"signin"',
    description: "Changes the wording of the prompt.",
    gis: "context",
  },
  {
    name: "prompt-parent-id",
    type: ["string"],
    description: "DOM ID of the element to show the prompt in.",
    gis: "prompt_parent_id",
  },
  {
    name: "color-scheme",
    type: union("default", "light", "dark"),
    description: "Color scheme of the prompt. Defaults to the system setting.",
    gis: "color_scheme",
  },
  {
    name: "itp-support",
    type: ["boolean"],
    description:
      "The upgraded One Tap UX on browsers with Intelligent Tracking Prevention.",
    gis: "itp_support",
  },
  {
    name: "allowed-parent-origin",
    type: ["string", "string[]"],
    description: "Origins allowed to embed One Tap in an intermediate iframe.",
    gis: "allowed_parent_origin",
  },
  {
    name: "state-cookie-domain",
    type: ["string"],
    description: "Parent domain to share One Tap state across subdomains.",
    gis: "state_cookie_domain",
  },
];

export const events: ApiEntry[] = [
  {
    name: "@success",
    type: ["CredentialSuccessResponse"],
    description:
      "Google returned an ID token in credential. Decode it with decodeCredential and verify it on your server.",
    gis: "CredentialResponse",
  },
  {
    name: "@error",
    type: ["CredentialResponse"],
    description: "Google responded without a credential.",
    gis: "CredentialResponse",
  },
  {
    name: "@prompt-moment-notification",
    type: ["PromptMomentNotification"],
    description:
      "With one-tap: the prompt was displayed, skipped or dismissed.",
    gis: "PromptMomentNotification",
  },
  {
    name: "@native-callback",
    type: ["{ id: string; password: string }"],
    description: "The user picked a password saved in the browser.",
    gis: "native_callback",
  },
  {
    name: "@intermediate-iframe-close-callback",
    type: [],
    description: "The user closed One Tap in intermediate iframe mode.",
    gis: "intermediate_iframe_close_callback",
  },
];
