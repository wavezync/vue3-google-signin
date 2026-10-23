import { createApp, ref } from "vue";
import GoogleSignInPlugin, {
  decodeCredential,
  hasGrantedAllScopes,
  hasGrantedAnyScopes,
  idRevoke,
  revokeAccessToken,
} from "vue3-google-signin";
import { CLIENT_ID } from "../shared";
import App from "./App.vue";

// A ref so tests can change the client ID; `?clientId=` starts the app with
// another one (empty: none yet).
const clientId = ref(
  new URLSearchParams(location.search).get("clientId") ?? CLIENT_ID,
);

// Helpers are plain functions; tests call them through the page.
Object.assign(window, {
  __clientId: clientId,
  __lib: {
    decodeCredential,
    hasGrantedAllScopes,
    hasGrantedAnyScopes,
    idRevoke,
    revokeAccessToken,
  },
});

createApp(App).use(GoogleSignInPlugin, { clientId }).mount("#app");
