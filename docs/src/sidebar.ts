// The docs sidebar. astro.config.mjs hands it to Starlight, and the llms.txt
// endpoints (src/pages/llms*.txt.ts) list the pages in the same order.
export const sidebar = [
  {
    label: "Start Here",
    items: [
      { label: "Get Started", slug: "guide" },
      { label: "Using with Nuxt", slug: "guide/nuxt" },
    ],
  },
  {
    label: "Guides",
    items: [
      { label: "Sign In with the Button", slug: "guide/google-signin-button" },
      { label: "Sign In with One Tap", slug: "guide/one-tap-login" },
      { label: "Verify Users on Your Server", slug: "guide/verify-users" },
      { label: "Build a Custom Button", slug: "guide/creating-custom-buttons" },
      { label: "Call Google APIs", slug: "guide/google-apis" },
      {
        label: "Set the Client ID at Runtime",
        slug: "guide/dynamic-client-id",
      },
      { label: "Desktop Apps", slug: "guide/using-with-electron" },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "FAQ", slug: "guide/faq" },
      { label: "Migrating to v3", slug: "guide/migrating-to-v3" },
      { label: "Changelog", slug: "changelog" },
    ],
  },
  {
    label: "Components",
    items: [
      { label: "GoogleSignInButton", slug: "components/google-signin-button" },
    ],
  },
  {
    label: "Composables",
    items: [
      { label: "useCodeClient", slug: "composables/use-code-client" },
      { label: "useTokenClient", slug: "composables/use-token-client" },
      { label: "useOneTap", slug: "composables/use-one-tap" },
      { label: "useGsiScript", slug: "composables/use-gsi-script" },
    ],
  },
  {
    label: "Helpers",
    items: [
      { label: "Account", slug: "helpers/account" },
      { label: "OAuth2", slug: "helpers/oauth2" },
    ],
  },
];
