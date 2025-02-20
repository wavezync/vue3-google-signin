import { googleClientIdRef } from "@/store";

/**
 * Dynamically set the Google OAuth client ID for the application.
 * This method is primarily used with the `vue3-google-signin` plugin to configure the
 * `clientId` after retrieving it dynamically.
 *
 * @export
 * @param {string} id - The Google OAuth client ID to initialize.
 */
export default function setGoogleClientId(id: string) {
  googleClientIdRef.value = id;
}
