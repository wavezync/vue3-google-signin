import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Vue3 Google Signin",
  description: "Google Signin for Vue3 Applications",
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/syetalabs/vue3-google-signin",
      },
    ],
    nav: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "SyetaLabs",
        link: "https://syetalabs.io",
      },
    ],
  },
});
