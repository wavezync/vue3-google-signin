type UxMode = "popup" | "redirect";
type Context = "use" | "signin" | "signup";

export interface CredentialResponse {
  /** This field is the returned ID token */
  credential?: string;
  /** This field sets how the credential is selected */
  select_by?:
    | "auto"
    | "user"
    | "user_1tap"
    | "user_2tap"
    | "btn"
    | "btn_confirm"
    | "brn_add_session"
    | "btn_confirm_add_session";
  clientId?: string;
}

export interface IdConfiguration {
  /** Your application's client ID */

  client_id?: string;

  /** Enables automatic selection on Google One Tap */
  auto_select?: boolean;

  /** ID token callback handler */
  callback?: (credentialResponse: CredentialResponse) => void;

  /** The Sign In With Google button UX flow */
  ux_mode?: UxMode;

  /** The URL of your login endpoint */
  login_uri?: string;

  /** The URL of your password credential handler endpoint */
  native_login_uri?: string;

  /** The JavaScript password credential handler function name */
  native_callback?: (response: { id: string; password: string }) => void;

  /** Controls whether to cancel the prompt if the user clicks outside of the prompt */
  cancel_on_tap_outside?: boolean;

  /** The DOM ID of the One Tap prompt container element */
  prompt_parent_id?: string;

  /** A random string for ID tokens */
  nonce?: string;

  /** The title and words in the One Tap prompt */
  context?: Context;

  /** If you need to call One Tap in the parent domain and its subdomains, pass the parent domain to this attribute so that a single shared cookie is used. */
  state_cookie_domain?: string;

  /** The origins that are allowed to embed the intermediate iframe. One Tap will run in the intermediate iframe mode if this attribute presents */
  allowed_parent_origin?: string | string[];

  /**	Overrides the default intermediate iframe behavior when users manually close One Tap */
  intermediate_iframe_close_callback?: () => void;

  /** Enables upgraded One Tap UX on ITP browsers */
  itp_support?: boolean;

  /**
   * If your application knows the Workspace domain the user belongs to,
   * use this to provide a hint to Google. For more information,
   * see the [hd](https://developers.google.com/identity/protocols/oauth2/openid-connect#authenticationuriparameters)
   * field in the OpenID Connect docs.
   */
  hosted_domain?: string;
}
