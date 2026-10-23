import { createApp } from "vue";
import GoogleSignInPlugin, {
  decodeCredential,
  hasGrantedAllScopes,
  hasGrantedAnyScopes,
  idRevoke,
  revokeAccessToken,
} from "vue3-google-signin";
import { CLIENT_ID } from "../shared";
import App from "./App.vue";

// Helpers are plain functions; tests call them through the page.
Object.assign(window, {
  __lib: {
    decodeCredential,
    hasGrantedAllScopes,
    hasGrantedAnyScopes,
    idRevoke,
    revokeAccessToken,
  },
});

createApp(App).use(GoogleSignInPlugin, { clientId: CLIENT_ID }).mount("#app");
