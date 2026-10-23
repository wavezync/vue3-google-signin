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

There is no test suite. CI (`.github/workflows/build.yaml`) runs `lint`, `format:check`, `build`, and `docs:build` on Node 22 and 24, so all must pass. Publishing to npm (with provenance) happens on GitHub release creation (`publish.yaml`).

## Architecture

- **Entry point is `src/plugin.ts`**, not `main.ts`. It is the tsdown entry (`tsdown.config.ts`), defines the plugin (`app.use(plugin, { clientId })`), provides `clientId` via the `GoogleClientIdKey` injection symbol, globally registers `GoogleSignInButton`, and re-exports every public composable, type, and util. Anything new that should be public has to be exported here. `main.ts`/`App.vue` are only the local dev playground, served by `vite.config.ts`. tsdown regenerates the `exports`/`main`/`module`/`types` fields in `package.json` on every build, so don't hand-edit them.
- **Script loading is a shared singleton** (`src/composables/useGsiScript.ts`). Module-level refs plus a subscriber count, incremented `onMounted` and decremented `onUnmounted`, ensure the `https://accounts.google.com/gsi/client` script is injected once. Every composable and the button call `useGsiScript()` and gate their setup on `scriptLoaded`. Because of the lifecycle hooks, these must be called from component `setup`.
- **Composables share one pattern**: `inject(GoogleClientIdKey)`, then a `watchEffect` that resets `isReady`, returns early until the script loads, `unref`s `MaybeRef` options (so passing refs re-initializes the client), calls the matching `window.google.accounts.*` init, and finally sets `isReady = true`.
  - `useOneTap` / `GoogleSignInButton`: `accounts.id.initialize` (+ `prompt` / `renderButton`), always with `use_fedcm_for_prompt: true`.
  - `useTokenClient`: `accounts.oauth2.initTokenClient`.
  - `useCodeClient`: `accounts.oauth2.initCodeClient`, and also builds `codeRequestRedirectUrl` for redirect mode.
  - Both OAuth2 clients always prepend `openid email profile` to the requested scopes.
- **Option type names are swapped relative to OAuth semantics.** `useCodeClient` takes `ImplicitFlowOptions` and `useTokenClient` takes `AuthCodeFlowOptions`. These names are public API, so don't rename them casually.
- **GIS typings are hand-written**: `src/interfaces/{accounts,oauth2}.ts` hold the GIS config/response types, and `src/@types/globals.ts` augments `Window.google`. Add new GIS options in those files first, then thread them through the composable/component.
- `src/utils/` holds public helpers (`decodeCredential`, `idRevoke`, `hasGrantedAllScopes`/`hasGrantedAnyScopes`, `revokeAccessToken`, `buildCodeRequestRedirectUrl`) plus the `MaybeRef` type.
- **Docs site** (`docs/`): Starlight pages live in `docs/src/content/docs/`; the custom landing page is `docs/src/pages/index.astro` (with `docs/src/components/LiveDemo.vue`). `docs/astro.config.mjs` aliases `vue3-google-signin` and `@/` to the library source, so demos run against `src/`, not `dist/`. The plugin is installed for every Vue island via `docs/src/vue-app.ts` (Astro `appEntrypoint`), reading `VITE_GOOGLE_CLIENT_ID` from the repo-root `.env`. Files in `docs/src/examples/` are both shown as code (`?raw` + `<Code>`) and rendered as live demos (`client:only="vue"`, since GIS is browser-only).
- Astro emits `.html` files (`build.format: "file"`) which Cloudflare Pages serves without the extension (old VitePress `.html` URLs 308 to it), so keep page slugs stable.

## Conventions

- Formatting is oxfmt with `printWidth: 80` (Prettier-compatible). Prefix unused vars/args with `_`.
- Public options/props carry JSDoc with `@see` links to the matching GIS reference anchor. Follow that when adding fields.
- When the public API changes, update the matching page under `docs/src/content/docs/` (`composables/`, `components/`, `helpers/`, `guide/`).
- In MDX, put fenced code inside `<TabItem>` at column 0 with blank lines around it; indented fences get collapsed by oxfmt.
