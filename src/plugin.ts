import type { App, Plugin } from "vue";
import { GoogleClientIdKey } from "@/utils/symbols";
import GoogleSignInButton from "./components/GoogleSignInButton.vue";
import useGsiScript from "./composables/useGsiScript";
import useCodeClient from "./composables/useCodeClient";
import useOneTap from "./composables/useOneTap";
import useTokenClient from "./composables/useTokenClient";

import type {
  ImplicitFlowOptions,
  UseCodeClientReturn,
  ImplicitFlowErrorResponse,
  ImplicitFlowSuccessResponse,
} from "./composables/useCodeClient";

import type {
  UseGoogleOneTapLoginOptions,
  UseOneTapResult,
} from "./composables/useOneTap";

import type {
  AuthCodeFlowOptions,
  UseTokenClientReturn,
  AuthCodeFlowErrorResponse,
  AuthCodeFlowSuccessResponse,
} from "./composables/useTokenClient";

import { googleClientIdRef } from "./states";

export interface GoogleSignInPluginOptions {
  /**
   * This field is your application's client ID, which is found and created in the Google Developers Console
   *
   * @type {string}
   * @see https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
   * @memberof GoogleSignInPluginOptions
   */
  clientId: string;
}

const plugin: Plugin = {
  install(app: App, options?: GoogleSignInPluginOptions) {
    googleClientIdRef.value = options?.clientId;
    app.provide(GoogleClientIdKey, googleClientIdRef);
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
  ImplicitFlowOptions,
  AuthCodeFlowOptions,
  UseCodeClientReturn as UseCodeClientResult,
  UseGoogleOneTapLoginOptions,
  UseOneTapResult as UseOneTapResponse,
  UseTokenClientReturn as UseTokenClientResult,
  ImplicitFlowErrorResponse,
  ImplicitFlowSuccessResponse,
  AuthCodeFlowErrorResponse,
  AuthCodeFlowSuccessResponse,
};
export * from "./methods";
export * from "./@types/globals";

export default plugin;
