import { defineConfig, HeadConfig, DefaultTheme } from "vitepress";
import pkg from "../../package.json";

const SideBar: DefaultTheme.Sidebar = [
  {
    text: "Guide",
    items: [
      { text: "Get Started", link: "/guide/" },
      {
        text: "Google Sign In Button",
        link: "/guide/google-signin-button",
      },
      {
        text: "One Tap Login",
        link: "/guide/one-tap-login",
      },
      {
        text: "Creating Custom Buttons",
        link: "/guide/creating-custom-buttons",
      },
    ],
  },
  {
    text: "Components",
    items: [],
  },
  {
    text: "Composables",
    items: [],
  },
  {
    text: "Utility Methods",
    items: [],
  },
];

const Head: HeadConfig[] = [
  ["meta", { name: "keywords", content: pkg.keywords.join(",") }],
];

const Nav: DefaultTheme.NavItem[] = [
  {
    text: "Guide",
    link: "/guide/",
  },
  {
    text: "SyetaLabs",
    link: "https://syetalabs.io",
  },
];

const SocialLinks: DefaultTheme.SocialLink[] = [
  {
    icon: "github",
    link: "https://github.com/syetalabs/vue3-google-signin",
  },
];

export default defineConfig({
  title: "Vue3 Google SignIn",
  description: "Google SignIn for Vue3 Apps",
  head: Head,
  themeConfig: {
    socialLinks: SocialLinks,
    nav: Nav,
    sidebar: SideBar,
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present Syeta Labs",
    },
  },
});
