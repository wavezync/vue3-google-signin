/**
 * UxMode for client
 */
export type UxMode = "popup" | "redirect";

/**
 * Context
 */
export type Context = "use" | "signin" | "signup";

/**
 * Select By
 *
 * @see https://developers.google.com/identity/gsi/web/reference/js-reference#select_by
 */
export type SelectBy =
  | "auto"
  | "user"
  | "user_1tap"
  | "user_2tap"
  | "btn"
  | "btn_confirm"
  | "brn_add_session"
  | "btn_confirm_add_session"
  | "auto"
  | "user"
  | "user_1tap"
  | "user_2tap"
  | "btn"
  | "btn_confirm"
  | "brn_add_session"
  | "btn_confirm_add_session";

/**
 * Credential response returned from google.
 *
 *
 * @export
 * @see https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse
 * @interface CredentialResponse
 */
export interface CredentialResponse {
  /**
   * This field is the ID token as a base64-encoded JSON Web Token (JWT) string
   *
   * @type {string}
   * @memberof CredentialResponse
   */
  credential?: string;

  /**
   * About how google selected the credentials
   *
   * @type {SelectBy}
   * @memberof CredentialResponse
   */
  select_by?: SelectBy;

  /**
   * This field is only defined when user clicks a Sign in with Google button to sign in, and the button's state attribute is specified.
   *
   * @type {string}
   * @memberof CredentialResponse
   */
  state?: string;
}

/**
 * Native credential response
 *
 * @export
 * @interface NativeCallbackResponse
 */
export interface NativeCallbackResponse {
  id: string;
  password: string;
}

/**
 * Configuration for Google Client.
 *
 * @export
 * @see https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
 * @interface IdConfiguration
 */
export interface IdConfiguration {
  /**
   * Application client ID
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#client_id
   * @memberof IdConfiguration
   */
  client_id: string;

  /**
   * This field determines if an ID token is automatically returned without any user interaction
   * when there's only one Google session that has approved your app before
   *
   * @type {boolean}
   * @default false
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#auto_select
   * @memberof IdConfiguration
   */
  auto_select?: boolean;

  /**
   * This field is the JavaScript function that handles the ID token returned from the One Tap prompt or the pop-up window.
   *
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#callback
   * @memberof IdConfiguration
   */
  callback?: (credentialResponse: CredentialResponse) => void;

  /**
   * This attribute is the URI of your login endpoint.
   * May be omitted if the current page is your login page, in which case the credential is posted to this page by default.
   *
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#login_uri
   * @memberof IdConfiguration
   */
  login_uri?: string;

  /**
   * This field is the name of the JavaScript function that handles the password credential returned from the browser's native credential manager.
   *
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#native_callback
   * @memberof IdConfiguration
   */
  native_callback?: (response: NativeCallbackResponse) => void;

  /**
   * This field sets whether or not to cancel the One Tap request if a user clicks outside the prompt.
   *
   * @type {boolean}
   * @default true
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#cancel_on_tap_outside
   * @memberof IdConfiguration
   */
  cancel_on_tap_outside?: boolean;

  /**
   * This attribute sets the DOM ID of the container element.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#prompt_parent_id
   * @memberof IdConfiguration
   */
  prompt_parent_id?: string;

  /**
   * This field is a random string used by the ID token to prevent replay attacks.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#nonce
   * @memberof IdConfiguration
   */
  nonce?: string;

  /**
   * This field changes the text of the title and messages in the One Tap prompt.
   *
   * @type {Context}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#context
   * @memberof IdConfiguration
   */
  context?: Context;

  /**
   * If you need to display One Tap in the parent domain and its subdomains, pass the parent domain to this field so that a single shared-state cookie is used.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#state_cookie_domain
   * @memberof IdConfiguration
   */
  state_cookie_domain?: string;

  /**
   * Use this field to set the UX flow used by the Sign In With Google button.
   *
   * @type {UxMode}
   * @default popup
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#ux_mode
   * @memberof IdConfiguration
   */
  ux_mode?: UxMode;

  /**
   * The origins that are allowed to embed the intermediate iframe. One Tap will run in the intermediate iframe mode if this field presents.
   *
   * @type {(string | string[])}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#allowed_parent_origin
   * @memberof IdConfiguration
   */
  allowed_parent_origin?: string | string[];

  /**
   * Overrides the default intermediate iframe behavior when users manually close One Tap by tapping on the 'X' button in the One Tap UI.
   * The default behavior is to remove the intermediate iframe from the DOM immediately.
   *
   *
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#intermediate_iframe_close_callback
   * @memberof IdConfiguration
   */
  intermediate_iframe_close_callback?: () => void;

  /**
   * This field determines if the upgraded One Tap UX should be enabled on browsers that support Intelligent Tracking Prevention (ITP).
   *
   * @type {boolean}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#itp_support
   * @memberof IdConfiguration
   */
  itp_support?: boolean;

  /**
   * Skips account selection when you already know which user should sign in.
   * An email address or the `sub` field of an ID token.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#login_hint
   * @memberof IdConfiguration
   */
  login_hint?: string;

