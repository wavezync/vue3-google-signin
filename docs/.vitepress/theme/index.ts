import DefaultTheme from "vitepress/theme";
import Plugin from "../../../src/plugin";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: any) {
    app.use(Plugin, {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    });
  },
};
