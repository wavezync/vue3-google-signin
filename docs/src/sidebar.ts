// The docs sidebar. astro.config.mjs hands it to Starlight, and the llms.txt
// endpoints (src/pages/llms*.txt.ts) list the pages in the same order.
export const sidebar = [
  {
    label: "Guide",
    items: [
      { label: "Get Started", slug: "guide" },
      { label: "Google Sign-in Button", slug: "guide/google-signin-button" },
      { label: "One Tap Login", slug: "guide/one-tap-login" },
      {
        label: "Creating Custom Buttons",
        slug: "guide/creating-custom-buttons",
      },
      { label: "Dynamic Client ID", slug: "guide/dynamic-client-id" },
      { label: "Using with Electron", slug: "guide/using-with-electron" },
      { label: "FAQ", slug: "guide/faq" },
      { label: "Migrating to v3", slug: "guide/migrating-to-v3" },
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
