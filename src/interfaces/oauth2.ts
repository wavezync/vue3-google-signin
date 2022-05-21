export type ErrorCode =
  | "invalid_request"
  | "access_denied"
  | "unauthorized_client"
  | "unsupported_response_type"
  | "invalid_scope"
  | "server_error"
  | "temporarily_unavailable";

/**
 * CodeResponse from Google
 *
 * @export
 * @see https://developers.google.com/identity/oauth2/web/reference/js-reference#CodeResponse
 * @interface CodeResponse
 */
export interface CodeResponse {
  /** The authorization code of a successful token response */
  code: string;
  /**	A space-delimited list of scopes that are approved by the user */
  scope: string;
  /**	The string value that your application uses to maintain state between your authorization request and the response */
  state?: string;
  /**	A single ASCII error code */
  error?: ErrorCode;
  /** Human-readable ASCII text providing additional information, used to assist the client developer in understanding the error that occurred */
  error_description?: string;
  /** A URI identifying a human-readable web page with information about the error, used to provide the client developer with additional information about the error */
  error_uri?: string;
}

/**
 * Configure code client
 *
 * @export
 * @see https://developers.google.com/identity/oauth2/web/reference/js-reference#CodeClientConfig
 * @interface CodeClientConfig
 */
export interface CodeClientConfig {
  /**
   * The client ID for your application. You can find this value in the [API Console](https://console.developers.google.com/).
   *
   * @type {string}
   * @memberof CodeClientConfig
   */
  client_id: string;

  /**
   * A space-delimited list of scopes that identify the resources that your application could access on the user's behalf.
   * These values inform the consent screen that Google displays to the user.
   *
   * @type {string}
   * @memberof CodeClientConfig
   */
  scope: string;

  /**
   * Required for redirect UX. Determines where the API server redirects the user after the user completes the authorization flow.
   * The value must exactly match one of the authorized redirect URIs for the OAuth 2.0 client,
   * which you configured in the API Console and must conform to our [Redirect URI validation rules](https://developers.google.com/identity/protocols/oauth2/web-server#uri-validation).
   * The property will be ignored by the popup UX.
   *
   * @type {string}
   * @memberof CodeClientConfig
   */
  redirect_uri?: string;

  /**
   * 	Required for popup UX. The JavaScript function name that handles returned code response. The property will be ignored by the redirect UX.
   *
   * @memberof CodeClientConfig
   */
  callback?: (codeResponse: CodeResponse) => void;

  /**
   * Optional. Recommended for redirect UX.
   * Specifies any string value that your application uses to maintain state between your authorization request and the authorization server's response.
   *
   * @type {string}
   * @memberof CodeClientConfig
   */
  state?: string;

  /**
   * Optional, defaults to `true`. If set to false, [more granular Google Account permissions](https://developers.googleblog.com/2018/10/more-granular-google-account.html)
   * will be disabled for clients created before 2019.
   * No effect for newer clients, since more granular permissions is always enabled for them.
   *
   * @type {boolean}
   * @default true
   * @memberof CodeClientConfig
   */
  enable_serial_consent?: boolean;

  /**
   * Optional. If your application knows which user should authorize the request,
   * it can use this property to provide a hint to Google.
   * The email address for the target user. For more information, see the login_hint field in the OpenID Connect docs.
   *
   * @type {string}
   * @memberof CodeClientConfig
   */
  hint?: string;

  /**
   * Optional. If your application knows the Workspace domain the user belongs to,
   * use this to provide a hint to Google. For more information,
   * see the [hd](https://developers.google.com/identity/protocols/oauth2/openid-connect#authenticationuriparameters) field in the OpenID Connect docs.
   *
   * @type {string}
   * @memberof CodeClientConfig
   */
  hosted_domain?: string;

  /**
   * Optional. The UX mode to use for the authorization flow.
   * By default, it will open the consent flow in a popup. Valid values are popup and redirect.
   *
   * @type {("popup" | "redirect")}
   * @memberof CodeClientConfig
   */
  ux_mode?: "popup" | "redirect";

