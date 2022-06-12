import { CodeClient } from "../interfaces/oauth2";

import {
  IdConfiguration,
  MomentListener,
  GsiButtonConfiguration,
  RevocationCallback,
} from "@/interfaces/accounts";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (idConfiguration: IdConfiguration) => void;
          prompt: (momentListener?: MomentListener) => void;
          renderButton: (
            parent: HTMLElement,
            options: GsiButtonConfiguration,
            clickHandler?: () => void
          ) => void;
          disableAutoSelect: () => void;
          storeCredential: (
            credential: { id: string; password: string },
            callback?: () => void
          ) => void;
          cancel: () => void;
          onGoogleLibraryLoad: () => void;
          revoke: (hint: string, callback?: RevocationCallback) => void;
        };
        oauth2: {
          initTokenClient: (config: TokenClientConfig) => {
            requestAccessToken: (
              overridableClientConfig?: OverridableTokenClientConfig
            ) => void;
          };
          initCodeClient: (config: CodeClientConfig) => CodeClient;
          hasGrantedAnyScope: (
            tokenRsponse: TokenResponse,
            firstScope: string,
            ...restScopes: string[]
          ) => boolean;
          hasGrantedAllScopes: (
            tokenRsponse: TokenResponse,
            firstScope: string,
            ...restScopes: string[]
          ) => boolean;
          revoke: (accessToken: string, done?: () => void) => void;
        };
      };
    };
  }
}
