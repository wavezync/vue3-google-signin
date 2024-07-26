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
   * Client ID returned from google
   *
   * @type {string}
   * @memberof CredentialResponse
   */
  clientId?: string;
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
   * Is this notification for a display moment?
   *
   * @memberof PromptMomentNotification
   */
  isDisplayMoment: () => boolean;

  /**
   * Is this notification for a display moment, and the UI is displayed?
   *
   * @memberof PromptMomentNotification
   */
  isDisplayed: () => boolean;

  /**
   * Is this notification for a display moment, and the UI isn't displayed?
   *
   * @memberof PromptMomentNotification
   */
  isNotDisplayed: () => boolean;

  /**
   * The detailed reason why the UI isn't displayed
   *
   * @memberof PromptMomentNotification
   */
  getNotDisplayedReason: () =>
    | "browser_not_supported"
    | "invalid_client"
    | "missing_client_id"
    | "opt_out_or_no_session"
    | "secure_http_required"
    | "suppressed_by_user"
    | "unregistered_origin"
    | "unknown_reason";

  /**
   * Is this notification for a skipped moment?
   *
   * @memberof PromptMomentNotification
   */
  isSkippedMoment: () => boolean;

  /**
   * The detailed reason for the skipped moment.
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  successful: any;

  /**
   * Error on revocation
   *
   * @type {*}
   * @memberof RevocationResponse
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

export type RevocationCallback = (response: RevocationResponse) => void;
