import type { App, Plugin } from "vue";
import { GoogleClientIdKey } from "@/utils/symbols";
import GoogleLoginButton from "./components/GoogleLoginButton.vue";
import useGsiScript from "./composables/useGsiScript";
import useCodeClient from "./composables/useCodeClient";
import type {
  ImplicitFlowOptions,
  UseCodeClientResult,
} from "./composables/useCodeClient";
import useOneTap from "./composables/useOneTap";
import type {
  UseGoogleOneTapLoginOptions,
  UseOneTapResponse,
} from "./composables/useOneTap";
import useTokenClient from "./composables/useTokenClient";
import type {
  AuthCodeFlowOptions,
  UseTokenClientResult,
} from "./composables/useTokenClient";

export const PLUGIN_NAME = "GoogleOauth2Plugin";

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

const toPluginError = (err: string) => `[${PLUGIN_NAME}]: ${err}`;

const plugin: Plugin = {
  install(app: App, options: GoogleOauth2PluginOptions) {
    if (!options) {
      throw new Error(
        toPluginError(`initialize plugin by passing an options object`)
      );
    }

    if (!options.clientId && options.clientId.trim().length === 0) {
      throw new Error(toPluginError("clientId is required to initialize"));
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

export * from "./interfaces";
export * from "./utils";
export type {
  ImplicitFlowOptions,
  AuthCodeFlowOptions,
  UseCodeClientResult,
  UseGoogleOneTapLoginOptions,
  UseOneTapResponse,
  UseTokenClientResult,
};

export default plugin;
