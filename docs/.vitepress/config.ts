import { defineConfig } from "vitepress";
import pkg from "../../package.json";

const SideBar = [
  {
    text: "Guide",
    items: [{ text: "Get Started", link: "/guide/" }],
  },
];

export default defineConfig({
  title: "Vue3 Google Signin",
  description: "Google Signin for Vue3 Applications",
  head: [["meta", { name: "keywords", content: pkg.keywords.join(",") }]],
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
    sidebar: SideBar,
  },
});
