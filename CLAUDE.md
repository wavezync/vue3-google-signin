# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`vue3-google-signin`: a Vue 3 plugin wrapping Google Identity Services (GIS). It ships as a library (ESM `dist/index.js` + CJS `dist/index.cjs`, with `.d.ts`/`.d.cts`) built by tsdown, with `vue` as an external peer dependency. Docs + landing site: https://vue3-google-signin.wavezync.com, built from `docs/` (a pnpm workspace package) with Astro + Starlight and deployed on Cloudflare Pages (build settings live in the Cloudflare dashboard: `pnpm docs:build`, output `docs/dist`, `PNPM_VERSION` env var set to the pinned pnpm).

## Commands

pnpm 12 (pinned via `packageManager`; needs Node 22+). pnpm settings, including the `allowBuilds` allowlist for dependency install scripts, live in `pnpm-workspace.yaml`, not `package.json`.

```sh
pnpm dev          # Vite playground: src/main.ts + src/App.vue (needs VITE_GOOGLE_CLIENT_ID in .env, see .env.example)
pnpm build        # vue-tsc --noEmit, then tsdown (also runs publint + attw on the output)
pnpm typecheck    # vue-tsc --noEmit only
pnpm lint         # oxlint (.oxlintrc.json); lint:fix to autofix
pnpm format       # oxfmt (.oxfmtrc.json); format:check in CI
pnpm docs:dev     # Astro dev server on :3001 (port matches the dev client ID's allowed origin)
pnpm docs:build
```

Tests live in the `e2e/` workspace package and run against the **built** `dist/` (via `vue3-google-signin: workspace:*`), so build first; `pnpm test` does both.

```sh
pnpm test                                        # build, then node:test + Playwright
pnpm --filter e2e exec playwright test tests/one-tap.spec.ts   # one spec (after pnpm build)
pnpm --filter e2e exec playwright test -g "cancels the prompt"  # one test by name
node --test e2e/node/package.test.mjs            # CJS/ESM/SSR checks only
```

- Playwright (installed Chrome, `channel: "chrome"`) drives a Vite fixture app (`e2e/src/App.vue`, one component per `?scenario=` in `e2e/src/scenarios/`). `e2e/tests/fixtures.ts` routes `https://accounts.google.com/gsi/client` to `e2e/gsi-stub.js`, which records every GIS call in `window.__gsi.calls` and lets tests fire Google's callbacks (`credential`, `promptMoment`, `tokenResponse`, `codeResponse`). Scenarios report what the library handed them via `log()` into `window.__events`.
- Real Google sign-in can't be automated; anything that needs Google's actual UI is out of scope for the suite.

CI (`.github/workflows/build.yaml`) runs `lint`, `format:check`, `build`, the e2e tests, and `docs:build` on Node 24 LTS (pinned in `.node-version`, also read by Cloudflare Pages), so all must pass. Publishing to npm (with provenance) happens on GitHub release creation (`publish.yaml`).

## Architecture

- **Entry point is `src/plugin.ts`**, not `main.ts`. It is the tsdown entry (`tsdown.config.ts`), defines the plugin (`app.use(plugin, { clientId })`), provides the optional `clientId` (string or ref) via the `GoogleClientIdKey` injection symbol, globally registers `GoogleSignInButton`, and re-exports every public composable, type, and util. Anything new that should be public has to be exported here. `main.ts`/`App.vue` are only the local dev playground, served by `vite.config.ts`. tsdown regenerates the `exports`/`main`/`module`/`types` fields in `package.json` on every build, so don't hand-edit them.
- **Script loading is a shared singleton** (`src/composables/useGsiScript.ts`). Module-level `loaded`/`error` refs plus an idempotent `load()` run `onMounted` inject the `https://accounts.google.com/gsi/client` script once (a failed load is removed so the next mount retries); nothing touches the DOM during SSR. Every composable and the button call `useGsiScript()` and gate their setup on `scriptLoaded`. Because of the lifecycle hook, these must be called from component `setup`.
- **Composables share one pattern**: `useClientId(options.clientId)` (`src/utils/symbols.ts`: the caller's own client ID, else the plugin's, which may be a ref), then a `watchEffect` that resets `isReady`, returns early until the script has loaded and a client ID exists, `unref`s `MaybeRef` options (so passing refs re-initializes the client), calls the matching `window.google.accounts.*` init, and finally sets `isReady = true`.
  - `useOneTap` / `GoogleSignInButton`: `accounts.id.initialize` (+ `prompt` / `renderButton`), always with `use_fedcm_for_prompt: true`.
  - `useTokenClient`: `accounts.oauth2.initTokenClient`.
  - `useCodeClient`: `accounts.oauth2.initCodeClient`, and also builds `codeRequestRedirectUrl` for redirect mode.
  - Both OAuth2 clients always prepend `openid email profile` to the requested scopes.
