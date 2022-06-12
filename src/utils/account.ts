import type { RevocationCallback } from "@/interfaces/accounts";

/**
 * Helper method to [google.accounts.id.revoke](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.revoke)
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
