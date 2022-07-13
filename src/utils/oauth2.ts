import type { TokenResponse } from "@/interfaces/oauth2";

/**
 * Helper method for [google.accounts.oauth2.hasGrantedAllScopes](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.hasGrantedAllScopes)
 *
 * @export
 * @param {TokenResponse} tokenResponse - A valid access token
 * @param {string} firstScope - first scope
 * @param {...string[]} restScopes - other scopes
 * @return {*}  {boolean}
 */
export function hasGrantedAllScopes(
  tokenResponse: TokenResponse,
  firstScope: string,
  ...restScopes: string[]
): boolean {
  return (
    window.google?.accounts.oauth2.hasGrantedAllScopes(
      tokenResponse,
      firstScope,
      ...restScopes
    ) || false
  );
}

/**
 * Helper method for [google.accounts.oauth2.hasGrantedAnyScopes](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.hasGrantedAnyScopes)
 *
 * @export
 * @param {TokenResponse} tokenResponse - A valid access token
 * @param {string} firstScope - first scope
 * @param {...string[]} restScopes - other scopes
 * @return {*}  {boolean}
 */
export function hasGrantedAnyScopes(
  tokenResponse: TokenResponse,
  firstScope: string,
  ...restScopes: string[]
): boolean {
  return (
    window.google?.accounts.oauth2.hasGrantedAnyScope(
      tokenResponse,
      firstScope,
      ...restScopes
    ) || false
  );
}

/**
 * Helper method for [google.accounts.oauth2.revoke](https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.revoke)
 *
 * @export
 * @param {string} accessToken
 * @param {() => void} [done]
 */
export function revokeAccessToken(accessToken: string, done?: () => void) {
  window.google?.accounts.oauth2.revoke(accessToken, () => {
    done?.();
  });
}
