import DefaultTheme from "vitepress/theme";

export default {
  ...DefaultTheme,
  async enhanceApp({ app }: any) {
    if (!import.meta.env.SSR) {
      const plugin = await import("../../../src/plugin");
      app.use(plugin.default ?? plugin, {
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      });
    }
  },
};
