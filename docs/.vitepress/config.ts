import { defineConfig, HeadConfig, DefaultTheme } from "vitepress";
import pkg from "../../package.json";

const TITLE = "Vue3 Google Sign-in";
const DESCRIPTION = "Google Sign-in for Vue3 Apps";
const SOCIAL_PREVIEW_URL = "https://vue3-google-signin.wavezync.com/cover.png";

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
      {
        text: "Using with Electron",
        link: "/guide/using-with-electron",
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
        text: "useOneTap",
        link: "/composables/use-one-tap",
      },
      {
        text: "useGsiScript",
        link: "/composables/use-gsi-script",
      },
    ],
  },
  {
    text: "Helpers",
    items: [
      {
        text: "Account",
        link: "/helpers/account",
      },
      {
        text: "OAuth2",
        link: "/helpers/oauth2",
      },
    ],
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
    { property: "og:url", content: "https://vue3-google-signin.wavezync.com/" },
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
      content: "@wavezync",
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
    text: "🌐 Visit WaveZync",
    link: "https://wavezync.com",
  }
];

const SocialLinks: DefaultTheme.SocialLink[] = [
  {
    icon: "github",
    link: "https://github.com/wavezync/vue3-google-signin",
  }
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
      copyright: "Copyright © 2022-present WaveZync",
    },
    algolia: {
      apiKey: "5780c07dfe3e4a16e39773773e8a7b07",
      appId: "0N5FZ8VALF",
      indexName: "vue3-google-signin",
    },
  },
});
