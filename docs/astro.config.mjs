// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import vue from "@astrojs/vue";
import pkg from "../package.json" with { type: "json" };
import { sidebar } from "./src/sidebar.ts";

const SITE = "https://vue3-google-signin.wavezync.com";
const GITHUB = "https://github.com/wavezync/vue3-google-signin";

const meta = (/** @type {Record<string, string>} */ attrs) => ({
  tag: /** @type {const} */ ("meta"),
  attrs,
});
const link = (/** @type {Record<string, string>} */ attrs) => ({
  tag: /** @type {const} */ ("link"),
  attrs,
});

export default defineConfig({
  site: SITE,
  integrations: [
    starlight({
      title: "Vue3 Google Sign-in",
      description:
        "Sign in with Google, One Tap and Google OAuth2 for Vue 3 and Nuxt, built on Google Identity Services.",
      logo: { src: "./src/assets/logo.svg" },
      favicon: "/favicon.ico",
      social: [{ icon: "github", label: "GitHub", href: GITHUB }],
      editLink: { baseUrl: `${GITHUB}/edit/main/docs/` },
      customCss: ["./src/styles/custom.css"],
      components: {
        Footer: "./src/components/Footer.astro",
        Header: "./src/components/Header.astro",
        Hero: "./src/components/Hero.astro",
        SocialIcons: "./src/components/SocialIcons.astro",
      },
      head: [
        meta({ property: "og:image", content: `${SITE}/og.jpg` }),
        meta({ property: "og:image:width", content: "1200" }),
        meta({ property: "og:image:height", content: "630" }),
        meta({
          property: "og:image:alt",
          content:
            "Vue3 Google Sign-in: Google's sign-in button, One Tap and OAuth2 for Vue 3 and Nuxt",
        }),
        meta({ name: "twitter:site", content: "@wavezync" }),
        meta({ name: "keywords", content: pkg.keywords.join(",") }),
        meta({
          name: "theme-color",
          content: "#ffffff",
          media: "(prefers-color-scheme: light)",
        }),
        meta({
          name: "theme-color",
          content: "#17181c",
          media: "(prefers-color-scheme: dark)",
        }),
        link({
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        }),
        link({
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        }),
        link({
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        }),
        link({ rel: "manifest", href: "/site.webmanifest" }),
      ],
      sidebar,
    }),
    vue({ appEntrypoint: "/src/vue-app" }),
  ],
  vite: {
    // The playground's .env (VITE_GOOGLE_CLIENT_ID) lives in the repo root.
    envDir: fileURLToPath(new URL("..", import.meta.url)),
    envPrefix: ["PUBLIC_", "VITE_"],
    resolve: {
      // Demos run against the library source, not dist/.
      alias: {
        "vue3-google-signin": fileURLToPath(
          new URL("../src/plugin.ts", import.meta.url),
        ),
        "@": fileURLToPath(new URL("../src", import.meta.url)),
      },
    },
  },
});
