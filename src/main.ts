import { createApp } from "vue";
import App from "./App.vue";
import GoogleOauth2Plugin from "./plugin";

const app = createApp(App);

// for static
app.use(GoogleOauth2Plugin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});

// for dynamic
// app.use(GoogleOauth2Plugin);

app.mount("#app");