  /**
   * Optional, defaults to `false`. Boolean value to prompt the user to select an account.
   *
   * @type {boolean}
   * @default false
   * @memberof CodeClientConfig
   */
  select_account?: boolean;
}

export interface CodeClient {
  requestCode(): void;
}

export interface TokenResponse {
  /** The access token of a successful token response. */
  access_token: string;

  /** The lifetime in seconds of the access token. */
  expires_in: string;

  /** The hosted domain the signed-in user belongs to. */
  hd?: string;

  /** The prompt value that was used from the possible list of values specified by TokenClientConfig or OverridableTokenClientConfig */
  prompt: string;

  /** The type of the token issued. */
  token_type: string;

  /** A space-delimited list of scopes that are approved by the user. */
  scope: string;

  /** The string value that your application uses to maintain state between your authorization request and the response. */
  state?: string;

  /** A single ASCII error code. */
  error?: ErrorCode;

  /**	Human-readable ASCII text providing additional information, used to assist the client developer in understanding the error that occurred. */
  error_description?: string;

  /** A URI identifying a human-readable web page with information about the error, used to provide the client developer with additional information about the error. */
  error_uri?: string;
}

export interface TokenClientConfig {
  /**
   *  The client ID for your application. You can find this value in the
   *  [API Console](https://console.cloud.google.com/apis/dashboard)
   */
  client_id: string;

  /**
   * A space-delimited list of scopes that identify the resources
   * that your application could access on the user's behalf.
   * These values inform the consent screen that Google displays to the user
   */
  scope: string;

  /**
   * Required for popup UX. The JavaScript function name that handles returned code response
   * The property will be ignored by the redirect UX
   */
  callback?: (response: TokenResponse) => void;

  /**
   * Optional, defaults to 'select_account'. A space-delimited, case-sensitive list of prompts to present the user
   */
  prompt?: "" | "none" | "consent" | "select_account";

  /**
   * 	Optional, defaults to true. If set to false,
   * [more granular Google Account permissions](https://developers.googleblog.com/2018/10/more-granular-google-account.html)
   * will be disabled for clients created before 2019. No effect for newer clients,
   * since more granular permissions is always enabled for them.
   */
  enable_serial_consent?: boolean;

  /**
   * Optional. If your application knows which user should authorize the request,
   * it can use this property to provide a hint to Google.
   * The email address for the target user. For more information,
   * see the [login_hint](https://developers.google.com/identity/protocols/oauth2/openid-connect#authenticationuriparameters) field in the OpenID Connect docs.
   */
  hint?: string;

  /**
   * Optional. If your application knows the Workspace domain the user belongs to,
   * use this to provide a hint to Google. For more information,
   * see the [hd](https://developers.google.com/identity/protocols/oauth2/openid-connect#authenticationuriparameters)
   * field in the OpenID Connect docs.
   */
  hosted_domain?: string;

  /**
   * Optional. Not recommended. Specifies any string value that
   * your application uses to maintain state between your authorization
   * request and the authorization server's response.
   */
  state?: string;
}

export interface OverridableTokenClientConfig {
  /**
   * Optional. A space-delimited, case-sensitive list of prompts to present the user.
   */
  prompt?: string;

  /**
   * Optional. If set to false,
   * [more granular Google Account permissions](https://developers.googleblog.com/2018/10/more-granular-google-account.html)
   * will be disabled for clients created before 2019.
   * No effect for newer clients, since more granular permissions is always enabled for them.
   */
  enable_serial_consent?: boolean;

  /**
   * Optional. If your application knows which user should authorize the request,
   * it can use this property to provide a hint to Google.
   *  The email address for the target user. For more information,
   * see the [login_hint](https://developers.google.com/identity/protocols/oauth2/openid-connect#authenticationuriparameters) field in the OpenID Connect docs.
   */
  hint?: string;

  /**
   * Optional. Not recommended. Specifies any string value that your
   * application uses to maintain state between your authorization request
   * and the authorization server's response.
   */
  state?: string;
}

/**
 * Token client
 *
 * @export
 * @interface TokenClient
 */
export interface TokenClient {
  requestAccessToken(overrideConfig?: OverridableTokenClientConfig): void;
}
