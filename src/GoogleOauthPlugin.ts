import type { App, Plugin } from "vue";
import { GoogleClientIdKey } from "@/utils/symbols";
import GoogleLoginButton from "./components/GoogleLoginButton.vue";

const PLUGIN_NAME = "GoogleOauthPlugin";

export interface GoogleOauthPluginOptions {
  /**
   * This field is your application's client ID, which is found and created in the Google Developers Console
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
   * @memberof GoogleOauthPluginOptions
   */
  clientId: string;
}

const plugin: Plugin = {
  install(app: App, options: GoogleOauthPluginOptions) {
    // TODO: introduce plugin errors once proposal accepted

    if (!options) {
      throw new Error(`[${PLUGIN_NAME}]: initialize plugin by passing`);
    }

    if (!options.clientId) {
      throw new Error(`[${PLUGIN_NAME}]: clientId is required to initialize`);
    }

    app.provide(GoogleClientIdKey, options.clientId);
    app.component("GoogleLoginButton", GoogleLoginButton);
  },
};

export { GoogleLoginButton };

export default plugin;
