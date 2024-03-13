import type { RevocationCallback } from "@/interfaces/accounts";
import type { DecodedGoogleUser } from "./types";

/**
 * Helper method for [google.accounts.id.revoke](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.revoke)
 *
 * @param {string} hint - The email address or unique ID of the user's Google Account. The ID is the sub property of the credential payload.
 * @param {RevocationCallback} [callback] - Optional callback
 * @export
 * @param {type} params
 */
export function idRevoke(hint: string, callback?: RevocationCallback) {
  window.google?.accounts.id.revoke(hint, (resp) => {
    callback?.(resp);
  });
}

/**
 * Decode the credential token retrieved from the GoogleSignIn onSuccess response into a usable Object
 *
 * @param {string} credential
 * @returns {DecodedGoogleUser}
 */
export function decodeCredential(credential: string): DecodedGoogleUser {
  const base64Url = credential.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join(""),
  );
  const decodedToken = JSON.parse(jsonPayload);
  return {
    email: decodedToken.email,
    email_verified: decodedToken.email_verified,
    hd: decodedToken.hd,
    family_name: decodedToken.family_name,
    given_name: decodedToken.given_name,
    name: decodedToken.name,
    picture: decodedToken.picture,
    id: decodedToken.sub,
    issued_at: decodedToken.iat,
    expiration_time: decodedToken.exp,
  };
}