- Option/response types are named after the composable (`UseCodeClientOptions`, `TokenClientSuccessResponse`, ...). The v2 names (`ImplicitFlow*` for the code client, `AuthCodeFlow*` for the token client) had the two OAuth flows swapped; they remain as `@deprecated` aliases and are public API, so keep exporting them.
- **GIS typings are hand-written**: `src/interfaces/{accounts,oauth2}.ts` hold the GIS config/response types, and `src/@types/globals.ts` augments `Window.google`. Add new GIS options in those files first, then thread them through the composable/component.
- `src/utils/` holds public helpers (`decodeCredential`, `idRevoke`, `hasGrantedAllScopes`/`hasGrantedAnyScopes`, `revokeAccessToken`, `buildCodeRequestRedirectUrl`) plus the `MaybeRef` type.
- **Docs site** (`docs/`): Starlight pages live in `docs/src/content/docs/`; the home page (`docs/src/content/docs/index.mdx`) is a Starlight splash page whose hero is replaced by `docs/src/components/Hero.astro` and whose header by the floating glass nav in `docs/src/components/Header.astro` (docs pages get the same links through the `SocialIcons.astro` override; both read `nav-links.ts`) (both registered under `components` in `astro.config.mjs`; `Header.astro` renders Starlight's default header on every other page, and the hero wraps the live ID-token demo `LiveDemo.vue`), followed by home-only components (`HowItWorks`, `FlowExplorer`, `Features`, `UsedBy`, `GetStarted`, `MadeBy`, `InstallCommand`). `Footer.astro` overrides Starlight's footer on every page to add the MIT/WaveZync copyright line; `docs/public/wavezync-{48,112}.webp` are the WaveZync mark cut from the company logo, sized for its 16px and 56px uses. Their icons are one hand-drawn line set in `docs/src/components/icons.ts`, rendered by `LineIcon.astro`; add new ones there in the same style. Home-only CSS hangs off `[data-has-hero]` in `custom.css`, and the Outfit display font is imported only by the hero. SEO for the home page (title, `og:type`, JSON-LD) lives in its frontmatter `head`; site-wide tags in `astro.config.mjs`. `docs/src/assets/logo.svg` is a hand-built vector of the logo, and the hero's ring reuses its paths. `docs/astro.config.mjs` aliases `vue3-google-signin` and `@/` to the library source, so demos run against `src/`, not `dist/`. The plugin is installed for every Vue island via `docs/src/vue-app.ts` (Astro `appEntrypoint`), reading `VITE_GOOGLE_CLIENT_ID` from the repo-root `.env`. Files in `docs/src/examples/` are both shown as code (`?raw` + `<Code>`) and rendered as live demos (`client:only="vue"`, since GIS is browser-only).
- The `GoogleSignInButton` page opens with `ButtonPlayground.vue` (the real button, re-rendered as props change) and lists props and events with `ApiList.astro` from `docs/src/components/button-api.ts`; update that file when the component's props or emits change. Demo buttons in the guides (`.demo button` in `custom.css`) follow Google's branding guidelines for custom sign-in buttons.
- The sidebar lives in `docs/src/sidebar.ts`. `/llms.txt` (page index) and `/llms-full.txt` (every page as Markdown) are endpoints in `docs/src/pages/` that follow it. `llms-full.txt.ts` converts MDX line by line and fails the build on a component it doesn't know, so teach it any new MDX component (live demos with a `client:` directive are skipped).
- Pages build to directory URLs (`/guide/one-tap-login/`). The old VitePress `.html` URLs are mapped one by one in `docs/public/_redirects` (Cloudflare Pages), so update it when a page is added, renamed or removed. `docs/public/_headers` caches the hashed `/_astro/*` files as immutable.
- Page-to-page navigation uses cross-document view transitions plus Astro hover prefetch. The `@view-transition` opt-in is an inline `<style>` in `head` (`astro.config.mjs`), since Chrome ignores it from an external stylesheet, and an inline script there holds rendering of in-site navigations until `#footer-legal` (`Footer.astro`) is parsed. Keep that id on the last element of every page.

## Conventions

- Formatting is oxfmt with `printWidth: 80` (Prettier-compatible). Prefix unused vars/args with `_`.
- Public options/props carry JSDoc with `@see` links to the matching GIS reference anchor. Follow that when adding fields.
- When the public API changes, update the matching page under `docs/src/content/docs/` (`composables/`, `components/`, `helpers/`, `guide/`).
- In MDX, put fenced code inside `<TabItem>` at column 0 with blank lines around it; indented fences get collapsed by oxfmt.
