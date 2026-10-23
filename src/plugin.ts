import { isRef, type App, type Plugin } from "vue";
import type { MaybeRef } from "@/utils/types";
import { GoogleClientIdKey } from "@/utils/symbols";
import GoogleSignInButton from "./components/GoogleSignInButton.vue";
import useGsiScript, { setScriptLocale } from "./composables/useGsiScript";
import useCodeClient from "./composables/useCodeClient";
import useOneTap from "./composables/useOneTap";
import useTokenClient from "./composables/useTokenClient";

import type {
  UseCodeClientOptions,
  UseCodeClientReturn,
  CodeClientErrorResponse,
  CodeClientSuccessResponse,
  ImplicitFlowOptions,
  ImplicitFlowErrorResponse,
  ImplicitFlowSuccessResponse,
} from "./composables/useCodeClient";

import type {
  UseGoogleOneTapLoginOptions,
  UseOneTapResult,
} from "./composables/useOneTap";

import type {
  UseTokenClientOptions,
  UseTokenClientReturn,
  TokenClientErrorResponse,
  TokenClientSuccessResponse,
  AuthCodeFlowOptions,
  AuthCodeFlowErrorResponse,
  AuthCodeFlowSuccessResponse,
} from "./composables/useTokenClient";

export const PLUGIN_NAME = "GoogleSignInPlugin";

export interface GoogleSignInPluginOptions {
  /**
   * This field is your application's client ID, which is found and created in the Google Developers Console.
   * Pass a ref to set or change it later, for example after fetching it from your server.
   * Leave it out to give each composable or button its own `clientId`.
   *
   * @type {MaybeRef<string>}
   * @see https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
   * @memberof GoogleSignInPluginOptions
   */
  clientId?: MaybeRef<string | undefined>;

  /**
   * Language to load Google's script in, such as `en` or `fr`. It sets the
   * placeholder Google shows while a button loads and the One Tap prompt's text.
   * Defaults to the browser's language. Use the button's `locale` prop as well
   * to set the button itself.
   *
   * @type {string}
   * @memberof GoogleSignInPluginOptions
   */
  locale?: string;
}

const toPluginMessage = (msg: string) => `[${PLUGIN_NAME}]: ${msg}`;

const plugin: Plugin = {
  install(app: App, options: GoogleSignInPluginOptions = {}) {
    const { clientId } = options;
    // An explicit but empty client ID is usually a missing env variable.
    // Warn instead of throwing so the rest of the app still runs.
    if ("clientId" in options && !isRef(clientId) && !clientId?.trim()) {
      console.warn(
        toPluginMessage(
          "clientId is empty, so Google sign-in stays disabled until a composable or button gets its own",
        ),
      );
    }

    setScriptLocale(options.locale);
    app.provide(GoogleClientIdKey, clientId);
    app.component("GoogleSignInButton", GoogleSignInButton);
  },
};

export {
  GoogleSignInButton,
  useCodeClient,
  useGsiScript,
  useTokenClient,
  useOneTap,
};

export * from "./interfaces";
export * from "./utils";
export type {
  UseCodeClientOptions,
  UseCodeClientReturn as UseCodeClientResult,
  CodeClientErrorResponse,
  CodeClientSuccessResponse,
  UseGoogleOneTapLoginOptions,
  UseOneTapResult as UseOneTapResponse,
  UseTokenClientOptions,
  UseTokenClientReturn as UseTokenClientResult,
  TokenClientErrorResponse,
  TokenClientSuccessResponse,
  // Deprecated: the old names had the two flows swapped
  ImplicitFlowOptions,
  ImplicitFlowErrorResponse,
  ImplicitFlowSuccessResponse,
  AuthCodeFlowOptions,
  AuthCodeFlowErrorResponse,
  AuthCodeFlowSuccessResponse,
};
export * from "./@types/globals";

export default plugin;
