import { defineConfig, HeadConfig, DefaultTheme } from "vitepress";
import pkg from "../../package.json";

const TITLE = "Vue3 Google Sign-in";
const DESCRIPTION = "Google SignIn for Vue3 Apps";
const SOCIAL_PREVIEW_URL = "https://vue3-google-signin.syetalabs.io/cover.png";

const SideBar: DefaultTheme.Sidebar = [
  {
    text: "Guide",
    items: [
      { text: "Get Started", link: "/guide/" },
      {
        text: "Google Sign-in Button",
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
    items: [
      {
        text: "GoogleSignInButton",
        link: "/components/google-signin-button",
      },
    ],
  },
  {
    text: "Composables",
    items: [
      {
        text: "useCodeClient",
        link: "/composables/use-code-client",
      },
      {
        text: "useTokenClient",
        link: "/composables/use-token-client",
      },
      {
        text: "useTokenClient",
        link: "/composables/use-one-tap",
      },
      {
        text: "useGsiScript",
        link: "/composables/use-gsi-script",
      },
    ],
  },
  {
    text: "Utilities",
    items: [],
  },
];

const Head: HeadConfig[] = [
  [
    "link",
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
  ],
  [
    "link",
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
  ],
  [
    "link",
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
  ],
  ["link", { rel: "manifest", href: "/site.webmanifest" }],
  [
    "link",
    {
      rel: "mask-icon",
      href: "/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
  ],
  ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
  ["meta", { name: "msapplication-TileColor", content: "#da532c" }],
  [
    "meta",
    {
      name: "msapplication-config",
      content: "/browserconfig.xml",
    },
  ],
  ["meta", { name: "theme-color", content: "#ffffff" }],

  ["meta", { name: "keywords", content: pkg.keywords.join(",") }],

  // og tags

  ["meta", { property: "og:title", content: TITLE }],
  ["meta", { property: "og:description", content: DESCRIPTION }],
  ["meta", { property: "og:type", content: "website" }],
  [
    "meta",
    {
      property: "og:image",
      content: SOCIAL_PREVIEW_URL,
    },
  ],
  [
    "meta",
    { property: "og:url", content: "https://vue3-google-signin.syetalabs.io/" },
  ],

  // twitter card
  [
    "meta",
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
  [
    "meta",
    {
      name: "twitter:site",
      content: "@syetalabs",
    },
  ],
  [
    "meta",
    {
      name: "twitter:title",
      content: TITLE,
    },
  ],
  [
    "meta",
    {
      name: "twitter:description",
      content: DESCRIPTION,
    },
  ],
  [
    "meta",
    {
      name: "twitter:image",
      content: SOCIAL_PREVIEW_URL,
    },
  ],
];

const Nav: DefaultTheme.NavItem[] = [
  {
    text: "Guide",
    link: "/guide/",
  },
  {
    text: "SyetaLabs 🡕",
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
  title: TITLE,
  description: DESCRIPTION,
  head: Head,
  themeConfig: {
    socialLinks: SocialLinks,
    logo: "/logo.svg",
    nav: Nav,
    sidebar: SideBar,
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present Syeta Labs",
    },
  },
});
