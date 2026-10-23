// /llms.txt (https://llmstxt.org): a summary of the library and a link to
// every docs page, grouped and ordered like the sidebar.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { sidebar } from "../sidebar";

export const GET: APIRoute = async ({ site }) => {
  const docs = new Map((await getCollection("docs")).map((d) => [d.id, d]));
  const listed = new Set(
    sidebar.flatMap(({ items }) => items.map((i) => i.slug)),
  );
  const unlisted = [...docs.keys()].filter(
    (id) => id !== "index" && !listed.has(id),
  );
  if (unlisted.length) {
    throw new Error(`llms.txt: pages missing from the sidebar: ${unlisted}`);
  }
  const url = (path: string) => new URL(path, site).href;

  const sections = sidebar.map(({ label, items }) => {
    const links = items.map(({ slug }) => {
      const { title, description } = docs.get(slug)!.data;
      return `- [${title}](${url(`${slug}/`)}): ${description}`;
    });
    return `## ${label}\n\n${links.join("\n")}`;
  });

  const text = `# Vue3 Google Sign-in

> vue3-google-signin is a Vue 3 plugin for Google Identity Services (GIS). It
> provides Google's Sign in with Google button as a component, One Tap login,
> and the OAuth2 token and authorization code flows as composables. It works
> with Nuxt through the nuxt-vue3-google-signin module.

Install it with \`npm install vue3-google-signin\` and register it with
\`app.use(GoogleSignInPlugin, { clientId })\`, where \`clientId\` is an OAuth
client ID from the Google Cloud console. The package exports the
\`GoogleSignInButton\` component, the \`useOneTap\`, \`useTokenClient\`,
\`useCodeClient\` and \`useGsiScript\` composables, and helper functions. The
composables have to be called from a component's \`setup\`.

The full text of every page below is in one file: ${url("llms-full.txt")}

${sections.join("\n\n")}

## Optional

- [Source code](https://github.com/wavezync/vue3-google-signin): the GitHub repository, with issues and releases
- [npm package](https://www.npmjs.com/package/vue3-google-signin): published versions
- [Nuxt module](https://github.com/wavezync/nuxt-vue3-google-signin): nuxt-vue3-google-signin, which registers the plugin in Nuxt
- [Sign In With Google JavaScript reference](https://developers.google.com/identity/gsi/web/reference/js-reference): Google's google.accounts.id API, behind the button and One Tap
- [Google OAuth2 JavaScript reference](https://developers.google.com/identity/oauth2/web/reference/js-reference): Google's google.accounts.oauth2 API, behind useTokenClient and useCodeClient
`;
  return new Response(text);
};
