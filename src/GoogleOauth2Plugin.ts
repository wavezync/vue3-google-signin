import type { App, Plugin } from "vue";
import { GoogleClientIdKey } from "@/utils/symbols";
import GoogleLoginButton from "./components/GoogleLoginButton.vue";
import useGsiScript from "./composables/useGsiScript";
import useCodeClient from "./composables/useCodeClient";
import useOneTap from "./composables/useOneTap";
import useTokenClient from "./composables/useTokenClient";

const PLUGIN_NAME = "GoogleOauth2Plugin";

export interface GoogleOauth2PluginOptions {
  /**
   * This field is your application's client ID, which is found and created in the Google Developers Console
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
   * @memberof GoogleOauth2PluginOptions
   */
  clientId: string;
}

const plugin: Plugin = {
  install(app: App, options: GoogleOauth2PluginOptions) {
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

export {
  GoogleLoginButton,
  useCodeClient,
  useGsiScript,
  useTokenClient,
  useOneTap,
};

export default plugin;
