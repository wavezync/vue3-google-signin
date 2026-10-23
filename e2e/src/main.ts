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

const params = new URLSearchParams(location.search);
// A ref so tests can change the client ID; `?clientId=` starts the app with
// another one (empty: none yet).
const clientId = ref(params.get("clientId") ?? CLIENT_ID);
const locale = params.get("locale") ?? undefined;

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

createApp(App).use(GoogleSignInPlugin, { clientId, locale }).mount("#app");