  /**
   * Limits account selection to a Google Workspace domain, or `*` for any Workspace account.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#hd
   * @memberof IdConfiguration
   */
  hd?: string;

  /**
   * Use the FedCM button flow on browsers that support it.
   *
   * @type {boolean}
   * @default false
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#use_fedcm_for_button
   * @memberof IdConfiguration
   */
  use_fedcm_for_button?: boolean;

  /**
   * With the FedCM button flow, sign returning users in without showing the account chooser.
   *
   * @type {boolean}
   * @default false
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#button_auto_select
   * @memberof IdConfiguration
   */
  button_auto_select?: boolean;

  /**
   * Color scheme of the One Tap prompt. Defaults to the user's system setting.
   *
   * @type {("default" | "light" | "dark")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#color_scheme
   * @memberof IdConfiguration
   */
  color_scheme?: "default" | "light" | "dark";

  /**
   * Extra claims to include in the ID token, such as `"auth_time, amr"`.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#essential_claims
   * @memberof IdConfiguration
   */
  essential_claims?: string;

  /**
   * @deprecated Ignored by Google: One Tap always uses FedCM now.
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#use_fedcm_for_prompt
   */
  use_fedcm_for_prompt?: boolean;
}

/**
 * Prompt moment notification.
 *
 * @export
 * @see https://developers.google.com/identity/gsi/web/reference/js-reference#PromptMomentNotification
 * @interface PromptMomentNotification
 */
export interface PromptMomentNotification {
  /**
   * Is this notification for a skipped moment?
   *
   * @memberof PromptMomentNotification
   */
  isSkippedMoment: () => boolean;

  /**
   * The detailed reason for the skipped moment. FedCM doesn't report `user_cancel`.
   *
   * @memberof PromptMomentNotification
   */
  getSkippedReason: () =>
    | "auto_cancel"
    | "user_cancel"
    | "tap_outside"
    | "issuing_failed";

  /**
   * Is this notification for a dismissed moment?
   *
   * @memberof PromptMomentNotification
   */
  isDismissedMoment: () => boolean;

  /**
   *The detailed reason for the dismissal.
   *
   * @memberof PromptMomentNotification
   */
  getDismissedReason: () =>
    | "credential_returned"
    | "cancel_called"
    | "flow_restarted";

  /**
   * Return a string for the moment type.
   *
   * @memberof PromptMomentNotification
   */
  getMomentType: () => "display" | "skipped" | "dismissed";
}

/**
 * Google Sign In Button configuration.
 *
 * @export
 * @see https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration
 * @interface GsiButtonConfiguration
 */
export interface GsiButtonConfiguration {
  /**
   * The button type: icon, or standard button.
   *
   * @type {("standard" | "icon")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#type
   * @memberof GsiButtonConfiguration
   */
  type?: "standard" | "icon";

  /**
   * The button theme
   *
   * @type {("outline" | "filled_blue" | "filled_black")}
   * @default outline
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#theme
   * @memberof GsiButtonConfiguration
   */
  theme?: "outline" | "filled_blue" | "filled_black";

  /**
   * The button size
   *
   * @type {("large" | "medium" | "small")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#size
   * @default small
   * @memberof GsiButtonConfiguration
   */
  size?: "large" | "medium" | "small";

  /**
   * The button text.
   *
   * @type {("signin_with" | "signup_with" | "continue_with" | "signin")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#text
   * @default signup_with
   * @memberof GsiButtonConfiguration
   */
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";

  /**
   * The button shape
   *
   * @type {("rectangular" | "pill" | "circle" | "square")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#shape
   * @default rectangular
   * @memberof GsiButtonConfiguration
   */
  shape?: "rectangular" | "pill" | "circle" | "square";

  /**
   * The alignment of the Google logo
   *
   * @type {("left" | "center")}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#logo_alignment
   * @default left
   * @memberof GsiButtonConfiguration
   */
  logo_alignment?: "left" | "center";

  /**
   * The minimum button width, in pixels.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#width
   * @default 400
   * @memberof GsiButtonConfiguration
   */
  width?: string;

  /**
   * The pre-set locale of the button text. If it's not set, the browser's default locale or the Google session user’s preference is used.
   * Therefore, different users might see different versions of localized buttons, and possibly with different sizes.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#locale
   * @memberof GsiButtonConfiguration
   */
  locale?: string;

  /**
   * Called when the button is clicked.
   *
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#click_listener
   * @memberof GsiButtonConfiguration
   */
  click_listener?: () => void;

  /**
   * Returned as `state` in the credential response, to tell several buttons apart.
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#state
   * @memberof GsiButtonConfiguration
   */
  state?: string;
}

export type MomentListener = (
  promptMomentNotification: PromptMomentNotification,
) => void;

export interface RevocationResponse {
  /**
   * Successfully revocated
   *
   * @type {*}
   * @memberof RevocationResponse
   */
  successful: any;

  /**
   * Error on revocation
   *
   * @type {*}
   * @memberof RevocationResponse
   */
  error: any;
}

export type RevocationCallback = (response: RevocationResponse) => void;
