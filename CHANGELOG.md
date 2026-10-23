# Changelog

Every release of vue3-google-signin, newest first. Also on the docs site:
https://vue3-google-signin.wavezync.com/changelog/

## Unreleased

[Compare with 2.1.1](https://github.com/wavezync/vue3-google-signin/compare/v2.1.1...HEAD)

### Breaking changes

- Build the library with tsdown and ship real ESM + CJS ([f7e7cdb](https://github.com/wavezync/vue3-google-signin/commit/f7e7cdb0fcc0e94d988ee30c4a8b31ec6a2bd461))
- Name option and response types after their composable ([31e7d46](https://github.com/wavezync/vue3-google-signin/commit/31e7d46c3af1e3c0a6d252d9774dca5d880b3bb7))

### Features

- **oauth2:** Add onNonOAuthError for closed or blocked popups ([c6136a4](https://github.com/wavezync/vue3-google-signin/commit/c6136a42b967bbc77307aa34a5cf5a3a763fcc7c))
- Pass Google's response to the button error event and useOneTap onError ([879b7bd](https://github.com/wavezync/vue3-google-signin/commit/879b7bd88426709ffc6eeddac65fda1b25e7c1e0))
- Accept a reactive or per-call client ID ([788f723](https://github.com/wavezync/vue3-google-signin/commit/788f7236e97896170d05ad975bd1dbea71586c7e))
- Align GIS options with Google's current reference ([d385592](https://github.com/wavezync/vue3-google-signin/commit/d3855921a65c448bc4f35000b9f4737c1eb72ffc))
- **plugin:** Add a locale option for Google's script ([452d685](https://github.com/wavezync/vue3-google-signin/commit/452d6851b8bf63b120e407a22b1ad3245bb6bd53))
- **types:** Success callbacks receive a credential that is always set ([5174358](https://github.com/wavezync/vue3-google-signin/commit/5174358e7969fcb191e299f001975f07ed430dd7))

### Bug fixes

- Update social preview URL and replace cover image ([a14ea38](https://github.com/wavezync/vue3-google-signin/commit/a14ea387e9ad2bab31992981b232add10ce406db))
- Update social preview URL to correct image ([6399a1d](https://github.com/wavezync/vue3-google-signin/commit/6399a1d7c490dc1ea1a76da9da5f535475c8ed94))
- **utils:** Decode credentials without window so decodeCredential works on the server ([05ecf25](https://github.com/wavezync/vue3-google-signin/commit/05ecf256b007522bbf245208bde1eb271f382123))
- **script:** Load the GSI script on mount without module-level watchers ([67318f2](https://github.com/wavezync/vue3-google-signin/commit/67318f26847a2df9c3a10d364598093985294d12))
- **button:** Reserve the button's height before Google renders it ([2f2ceb1](https://github.com/wavezync/vue3-google-signin/commit/2f2ceb1c3cf0681db334f19917037f23ed5245c4))
- **plugin:** Warn instead of throwing on an empty clientId ([69367c4](https://github.com/wavezync/vue3-google-signin/commit/69367c48caac1773995db525c4595f3d33ab34b7))

<details>
<summary>Documentation (32)</summary>

- Add CLAUDE.md and update development setup for pnpm ([bffa8cf](https://github.com/wavezync/vue3-google-signin/commit/bffa8cf04fee80bc3404c7e534c6deca640b4b53))
- Migrate docs site from VitePress to Astro Starlight ([b434989](https://github.com/wavezync/vue3-google-signin/commit/b4349896ab5a0f76e437a5a7078e512aa0037232))
- Add landing page with a live sign-in demo ([b626300](https://github.com/wavezync/vue3-google-signin/commit/b626300cb4c1ca7287604f9e8f2bca74be48332c))
- Target Cloudflare Pages instead of Vercel ([af4eaea](https://github.com/wavezync/vue3-google-signin/commit/af4eaeaf96937fec87341e7b1649f051836c5081))
- Use clean directory URLs and redirect old .html links ([9e6b075](https://github.com/wavezync/vue3-google-signin/commit/9e6b0755314fc5eabe906a4521a70c0b702780ea))
- Rebuild home page on Starlight's splash layout ([a95235f](https://github.com/wavezync/vue3-google-signin/commit/a95235f468148c60695a9e53889d5dc42a279438))
- Add FAQ and v3 migration guide, document options as tables ([247a853](https://github.com/wavezync/vue3-google-signin/commit/247a85368c6a258c6187dd7a1d04a8a8e8cd1b44))
- Show projects that use the library on the home page ([7ecf4e1](https://github.com/wavezync/vue3-google-signin/commit/7ecf4e1ced10da627f8d04f3115811e4de552604))
- Redraw the logo as a vector ([f6b3c1c](https://github.com/wavezync/vue3-google-signin/commit/f6b3c1cfb649d0dcaa4aff97286bfd43f896e124))
- Redesign the home page and tune its SEO ([cbfc125](https://github.com/wavezync/vue3-google-signin/commit/cbfc12561ef92c6e930765c915e0045e9a89e62a))
- Floating glass nav on the home page ([725de83](https://github.com/wavezync/vue3-google-signin/commit/725de83f07e373fe66b864898165accee0127912))
- Add how-it-works diagram, flow decision tree and icons ([603c292](https://github.com/wavezync/vue3-google-signin/commit/603c292262ca2ad4cfd5cc1610ef6c71e14f0c6b))
- Give each feature tile its own illustration ([acc824c](https://github.com/wavezync/vue3-google-signin/commit/acc824c0be3bfd637dddadaa254e6a151553963a))
- Bring back the WaveZync callout ([2551169](https://github.com/wavezync/vue3-google-signin/commit/255116971a8ad29397d09fc8fab8d3dc0b810d1a))
- Stop docs styles clipping Google's button in demos ([de13f5c](https://github.com/wavezync/vue3-google-signin/commit/de13f5c9cad03eb7d03f24da335ef8618ab9e221))
- Redesign the GoogleSignInButton page and the demo buttons ([c47eb24](https://github.com/wavezync/vue3-google-signin/commit/c47eb24cb44e756c9971921977b8c7a3c42c41e1))
- Styled dropdowns site-wide and highlighted playground code ([b369cf9](https://github.com/wavezync/vue3-google-signin/commit/b369cf93c6a63be31b9679b02a6792f906a8fee9))
- Add a dynamic client ID guide ([ad8e9cf](https://github.com/wavezync/vue3-google-signin/commit/ad8e9cfff362bb67f14ee031319240cea90a1507))
- Add the top-level nav links to docs pages ([9ae9502](https://github.com/wavezync/vue3-google-signin/commit/9ae9502d490d860a57f4e5eaace66f099dcf7a93))
- New OG image ([dba15dc](https://github.com/wavezync/vue3-google-signin/commit/dba15dca8ecef5c43b6207d8ad5cab9c9b98a8a7))
- Call out multi-tenant client IDs on the home page ([37197b9](https://github.com/wavezync/vue3-google-signin/commit/37197b95c9ac9b5c9f24641d16b4014e33c48e49))
- Publish llms.txt and llms-full.txt ([0eac632](https://github.com/wavezync/vue3-google-signin/commit/0eac63263201a30dcff564ec88997e0ab80a262a))
- Show real usage numbers and project cards in Used by ([028e52a](https://github.com/wavezync/vue3-google-signin/commit/028e52a88dbcbb9f8ac430e6eba135ab73df0ca7))
- Specific page descriptions and trailing-slash links ([cc64006](https://github.com/wavezync/vue3-google-signin/commit/cc64006aebd69f04bcc180ea8b350f51f1e4f560))
- Serve the WaveZync mark at the sizes it's shown ([04958af](https://github.com/wavezync/vue3-google-signin/commit/04958af641ecfc2984fb528f0df91420af3c7b80))
- Chart real usage in the Used by section ([7385273](https://github.com/wavezync/vue3-google-signin/commit/738527333be58b3ecb2a5cbc361a3d8461ab8818))
- Cache hashed assets for a year and preload the hero font ([b680d44](https://github.com/wavezync/vue3-google-signin/commit/b680d44e87b355b9c75fc390f31b9f53b0a21c6f))
- Cross-fade between pages instead of flashing ([c3c4d14](https://github.com/wavezync/vue3-google-signin/commit/c3c4d14f7adba938f5e45083387115897fdb41f3))
- Fetch usage numbers at build time ([9b64418](https://github.com/wavezync/vue3-google-signin/commit/9b644189db7685e476cfd277015e140787c28edf))
- Correct CLAUDE.md on use_fedcm_for_prompt ([305b283](https://github.com/wavezync/vue3-google-signin/commit/305b283a912ff0b16076508122a5ff2d17c6c37a))
- Keep Google's script out of the hero ([c3d0bcc](https://github.com/wavezync/vue3-google-signin/commit/c3d0bcc6a1757db109e079b10bc6cf94dddb489d))
- Deploy the docs site with Cloudflare Workers static assets ([d7f7703](https://github.com/wavezync/vue3-google-signin/commit/d7f770310f6332414daebea7ac52fd03bc2eddbb))

</details>

<details>
<summary>Tooling (6)</summary>

- Migrate from npm to pnpm 12 ([b1c7bef](https://github.com/wavezync/vue3-google-signin/commit/b1c7beff7573a37833d99f8bc3f3c79ef30ef4cd))
- Use pnpm on Node 22/24 and publish with provenance ([acb8872](https://github.com/wavezync/vue3-google-signin/commit/acb8872f5131b985d574d6042dca31f5c6f22736))
- **deps:** Upgrade to vue 3.5.44, vite 8, typescript 6 and vue-tsc 3 ([cd312cf](https://github.com/wavezync/vue3-google-signin/commit/cd312cfac29dee44e265e7df7ec1fc01bba7a500))
- Replace eslint and prettier with oxlint and oxfmt ([551e5e3](https://github.com/wavezync/vue3-google-signin/commit/551e5e3122d87f09a4d4182156fe11a1e79d8223))
- Run on Node 24 LTS from .node-version and tidy workflows ([662ac22](https://github.com/wavezync/vue3-google-signin/commit/662ac22dd734f7861e5e90a12809ba9edc674bdd))
- Add e2e suite against the built package ([6fb9040](https://github.com/wavezync/vue3-google-signin/commit/6fb9040d215b33c8e86d7ffff7d69bc7f5a723ec))

</details>

## 2.1.1

Released February 20, 2025. [Compare with 2.1.0](https://github.com/wavezync/vue3-google-signin/compare/v2.1.0...v2.1.1)

### Bug fixes

- Update gpr permissions ([82aea6d](https://github.com/wavezync/vue3-google-signin/commit/82aea6d693716796e6a7069e2698f32c1ddd0501))

## 2.1.0

Released February 20, 2025. [Compare with 2.0.1](https://github.com/wavezync/vue3-google-signin/compare/v2.0.1...v2.1.0)

### Bug fixes

- Fedcm ([6600430](https://github.com/wavezync/vue3-google-signin/commit/66004303f09a82c06804e4629bc5722e7a7a8fcb))
- Build ([0479e1e](https://github.com/wavezync/vue3-google-signin/commit/0479e1edf77e05ad8c068afa38cef61c213ff5e5))

<details>
<summary>Tooling (1)</summary>

- Fix publish script ([12365ba](https://github.com/wavezync/vue3-google-signin/commit/12365baef1f094e896701eea3e32ad0fc749e503))

</details>

## 2.0.1

Released November 21, 2024. [Compare with 2.0.0](https://github.com/wavezync/vue3-google-signin/compare/v2.0.0...v2.0.1)

### Bug fixes

- Correct type def `tokenResponse` ([ded7382](https://github.com/wavezync/vue3-google-signin/commit/ded738287cb48d0f28ff7d5bbff8a1c9c7806fe5)) by [@reslear](https://github.com/reslear)

### New contributors

- [@reslear](https://github.com/reslear) made their first contribution
- [@ram-you](https://github.com/ram-you) made their first contribution

## 2.0.0

Released August 11, 2024. [Compare with 1.3.5](https://github.com/wavezync/vue3-google-signin/compare/v1.3.5...v2.0.0)

### Bug fixes

- Google One Tap callback response does not contain clientId ([1458707](https://github.com/wavezync/vue3-google-signin/commit/14587072173689be4a50ecbd8fdac54e1643c177)) by [@lzdyes](https://github.com/lzdyes)
- GoogleSignInButton removed clientId ([c47abac](https://github.com/wavezync/vue3-google-signin/commit/c47abacbca08cc1e13305bc553e6cd6b192817c0)) by [@lzdyes](https://github.com/lzdyes)
- Google One Tap callback response error ([6c68a76](https://github.com/wavezync/vue3-google-signin/commit/6c68a766f86c9fba7c781174dfa27816b9618e77)) by [@lzdyes](https://github.com/lzdyes)

<details>
<summary>Tooling (1)</summary>

- Run on pr ([17c5dcc](https://github.com/wavezync/vue3-google-signin/commit/17c5dcc619bb495984e9866e48d27408050fb6db))

</details>

### New contributors

- [@lzdyes](https://github.com/lzdyes) made their first contribution
- [@raevilman](https://github.com/raevilman) made their first contribution

## 1.3.5

Released March 13, 2024. [Compare with 1.3.4](https://github.com/wavezync/vue3-google-signin/compare/v1.3.4...v1.3.5)

### Bug fixes

- Script ([705acd7](https://github.com/wavezync/vue3-google-signin/commit/705acd7fb5f9ec94e0f1e981dcfde2b6910818ec))
- Types ([dc8ead5](https://github.com/wavezync/vue3-google-signin/commit/dc8ead5bfc9440ce57642060e88c5a6db7f30e9e))

## 1.3.4

Released March 8, 2024. [Compare with 1.3.3](https://github.com/wavezync/vue3-google-signin/compare/v1.3.3...v1.3.4)

### Bug fixes

- Bump node version on ci ([4990076](https://github.com/wavezync/vue3-google-signin/commit/4990076d7b54ece5e5d3bb24c76aa37e74a4058f))
- Prettier ([e77cc2c](https://github.com/wavezync/vue3-google-signin/commit/e77cc2c264130d17cf43fc02113ec95b072c0ede))

## 1.3.3

Released December 29, 2023. [Compare with 1.3.2](https://github.com/wavezync/vue3-google-signin/compare/v1.3.2...v1.3.3)

### Bug fixes

- Module path in package.json ([2d3aed6](https://github.com/wavezync/vue3-google-signin/commit/2d3aed63763b2ee3ac2702c2ce1e3ef4d37ab3f0)) by [@zuhno](https://github.com/zuhno)

### New contributors

- [@zuhno](https://github.com/zuhno) made their first contribution

## 1.3.2

Released November 8, 2023. [Compare with 1.3.1](https://github.com/wavezync/vue3-google-signin/compare/v1.3.1...v1.3.2)

### Bug fixes

- Update urls and bump version ([3a7f6a0](https://github.com/wavezync/vue3-google-signin/commit/3a7f6a0beb9a4daacd4f427a6b6e83696c760fba))

<details>
<summary>Tooling (1)</summary>

- Workflow ([08631c4](https://github.com/wavezync/vue3-google-signin/commit/08631c4a910ee220eb4841a3ace74b82e9faba67))

</details>

### New contributors

- [@oliver-youdooh](https://github.com/oliver-youdooh) made their first contribution
- [@codedealer](https://github.com/codedealer) made their first contribution

## 1.3.1

Released June 6, 2023. [Compare with 1.3.0](https://github.com/wavezync/vue3-google-signin/compare/v1.3.0...v1.3.1)

<details>
<summary>Tooling (1)</summary>

- Remove netlify pipeline ([c99db65](https://github.com/wavezync/vue3-google-signin/commit/c99db657f036a9f9253036427a477a8a776a083d))

</details>

## 1.3.0

Released January 27, 2023. [Compare with 1.2.1](https://github.com/wavezync/vue3-google-signin/compare/v1.2.1...v1.3.0)

### Features

- Export global types for window namespace ([0b38999](https://github.com/wavezync/vue3-google-signin/commit/0b3899975474941568e48da39413f4e3b85f715a))
- Export global types ([a8b5f73](https://github.com/wavezync/vue3-google-signin/commit/a8b5f73b2617691a972c94c0c4b71aa98ff7d365))

### Bug fixes

- Non null assertion ([3fbe765](https://github.com/wavezync/vue3-google-signin/commit/3fbe765e069f638be41041b31c6f9b2666f42c66))

## 1.2.1

Released November 2, 2022. [Compare with 1.2.0](https://github.com/wavezync/vue3-google-signin/compare/v1.2.0...v1.2.1)

### Bug fixes

- Added module to pkg ([b12a9ff](https://github.com/wavezync/vue3-google-signin/commit/b12a9ffa2ae41fed41b19cfa240a3258715feb57))
- Ts issue ([07ad253](https://github.com/wavezync/vue3-google-signin/commit/07ad253f52720c3e1e8f1d8b51e351c87aa311d9))

<details>
<summary>Tooling (1)</summary>

- Use node 16 ([58b14b7](https://github.com/wavezync/vue3-google-signin/commit/58b14b7bd02c3790edf8695f1b800abba1a2bc50))

</details>

## 1.2.0

Released October 30, 2022. [Compare with 1.1.0](https://github.com/wavezync/vue3-google-signin/compare/v1.1.0...v1.2.0)

### Bug fixes

- A small typo fix in docs ([7694ebe](https://github.com/wavezync/vue3-google-signin/commit/7694ebe680c4e64169e7f61440c36e290aeecba6)) by [@RukshanJS](https://github.com/RukshanJS)
- Move decodeCredential to account namespace ([ede9fc2](https://github.com/wavezync/vue3-google-signin/commit/ede9fc2ed871c5d745e25807bb0bdf7c1bc9ae5b))
- Cleanup ([ff964bf](https://github.com/wavezync/vue3-google-signin/commit/ff964bf8ef2da57c07a688c365d77b5963dd7514))

<details>
<summary>Documentation (3)</summary>

- Update example ([5afa27d](https://github.com/wavezync/vue3-google-signin/commit/5afa27dc8a5ee10ed0b684651ee665b864077348))
- Added nuxt initialization to the readme ([3e789fa](https://github.com/wavezync/vue3-google-signin/commit/3e789fafb778748125551de1a03b1a09e4ef81da))
- Update nuxt config ([9e8767b](https://github.com/wavezync/vue3-google-signin/commit/9e8767b9a7dd8cf4b3131bab1fb8c40f9c5015e4))

</details>

### New contributors

- [@philippedasilva-orizone](https://github.com/philippedasilva-orizone) made their first contribution in [#29](https://github.com/wavezync/vue3-google-signin/pull/29)
- [@RukshanJS](https://github.com/RukshanJS) made their first contribution

## 1.1.0

Released September 18, 2022. [Compare with 1.0.2](https://github.com/wavezync/vue3-google-signin/compare/v1.0.2...v1.1.0)

### Features

- Add login session url for desktop platforms ([93576d7](https://github.com/wavezync/vue3-google-signin/commit/93576d7f184fc6aecf1bca067ecf32f5bfcb009f))

<details>
<summary>Documentation (3)</summary>

- Update with nuxt package ([0cb2213](https://github.com/wavezync/vue3-google-signin/commit/0cb2213735a65eda7fd9d9a86e10f069bb0c0b34))
- Minor update ([22205e0](https://github.com/wavezync/vue3-google-signin/commit/22205e00ea9f86f5b3286e01caeb5c47fda6cf58))
- Small updates ([bea200d](https://github.com/wavezync/vue3-google-signin/commit/bea200df5126953b7d27929d0c6134e3f87f7398))

</details>

## 1.0.2

Released July 24, 2022. [Compare with 1.0.1](https://github.com/wavezync/vue3-google-signin/compare/v1.0.1...v1.0.2)

### Bug fixes

- Readme npm link ([8c0c44f](https://github.com/wavezync/vue3-google-signin/commit/8c0c44f09ffb152175776e9bd8ac9317dd1f893e))

<details>
<summary>Documentation (6)</summary>

- Fix sitename ([9ec54a2](https://github.com/wavezync/vue3-google-signin/commit/9ec54a21f18068d4e9d8b52b5292ce0be2865506))
- Update tagline ([507f42b](https://github.com/wavezync/vue3-google-signin/commit/507f42bf30714ed6eb02114b4926973e99fa8065))
- Update tagline ([beb4597](https://github.com/wavezync/vue3-google-signin/commit/beb459768495d21ba4536785c7e063152b3f23f6))
- Consitent readme docs ([d76200c](https://github.com/wavezync/vue3-google-signin/commit/d76200ccbe839e3825d20422c085260dc1d1ebf9))
- Added code verification example ([850bc3f](https://github.com/wavezync/vue3-google-signin/commit/850bc3f3d0d2c5366a1cd8786500648357cccca0))
- **search:** Add algolia serach ([88adbf8](https://github.com/wavezync/vue3-google-signin/commit/88adbf8b6e3ce5603d96d90922309639e0f89f9c))

</details>

<details>
<summary>Tooling (1)</summary>

- Use secret ([89f3f8a](https://github.com/wavezync/vue3-google-signin/commit/89f3f8a9ff344e6a9553f8209b920757496fbac7))

</details>

## 1.0.0

Released July 13, 2022.

### Features

- **plugin:** Plugin installer ([fa08a7d](https://github.com/wavezync/vue3-google-signin/commit/fa08a7dbd722d391bd419fe53dbfdf3f020b5e36))
- **vite:** Add env vars ([902c7ad](https://github.com/wavezync/vue3-google-signin/commit/902c7adbea36db2c4f53b7c41f6b1e399dcd1ed1))
- **gsi:** Google Sign In button ([9549d38](https://github.com/wavezync/vue3-google-signin/commit/9549d381f0cb698759e7a3b707fba48ceadb03c4))
- **plugin:** Provide button ([ef07af6](https://github.com/wavezync/vue3-google-signin/commit/ef07af6a0f67474fa18df2d8dfe5a814b2b95ad9))
- Added composables ([869b841](https://github.com/wavezync/vue3-google-signin/commit/869b841ba648f2bc290c5733949068976b423abc))
- Use google one tap ([020937e](https://github.com/wavezync/vue3-google-signin/commit/020937eee8828e6d4229c9670b1dcc909d863602))
- Add return types ([42f8fc4](https://github.com/wavezync/vue3-google-signin/commit/42f8fc45888b8576ea734bd8d6b312a4432a3f4c))
- Touchup final works with google :rocket: ([13990c9](https://github.com/wavezync/vue3-google-signin/commit/13990c9fe3f12f16decb75e2b84b9d3dca7a21d6))
- Added more exports ([5c5c0e7](https://github.com/wavezync/vue3-google-signin/commit/5c5c0e7f08bbfc66d55b7b4448710948f9d64632))

### Bug fixes

- **script:** Loading conditions ([a35caa7](https://github.com/wavezync/vue3-google-signin/commit/a35caa721b725da36a974f1810d9f0c603f76417))
- Update types ([43d8554](https://github.com/wavezync/vue3-google-signin/commit/43d855407573340be81d90b14703108f462f5f1c))
- Docs of google button ([92801b4](https://github.com/wavezync/vue3-google-signin/commit/92801b4617d4b13e8cad11821c99f59072724bf7))
- Examples ([2c3e346](https://github.com/wavezync/vue3-google-signin/commit/2c3e346cbe8e5c41d4ae9381d23562381c62393b))
- Typo ([ed4576c](https://github.com/wavezync/vue3-google-signin/commit/ed4576c04ddb8774cd958f0572cf364f49078822))
- Remove dep from @vue/shared ([4c8001b](https://github.com/wavezync/vue3-google-signin/commit/4c8001bf652040e3bf67e41fd5ec43c664f7aeb5))
- Dynamic import ([aa70b14](https://github.com/wavezync/vue3-google-signin/commit/aa70b143a1c1ad254f6bee3ac9d2be04857bd57f))
- Remove dep ([69f70a2](https://github.com/wavezync/vue3-google-signin/commit/69f70a288099a624918d9a0939b03faca3857bad))
- Client code ([2f8545c](https://github.com/wavezync/vue3-google-signin/commit/2f8545c070783b629fd91cbaf4083d8e54d1c2f8))
- Update favicon ([9716401](https://github.com/wavezync/vue3-google-signin/commit/9716401c8bcc101ab60b9dd3fb86d0cae1fb7c98))
- Og tags ([eaa6a48](https://github.com/wavezync/vue3-google-signin/commit/eaa6a480fb156aa1ad1dc93044fa4f8434c9eeda))
- Typo ([1140108](https://github.com/wavezync/vue3-google-signin/commit/11401088e867d066219af27fe7c08ce0e70bb376))
- Update ci var ([4d1dcca](https://github.com/wavezync/vue3-google-signin/commit/4d1dcca1a8983398898d2742802e75d66c811a5b))
- Ci path ([1f34072](https://github.com/wavezync/vue3-google-signin/commit/1f34072c6efe71cf863617395863f610228b439a))
- Type conversion ([f0c96fe](https://github.com/wavezync/vue3-google-signin/commit/f0c96fe7fe5f4fad54d63382391c2eecb39565d1))
- Ci ([69f66d1](https://github.com/wavezync/vue3-google-signin/commit/69f66d14e6f3c6001c660774d8cc42e8634f2a49))
- Ci ([a8522a4](https://github.com/wavezync/vue3-google-signin/commit/a8522a43e682e76036c1b3272904ee443f776c2d))

<details>
<summary>Documentation (16)</summary>

- Init vitepress ([5edcce6](https://github.com/wavezync/vue3-google-signin/commit/5edcce6b05e3c50375f632f0c9bcf6f182a0d97b))
- Init ([83fe7f1](https://github.com/wavezync/vue3-google-signin/commit/83fe7f1ad7bb8b29db4949a37a0bd769d7bcdca3))
- Readme update ([58f3064](https://github.com/wavezync/vue3-google-signin/commit/58f30649656e0581b6a745a7a0c5ee832ce641dd))
- Added side nav ([6a0915e](https://github.com/wavezync/vue3-google-signin/commit/6a0915e23f0492bef91d012c6b1643b7197a96cb))
- Google button dark mode issue ([5baf481](https://github.com/wavezync/vue3-google-signin/commit/5baf4816f1b9e05270228265ec8d652e84dc7cf8))
- Update ([1326f3e](https://github.com/wavezync/vue3-google-signin/commit/1326f3ed3fb7f46602b1185acf686e7d4bfa8536))
- Typings ([24c7e3f](https://github.com/wavezync/vue3-google-signin/commit/24c7e3f68b2ae9c3e9e12c011fec8272cc1d8f56))
- One tap login ([fd34286](https://github.com/wavezync/vue3-google-signin/commit/fd3428662e5f5b0b2a6d8c815d5b2565aff35947))
- Wip ([0f6ed36](https://github.com/wavezync/vue3-google-signin/commit/0f6ed363a3ad3b8711b1d0cfdd25e42cd290eff2))
- Adding favicons and logos ([c2cb447](https://github.com/wavezync/vue3-google-signin/commit/c2cb447e0bda6ed3f047d47539f71cdd876c18d6))
- Adding emit doc comments ([79c2a65](https://github.com/wavezync/vue3-google-signin/commit/79c2a653e99e280232952016a74068b8aa901c47))
- Improve typedocs ([50656d6](https://github.com/wavezync/vue3-google-signin/commit/50656d67bd76ccf407e17fde82538dd063d969f0))
- Google signin ([b1c9766](https://github.com/wavezync/vue3-google-signin/commit/b1c97661141a581dec1fc82a2c0583258eef82b2))
- Update ([4a99766](https://github.com/wavezync/vue3-google-signin/commit/4a9976635424346a6dacb9cc3f0c6f5e22299b62))
- Improvements ([3e98163](https://github.com/wavezync/vue3-google-signin/commit/3e9816371a1fe1cd749cad1788189649ed00933d))
- Touchups ([e8cd119](https://github.com/wavezync/vue3-google-signin/commit/e8cd119fb8d5c91ef7c4630bc8b62484288f9621))

</details>

<details>
<summary>Tooling (1)</summary>

- Order ([5554d51](https://github.com/wavezync/vue3-google-signin/commit/5554d5106cbc238e8bb99b79cc4d72cd2e8562ee))

</details>

### New contributors

- [@kasvith](https://github.com/kasvith) made their first contribution
