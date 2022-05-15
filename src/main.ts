import { createApp } from "vue";
import App from "./App.vue";
import GoogleOauthPlugin from "./GoogleOauthPlugin";

const app = createApp(App);

app.use(GoogleOauthPlugin, { clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID });

app.mount("#app");
