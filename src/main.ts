import { createApp } from "vue";
import App from "./App.vue";
import GoogleOauth2Plugin from "./GoogleOauth2Plugin";

const app = createApp(App);

app.use(GoogleOauth2Plugin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});

app.mount("#app");
